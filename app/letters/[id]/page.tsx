// app/letters/[id]/page.tsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

const STORAGE_KEY = 'maki-advent-visited';

export default function LetterPage() {
  const params = useParams();
  const idParam = params.id as string;
  const idNumber = parseInt(idParam, 10);

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
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          background: 'linear-gradient(135deg, #ffe4f2, #ffc6cc)',
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

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        background: 'radial-gradient(circle at top, #ffe4f2, #ffc6cc 40%, #f8d9c7)',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '24px',
          padding: '2rem 3rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.9)',
        }}
      >
        <p
          style={{
            marginBottom: '0.75rem',
            fontSize: '1rem',
            color: '#7a3b4d',
          }}
        >
          Day {idNumber} for Maki 💝
        </p>
        <div
          style={{
            fontSize: '6rem',
            marginBottom: '1.5rem',
            color: '#c2185b',
          }}
        >
          {letter}
        </div>

        <Link
          href="/"
          style={{
            padding: '0.75rem 1.6rem',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #4caf50, #2e7d32)',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          Return to calendar ⬅️
        </Link>
      </div>
    </main>
  );
}
