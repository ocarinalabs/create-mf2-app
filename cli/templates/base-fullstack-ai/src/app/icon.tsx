import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon(props: {
  params?: object;
  searchParams?: { size?: string };
}) {
  const iconSize = props.searchParams?.size
    ? parseInt(props.searchParams.size)
    : 32;
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: iconSize * 0.8,
          background: "black",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        ❃
      </div>
    ),
    {
      width: iconSize,
      height: iconSize,
    }
  );
}
