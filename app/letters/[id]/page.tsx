'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const STORAGE_KEY = 'maki-advent-visited';

type Status = 'idle' | 'correct' | 'incorrect';

export default function LetterPage() {
  const params = useParams();
  const idParam = params.id as string;
  const idNumber = parseInt(idParam, 10);

  const [isMobile, setIsMobile] = useState(false);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const resize = () => setIsMobile(window.innerWidth < 600);
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  if (Number.isNaN(idNumber) || idNumber < 1 || idNumber > 26) {
    return (
      <main
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #ffe4f2, #ffc6cc)',
          fontFamily: 'system-ui',
        }}
      >
        <Link
          href="/"
          style={{
            padding: '0.6rem 1.4rem',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, #f06292, #e53935)',
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Return to calendar
        </Link>
      </main>
    );
  }

  const letter = String.fromCharCode(64 + idNumber);
  const expectedAnswer = letter.toUpperCase();
  const textSize = isMobile ? '0.9rem' : '1rem';

  // Load solved state
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed: number[] = JSON.parse(stored);
      if (parsed.includes(idNumber)) {
        setStatus('correct');
        setAnswer(expectedAnswer);
      }
    } catch {}
  }, [idNumber, expectedAnswer]);

  const markSolved = () => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const current: number[] = stored ? JSON.parse(stored) : [];
      if (!current.includes(idNumber)) {
        const updated = [...current, idNumber];
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
    } catch {}
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const norm = answer.trim().toUpperCase();
    if (!norm) {
      setStatus('idle');
      return;
    }
    if (norm === expectedAnswer) {
      setStatus('correct');
      markSolved();
    } else {
      setStatus('incorrect');
    }
  };

  return (
    <main
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at top, #ffe4f2, #ffc6cc 40%, #f8d9c7)',
        padding: '1.5rem',
        fontFamily: 'system-ui',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '24px',
          padding: isMobile ? '1.5rem' : '2rem 3rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          width: '100%',
          maxWidth: 460,
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        <p style={{ fontSize: textSize, color: '#7a3b4d', marginBottom: '0.25rem' }}>
          Day {idNumber}
        </p>

        <div
          style={{
            fontSize: isMobile ? '3.5rem' : '5rem',
            marginBottom: '1rem',
            color: '#c2185b',
          }}
        >
          {letter}
        </div>

        <p
          style={{
            fontSize: textSize,
            color: '#5b2433',
            marginBottom: '1rem',
            textAlign: 'center',
            whiteSpace: 'pre-line',
          }}
        >
          {`Soft winter lights and cocoa steam,
Little secrets tucked inside this theme.
Read every line and look above,
Each tiny clue asks, "What does Maki love?" 💌`}
        </p>

        <p
          style={{
            fontSize: textSize,
            color: '#7a3b4d',
            marginBottom: '0.75rem',
          }}
        >
          What does Maki love?
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}
        >
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            style={{
              padding: '0.7rem 0.9rem',
              borderRadius: '999px',
              border: status === 'incorrect' ? '2px solid #e53935' : '2px solid #f4bccf',
              fontSize: textSize,
              background: '#ffe9f3',
              width: '100%',
              maxWidth: 320,
              textAlign: 'center',
              color: '#b00040',
            }}
            placeholder="Your answer"
          />

          <div
            style={{
              display: 'flex',
              gap: '0.6rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {/* Check button (pink) */}
            <button
              type="submit"
              disabled={status === 'correct'}
              style={{
                padding: isMobile ? '0.65rem 1.4rem' : '0.75rem 1.6rem',
                borderRadius: '999px',
                border: 'none',
                background: 'linear-gradient(135deg, #ffb3c6, #ff6f91)',
                color: 'white',
                fontSize: textSize,
                minWidth: 140,
                cursor: status === 'correct' ? 'default' : 'pointer',
                opacity: status === 'correct' ? 0.95 : 1,
              }}
            >
              {status === 'correct' ? 'Solved' : 'Check answer'}
            </button>

            {/* Back button (same palette as reset on homepage) */}
            <Link
              href="/"
              style={{
                padding: isMobile ? '0.65rem 1.4rem' : '0.75rem 1.6rem',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #f06292, #e53935)',
                color: 'white',
                minWidth: 140,
                textAlign: 'center',
                textDecoration: 'none',
                fontSize: textSize,
              }}
            >
              Return to calendar
            </Link>
          </div>
        </form>

        {status === 'correct' && (
          <p
            style={{
              color: '#2e7d32',
              fontSize: textSize,
            }}
          >
            Your answer is correct! This day is now complete 🤍
          </p>
        )}

        {status === 'incorrect' && (
          <p
            style={{
              color: '#e53935',
              fontSize: textSize,
            }}
          >
            Cute, but not quite. Try again!
          </p>
        )}
      </div>
    </main>
  );
}
