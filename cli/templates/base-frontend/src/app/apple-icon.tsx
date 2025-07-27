import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

// Image generation
export default function AppleIcon(props: {
  params?: object;
  searchParams?: { size?: string };
}) {
  const iconSize = props.searchParams?.size
    ? parseInt(props.searchParams.size)
    : 180;
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: iconSize * 0.6,
          background: "black",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: iconSize * 0.2,
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
