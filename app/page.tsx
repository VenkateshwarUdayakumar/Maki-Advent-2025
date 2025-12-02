'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const NUM_SQUARES = 26;
const STORAGE_KEY = 'maki-advent-visited';
const getVisitedImage = (num: number) => `/cells/cell-${num}.png`;

export default function Home() {
  const [solved, setSolved] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load solved progress
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setSolved(parsed);
      }
    } catch {}
  }, []);

  // Reset progress
  const handleReset = () => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(STORAGE_KEY);
    setSolved([]);
  };

  const square = isMobile ? 56 : 72;
  const gap = isMobile ? 8 : 10;

  return (
    <main
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #ffe4f2, #ffd6e8, #ffc6cc)',
        fontFamily: 'system-ui',
        overflow: 'hidden',
      }}
    >
      {/* Main card */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: isMobile ? 360 : 500,
          height: '100%',
          maxHeight: 720,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: isMobile ? '0.9rem' : '1.3rem 1.8rem',
          boxSizing: 'border-box',
          borderRadius: isMobile ? '0px' : '20px',
          background: 'rgba(255,255,255,0.92)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        }}
      >
        {/* Header */}
        <div>
          <h1
            style={{
              textAlign: 'center',
              marginBottom: '0.25rem',
              fontSize: isMobile ? '1.4rem' : '2rem',
              color: '#b00040',
            }}
          >
            Maki&apos;s Advent Calendar
          </h1>
          <p
            style={{
              textAlign: 'center',
              marginBottom: isMobile ? '0.9rem' : '1.1rem',
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              color: '#7a3b4d',
            }}
          >
            Each little door hides a cozy riddle about what Maki loves 💌 <br></br>
            Solve a day to watch it light up on the calendar.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            flexGrow: 1,
            justifyContent: 'center',
            alignContent: 'center',
            gridTemplateColumns: `repeat(5, ${square}px)`,
            gridTemplateRows: `repeat(6, ${square}px)`,
            gap: `${gap}px`,
          }}
        >
          {Array.from({ length: NUM_SQUARES }, (_, i) => {
            const num = i + 1;
            const isLast = num === 26;
            const isSolved = solved.includes(num);

            const baseStyle = {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '14px',
              border: '2px solid #f4bccf',
              background: isSolved
                ? 'linear-gradient(145deg, #e3f9e5, #b8e6c7)'
                : 'linear-gradient(145deg, #ffe9f3, #ffd4e4)',
              fontSize: isMobile ? '1.05rem' : '1.25rem',
              color: '#5b2433',
              textDecoration: 'none',
              boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
              transition:
                'transform 0.12s ease, box-shadow 0.12s ease, background 0.2s ease',
            } as const;

            const solvedNumberStyle = {
              position: 'absolute' as const,
              top: 4,
              left: 6,
              fontSize: isMobile ? '0.75rem' : '0.8rem',
              color: '#3b1a23',
              zIndex: 2,
              textShadow: '0 0 3px rgba(255,255,255,0.9)',
            };

            const normalNumberStyle = {
              position: 'relative' as const,
              zIndex: 2,
            };

            return (
              <Link
                key={num}
                href={`/letters/${num}`}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  ...baseStyle,
                  ...(isLast
                    ? {
                        gridColumn: '3 / span 1',
                        gridRow: '6 / span 1',
                      }
                    : {}),
                }}
              >
                <span style={isSolved ? solvedNumberStyle : normalNumberStyle}>
                  {num}
                </span>

                {isSolved && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${getVisitedImage(num)})`,
                      backgroundSize: '70%',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      opacity: 0.6,
                      pointerEvents: 'none',
                      zIndex: 1,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Reset button */}
        <button
          onClick={handleReset}
          style={{
            marginTop: '0.8rem',
            alignSelf: 'center',
            padding: isMobile ? '0.45rem 1.2rem' : '0.55rem 1.4rem',
            borderRadius: '999px',
            border: 'none',
            fontSize: isMobile ? '0.8rem' : '0.95rem',
            background: 'linear-gradient(135deg, #f06292, #e53935)',
            color: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            cursor: 'pointer',
          }}
        >
          Reset progress 🔁
        </button>
      </div>
    </main>
  );
}
