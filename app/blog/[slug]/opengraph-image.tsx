import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const alt = "Blog post by Ahmed Nasser";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { metadata } = getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #09090b, #18181b)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        {/* Tags */}
        {metadata.tags && metadata.tags.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            {metadata.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                style={{
                  display: "flex",
                  fontSize: "18px",
                  color: "#a1a1aa",
                  border: "1px solid #27272a",
                  borderRadius: "9999px",
                  padding: "6px 18px",
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            background: "linear-gradient(to right, #ffffff, #a1a1aa)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "32px",
            textWrap: "balance",
          }}
        >
          {metadata.title}
        </div>

        {/* Date */}
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#71717a",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>{metadata.date}</span>
          <span style={{ color: "#3f3f46" }}>—</span>
          <span>{metadata.readingTimeMin} min read</span>
        </div>

        {/* Bottom branding */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 48,
            left: 80,
            fontSize: 18,
            color: "#52525b",
            letterSpacing: "-0.01em",
          }}
        >
          ahmednasser.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
