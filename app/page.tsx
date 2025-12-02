'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const NUM_SQUARES = 26;
const STORAGE_KEY = 'maki-advent-visited';
const getVisitedImage = (num: number) => `/cells/cell-${num}.png`;

const COMPLETION_LETTER = `To my Dearest Maki,

Congratulations on beating my puzzles! I am so grateful to be a part of your life. Before, I used to not be the biggest fan of Christmas because I did not feel loved or special, but the moment you popped into my life it became my favourite holiday. You make me feel like I am the most cherished person in the world. It means so much to me the way you love me, and I hope you know how much I love you too.

Your voice helps me get out of bed in the morning. Your smile inspires me to do better in my life. Your eyes motivate me to look and act better. You make me a better man. You are a painting come to life, you are a poem taken form. That is why I made this puzzle. You are just a beautiful collage of all that is good in this world. I hope you see this and know how stunning and perfect you are. I love you, and Merry Christmas.

Sincerely,
Your Honeybunch.`;

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
  const allComplete = solved.length >= NUM_SQUARES;

  // For the framed collage: split 26 images into top, right, bottom, left
  const imageIds = Array.from({ length: NUM_SQUARES }, (_, i) => i + 1);
  const topImages = imageIds.slice(0, 8);      // 8
  const rightImages = imageIds.slice(8, 13);   // 5
  const bottomImages = imageIds.slice(13, 21); // 8
  const leftImages = imageIds.slice(21, 26);   // 5

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
            {allComplete
              ? 'You solved every little riddle! Here is something special, just for you 💌💌💌💌💌'
              : 'Each little door hides a cozy riddle about what Maki loves 💌💌💌 \nSolve a day to watch it light up on the calendar.'}
          </p>
        </div>

        {/* Middle content */}
        {allComplete ? (
          // Completion view with PNGs surrounding the letter
          <div
            style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: 460,
              }}
            >
              {/* Top row of images */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: isMobile ? 6 : 8,
                  marginBottom: isMobile ? 6 : 8,
                }}
              >
                {topImages.map((num) => (
                  <div
                    key={`top-${num}`}
                    style={{
                      width: isMobile ? 40 : 44,
                      height: isMobile ? 40 : 44,
                      borderRadius: 8,
                      backgroundImage: `url(${getVisitedImage(num)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}
                  />
                ))}
              </div>

              {/* Middle row: left column of images, letter, right column of images */}
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                {/* Left column */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginRight: isMobile ? 6 : 8,
                  }}
                >
                  {leftImages.map((num) => (
                    <div
                      key={`left-${num}`}
                      style={{
                        width: isMobile ? 40 : 44,
                        height: isMobile ? 40 : 44,
                        borderRadius: 8,
                        backgroundImage: `url(${getVisitedImage(num)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      }}
                    />
                  ))}
                </div>

                {/* Letter box */}
                <div
                  style={{
                    flexGrow: 1,
                    borderRadius: 16,
                    background: 'rgba(255,255,255,0.95)',
                    border: '1px solid rgba(244,188,207,0.9)',
                    padding: isMobile ? '0.75rem 0.8rem' : '1rem 1.1rem',
                    boxSizing: 'border-box',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    maxHeight: isMobile ? 260 : 320,
                    overflowY: 'auto',
                  }}
                >
                  <p
                    style={{
                      fontSize: isMobile ? '0.78rem' : '0.9rem',
                      whiteSpace: 'pre-line',
                      color: '#5b2433',
                      margin: 0,
                      lineHeight: 1.35,
                    }}
                  >
                    {COMPLETION_LETTER}
                  </p>
                </div>

                {/* Right column */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginLeft: isMobile ? 6 : 8,
                  }}
                >
                  {rightImages.map((num) => (
                    <div
                      key={`right-${num}`}
                      style={{
                        width: isMobile ? 40 : 44,
                        height: isMobile ? 40 : 44,
                        borderRadius: 8,
                        backgroundImage: `url(${getVisitedImage(num)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom row of images */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: isMobile ? 6 : 8,
                  marginTop: isMobile ? 6 : 8,
                }}
              >
                {bottomImages.map((num) => (
                  <div
                    key={`bottom-${num}`}
                    style={{
                      width: isMobile ? 40 : 44,
                      height: isMobile ? 40 : 44,
                      borderRadius: 8,
                      backgroundImage: `url(${getVisitedImage(num)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Normal calendar grid
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
        )}

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
          {allComplete ? 'Reset calendar and puzzles 🔁' : 'Reset progress 🔁'}
        </button>
      </div>
    </main>
  );
}
