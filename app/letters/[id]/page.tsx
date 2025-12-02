'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function LetterPage() {
  const params = useParams();
  // params.id will be "1", "2", ..., "26"
  const idParam = params.id as string;
  const idNumber = parseInt(idParam, 10);

  // Basic validation: only allow 1–26
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
          background: '#f5f5f5',
        }}
      >
        <p style={{ marginBottom: '1rem' }}>Invalid letter page.</p>
        <Link
          href="/"
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '999px',
            background: '#333',
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Return to grid
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
        background: '#f5f5f5',
      }}
    >
      <div
        style={{
          fontSize: '6rem',
          marginBottom: '2rem',
        }}
      >
        {letter}
      </div>

      <Link
        href="/"
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '999px',
          background: '#333',
          color: 'white',
          textDecoration: 'none',
        }}
      >
        Return
      </Link>
    </main>
  );
}
