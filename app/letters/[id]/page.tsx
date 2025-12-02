// app/letters/[id]/page.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const STORAGE_KEY = 'maki-advent-visited';

export default function LetterPage() {
  const params = useParams();
  const idParam = params.id as string;
  const idNumber = parseInt(idParam, 10);

  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile-ish width
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // When this page opens, mark the box as visited in localStorage
  useEffect(() => {
    if (Number.isNaN(idNumber) || idNumber < 1 || idNumber > 26) return;
    if (typeof window === 'undefined') return;

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const current: number[] = stored ? JSON.parse(stored) : [];
      if (!current.includes(idNumber)) {
        const updated = [...current, idNumber];
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
    } catch (e) {
      console.error('Error updating visited days', e);
    }
  }, [idNumber]);

  // Validation
  if (Number.isNaN(idNumber) || idNumber < 1 || idNumber > 26) {
    return (
      <main
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          background: 'linear-gradient(135deg, #ffe4f2, #ffc6cc)',
          padding: '1.5rem',
          boxSizing: 'border-box',
        }}
      >
        <p style={{ marginBottom: '1rem', color: '#6a1b2b' }}>Invalid letter page.</p>
        <Link
          href="/"
          style={{
            padding: '0.6rem 1.4rem',
            borderRadius: '999px',
            background: '#6a1b9a',
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Return to calendar
        </Link>
      </main>
    );
  }

  const letter = String.fromCharCode(64 + idNumber); // 1→A, 2→B, ..., 26→Z

  const cardPadding = isMobile ? '1.5rem 1.8rem' : '2rem 3rem';
  const letterFontSize = isMobile ? '4rem' : '6rem';
  const textFontSize = isMobile ? '0.9rem' : '1rem';
  const buttonPadding = isMobile ? '0.65rem 1.4rem' : '0.75rem 1.6rem';

  return (
    <main
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        background: 'radial-gradient(circle at top, #ffe4f2, #ffc6cc 40%, #f8d9c7)',
        padding: '1.5rem',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '24px',
          padding: cardPadding,
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.9)',
          maxWidth: '420px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <p
          style={{
            marginBottom: '0.75rem',
            fontSize: textFontSize,
            color: '#7a3b4d',
          }}
        >
          Day {idNumber} for Maki 💝
        </p>
        <div
          style={{
            fontSize: letterFontSize,
            marginBottom: '1.5rem',
            color: '#c2185b',
            lineHeight: 1,
          }}
        >
          {letter}
        </div>

        <Link
          href="/"
          style={{
            padding: buttonPadding,
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: isMobile ? '0.9rem' : '1rem',
            display: 'inline-block',
          }}
        >
          Return to calendar ⬅️
        </Link>
      </div>
    </main>
  );
}
