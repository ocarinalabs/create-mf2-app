"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { cn } from "@repo/design-system/lib/utils";
import { useMemo, useRef } from "react";
import {
  type ShaderMaterial,
  Vector2,
  Vector3,
  type WebGLRenderer,
} from "three";

function FullscreenShader() {
  const shaderRef = useRef<ShaderMaterial>(null);
  const { size, gl } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new Vector3(size.width, size.height, 1) },
    }),
    [size.width, size.height]
  );

  useFrame(({ clock }) => {
    if (!shaderRef.current) {
      return;
    }
    shaderRef.current.uniforms.uTime.value = clock.getElapsedTime();

    const bufferSize = new Vector2();
    (gl as WebGLRenderer).getDrawingBufferSize(bufferSize);
    shaderRef.current.uniforms.uResolution.value.set(
      bufferSize.x,
      bufferSize.y,
      1
    );
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        depthTest={false}
        depthWrite={false}
        fragmentShader={
          /* glsl */ `
          precision highp float;

          uniform vec3 uResolution;
          uniform float uTime;

          float randVal(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

          float noise2d(vec2 p){
              vec2 i = floor(p);
              vec2 f = fract(p);
              vec2 u = f*f*(3.0-2.0*f);
              float a = randVal(i + vec2(0.0, 0.0));
              float b = randVal(i + vec2(1.0, 0.0));
              float c = randVal(i + vec2(0.0, 1.0));
              float d = randVal(i + vec2(1.0, 1.0));
              return (a + (b-a)*u.x + (c-a)*u.y + (a-b-c+d)*u.x*u.y) / 4.0;
          }

          float mirrored(float t, float shift){
              t = fract(t + shift);
              return 2.0*abs(t-0.5);
          }

          float radialLayer(float angle, float radius){
              const float SCALE = 45.0;
              radius = pow(radius, 0.01);
              float offset = -uTime * 0.07;
              vec2 pos = vec2(mirrored(angle, 0.1), radius + offset);
              float n1 = noise2d(pos * SCALE);
              pos = 2.1*vec2(mirrored(angle,0.4), radius+offset);
              float n2 = noise2d(pos * SCALE);
              pos = 3.7*vec2(mirrored(angle,0.8), radius+offset);
              float n3 = noise2d(pos * SCALE);
              pos = 5.8*vec2(mirrored(angle,0.0), radius+offset);
              float n4 = noise2d(pos * SCALE);
              return pow((n1 + 0.5*n2 + 0.25*n3 + 0.125*n4) * 3.0, 1.0);
          }

          vec3 applyColor(float v){
              v = clamp(v, 0.0, 1.0);
              vec3 col = mix(vec3(0.0,0.0,1.1), vec3(0.0,1.0,1.0), v);
              col = mix(col, vec3(1.0,1.0,1.0), v*4.0-3.0) * v;
              col = max(col, vec3(0.0));
              col = mix(col, vec3(1.0, 0.25, 1.0), smoothstep(1.0, 0.2, v) * smoothstep(0.15, 0.9, v));
              return col;
          }

          void renderMain(out vec4 fragColor, in vec2 fragCoord){
              vec2 uv = (fragCoord * 2.0 - uResolution.xy) / uResolution.y * 0.5;
              float dist = dot(uv, uv);
              float ang = atan(uv.y, uv.x) / 6.28318530718;
              float val = radialLayer(ang, dist);
              val = val * 2.5 - 1.4;
              val = mix(0.0, val, 0.8 * smoothstep(0.0, 0.8, dist));
              fragColor = vec4(applyColor(val), 1.0);
          }

          void main(){
            vec4 outColor;
            renderMain(outColor, gl_FragCoord.xy);
            gl_FragColor = outColor;
          }
        `
        }
        ref={shaderRef}
        transparent={false}
        uniforms={uniforms}
        vertexShader={
          /* glsl */ `
          varying vec2 vTexCoord;
          void main() {
            vTexCoord = uv;
            gl_Position = vec4(position, 1.0);
          }
        `
        }
      />
    </mesh>
  );
}

export const SpeedLinesShader = ({ className }: { className?: string }) => (
  <div className={cn("h-full w-full", className)}>
    <Canvas camera={{ position: [0, 0, 1], zoom: 1 }} dpr={[1, 2]} orthographic>
      <color args={["#000000"]} attach="background" />
      <FullscreenShader />
    </Canvas>
  </div>
);
