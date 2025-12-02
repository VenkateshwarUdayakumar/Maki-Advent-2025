'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const NUM_SQUARES = 26;
const STORAGE_KEY = 'maki-advent-visited';
const getVisitedImage = (num: number) => `/cells/cell-${num}.png`;

export default function Home() {
  const [visited, setVisited] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width for responsive layout
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => setIsMobile(window.innerWidth < 600);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load visited progress from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setVisited(parsed);
      }
    } catch {}
  }, []);

  // Reset progress
  const handleReset = () => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(STORAGE_KEY);
    setVisited([]);
  };

  // Responsive square sizes
  const square = isMobile ? 56 : 75;
  const gap = isMobile ? 8 : 10;

  return (
    <main
      style={{
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
      <div
        style={{
          width: '100%',
          maxWidth: isMobile ? 360 : 500,
          height: '100%',
          maxHeight: 690,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: isMobile ? '1rem' : '1.5rem 2rem',
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
              marginBottom: '0.3rem',
              fontSize: isMobile ? '1.4rem' : '2rem',
              color: '#b00040',
            }}
          >
            Maki&apos;s Advent Calendar 💌🎄
          </h1>
          <p
            style={{
              textAlign: 'center',
              marginBottom: isMobile ? '1rem' : '1.2rem',
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              color: '#7a3b4d',
            }}
          >
            One little letter each day. Tap to open.
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
            const isVisited = visited.includes(num);

            const baseStyle = {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '14px',
              border: '2px solid #f4bccf',
              background: isVisited
                ? 'linear-gradient(145deg, #e3f9e5, #b8e6c7)'
                : 'linear-gradient(145deg, #ffe9f3, #ffd4e4)',
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              color: '#5b2433',
              textDecoration: 'none',
              boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
              transition:
                'transform 0.12s ease, box-shadow 0.12s ease, background 0.2s ease',
            } as const;

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
                {num}

                {isVisited && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url(${getVisitedImage(num)})`,
                      backgroundSize: '70%',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      opacity: 0.55,
                      pointerEvents: 'none',
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
            marginTop: '1rem',
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
