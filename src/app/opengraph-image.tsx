import { ImageResponse } from "next/og";

export const alt = "Ahmed Mahmoud Swid — Business Analyst";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0E14",
          backgroundImage:
            "radial-gradient(900px 500px at 85% -10%, rgba(201,168,106,0.22), transparent 60%), radial-gradient(700px 500px at 0% 110%, rgba(30,107,79,0.18), transparent 55%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#C9A86A",
              fontSize: 26,
              fontWeight: 700,
              border: "1px solid rgba(201,168,106,0.4)",
              borderRadius: 999,
              padding: "10px 24px",
            }}
          >
            CAPM Certified · PMI
          </div>
          <div style={{ display: "flex", color: "rgba(255,255,255,0.5)", fontSize: 24 }}>
            Riyadh · KSA
          </div>
        </div>

        {/* center */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: -2,
              backgroundImage: "linear-gradient(180deg, #F3E4BE 0%, #C9A86A 55%, #9A7B3F 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Ahmed Mahmoud Swid
          </div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 36, color: "#e8eaf2" }}>
            Business Analyst · Dashboards · Automation
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 30,
            }}
          >
            {["Power BI", "Data Analysis", "n8n Automation", "Reporting"].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  fontSize: 24,
                  color: "rgba(201,168,106,0.9)",
                  border: "1px solid rgba(201,168,106,0.25)",
                  background: "rgba(201,168,106,0.06)",
                  borderRadius: 10,
                  padding: "6px 18px",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* bottom */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", height: 4, width: 60, background: "#C9A86A", borderRadius: 4 }} />
          <div style={{ display: "flex", color: "rgba(255,255,255,0.65)", fontSize: 26 }}>
            ahmed-swid.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
