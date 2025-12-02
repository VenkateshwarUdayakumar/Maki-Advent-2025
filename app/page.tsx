// app/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const NUM_SQUARES = 26;
const STORAGE_KEY = 'maki-advent-visited';

export default function Home() {
  const [visited, setVisited] = useState<number[]>([]);

  // Load visited days from localStorage on first render
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setVisited(parsed);
        }
      }
    } catch (e) {
      console.error('Error reading visited days from localStorage', e);
    }
  }, []);

  const squares = Array.from({ length: NUM_SQUARES }, (_, i) => i + 1);

  const handleReset = () => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(STORAGE_KEY);
    setVisited([]);
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        // Soft pink → warm red gradient, kinda romantic + Christmasy
        background: 'linear-gradient(135deg, #ffe4f2, #ffd6e8, #ffc6cc)',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '24px',
          padding: '2rem 2.5rem 2.25rem',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.9)',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            marginBottom: '0.25rem',
            fontSize: '2rem',
            color: '#b00040', // deep romantic berry
          }}
        >
          Maki&apos;s Cozy Advent Calendar 🎄💌
        </h1>
        <p
          style={{
            textAlign: 'center',
            marginBottom: '1.5rem',
            color: '#7a3b4d',
          }}
        >
          One little letter surprise each day. Click a square to open it.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 80px)',
            gridTemplateRows: 'repeat(6, 80px)',
            gap: '12px',
            justifyContent: 'center',
          }}
        >
          {squares.map((num) => {
            const isLast = num === 26;
            const isVisited = visited.includes(num);

            const baseStyle: React.CSSProperties = {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '18px',
              border: '2px solid #f4bccf',
              fontSize: '1.35rem',
              textDecoration: 'none',
              color: '#5b2433',
              boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
              transition: 'transform 0.12s ease, box-shadow 0.12s ease, background 0.2s ease',
              background: isVisited
                ? 'linear-gradient(145deg, #e3f9e5, #b8e6c7)' // soft green when opened
                : 'linear-gradient(145deg, #ffe9f3, #ffd4e4)', // pink when unopened
            };

            return (
              <Link
                key={num}
                href={`/letters/${num}`}
                style={{
                  ...baseStyle,
                  ...(isLast
                    ? {
                        gridColumn: '3 / span 1', // center bottom
                        gridRow: '6 / span 1',
                      }
                    : {}),
                }}
              >
                {num}
              </Link>
            );
          })}
        </div>

        <div
          style={{
            marginTop: '1.75rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: '0.6rem 1.4rem',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #f06292, #e53935)',
              color: 'white',
              fontWeight: 500,
              fontSize: '0.95rem',
              boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
            }}
          >
            Reset progress 🔁
          </button>
        </div>
      </div>
    </main>
  );
}
