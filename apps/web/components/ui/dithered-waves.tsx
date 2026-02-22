"use client";

import { useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, wrapEffect } from "@react-three/postprocessing";
import { Effect } from "postprocessing";
import { type ReactNode, useRef } from "react";
import {
  type Mesh,
  RepeatWrapping,
  type ShaderMaterial,
  type Texture,
  Uniform,
  Vector2,
} from "three";

import fragmentShader from "../../shaders/fragment.glsl";
import waveFragmentShader from "../../shaders/wave-fragment.glsl";
import waveVertexShader from "../../shaders/wave-vertex.glsl";

const DEVICE_PIXEL_RATIO = 1;
const DEFAULT_COLOR_COUNT = 4.0;
const DEFAULT_PIXEL_SIZE = 2.0;

class RetroEffectImpl extends Effect {
  declare uniforms: Map<string, Uniform>;

  constructor(palette: Texture) {
    const uniforms = new Map<string, Uniform>([
      ["colorNum", new Uniform(DEFAULT_COLOR_COUNT)],
      ["pixelSize", new Uniform(DEFAULT_PIXEL_SIZE)],
      ["palette", new Uniform(palette)],
    ]);

    super("RetroEffect", fragmentShader, { uniforms });

    this.uniforms = uniforms;
  }

  get colorNum(): number {
    return (this.uniforms.get("colorNum") as Uniform<number>).value;
  }

  set colorNum(value: number) {
    (this.uniforms.get("colorNum") as Uniform<number>).value = value;
  }

  get pixelSize(): number {
    return (this.uniforms.get("pixelSize") as Uniform<number>).value;
  }

  set pixelSize(value: number) {
    (this.uniforms.get("pixelSize") as Uniform<number>).value = value;
  }

  get palette(): Texture {
    return (this.uniforms.get("palette") as Uniform<Texture>).value;
  }

  set palette(value: Texture) {
    (this.uniforms.get("palette") as Uniform<Texture>).value = value;
  }
}

const RetroEffect = wrapEffect(RetroEffectImpl);

const WaveMesh = () => {
  const meshRef = useRef<Mesh>(null);
  const { viewport } = useThree();

  const uniforms = useRef({
    time: { value: 0.0 },
    resolution: { value: new Vector2() },
  });

  useFrame((state) => {
    if (!meshRef.current) {
      return;
    }
    const material = meshRef.current.material as ShaderMaterial;
    material.uniforms.time.value = state.clock.getElapsedTime();
    material.uniforms.resolution.value.set(
      window.innerWidth * DEVICE_PIXEL_RATIO,
      window.innerHeight * DEVICE_PIXEL_RATIO
    );
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        fragmentShader={waveFragmentShader}
        uniforms={uniforms.current}
        vertexShader={waveVertexShader}
      />
    </mesh>
  );
};

type SceneProps = {
  children?: ReactNode;
};

const Scene = ({ children }: SceneProps) => {
  const paletteTexture = useTexture("/palette.png");
  paletteTexture.wrapS = RepeatWrapping;
  paletteTexture.wrapT = RepeatWrapping;

  return (
    <>
      <WaveMesh />
      {children}
      <EffectComposer>
        <RetroEffect palette={paletteTexture} />
      </EffectComposer>
    </>
  );
};

type DitheredWavesProps = {
  children?: ReactNode;
};

export const DitheredWaves = ({ children }: DitheredWavesProps) => (
  <Canvas camera={{ position: [0, 0, 6] }} dpr={[1, 2]}>
    <Scene>{children}</Scene>
  </Canvas>
);
