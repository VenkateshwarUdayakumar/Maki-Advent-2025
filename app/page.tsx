// app/page.tsx
import Link from "next/link";

const NUM_SQUARES = 26;

export default function Home() {
  const squares = Array.from({ length: NUM_SQUARES }, (_, i) => i + 1);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
        background: "#f5f5f5",
      }}
    >
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Letters Grid
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 80px)",
            gridTemplateRows: "repeat(6, 80px)",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {squares.map((num) => {
            // Make square 26 centered on the last row (column 3)
            const isLast = num === 26;
            return (
              <Link
                key={num}
                href={`/letters/${num}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  background: "#fff",
                  fontSize: "1.25rem",
                  textDecoration: "none",
                  color: "#333",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  ...(isLast
                    ? {
                        gridColumn: "3 / span 1", // center bottom
                        gridRow: "6 / span 1",
                      }
                    : {}),
                }}
              >
                {num}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
