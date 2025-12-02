'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const STORAGE_KEY = 'maki-advent-visited';
const WRONG_KEY = 'maki-advent-wrong-guesses';

type Status = 'idle' | 'correct' | 'incorrect';

function getCellImage(id: number) {
  return `/cells/cell-${id}.png`;
}

function getRiddle(id: number): string {
  switch (id) {
    case 1:
      return (
        'Stories drawn in colors bright,\n' +
        'Voices floating through the night.\n' +
        'Heroes speak in words from far away,\n' +
        'From a place where cherry blossoms sway.'
      );
    case 2:
      return (
        'Sweet little drink in a plastic cup,\n' +
        'Chewy pearls that pop right up.\n' +
        'Even if she had too much one day,\n' +
        'There is a part of her that still feels that way.'
      );
    case 3:
      return (
        'When the world feels heavy and long,\n' +
        'She finds a place where she belongs.\n' +
        'Wrapped up close in warm embrace,\n' +
        'Held by her boyfriend in a perfect place.'
      );
    case 4:
      return (
        'Soft bright eyes and wagging tail,\n' +
        'Happy steps that never fail.\n' +
        'She sees that energy in him so clear,\n' +
        'A puppy heart she holds so dear.'
      );
    case 5:
      return (
        'New little streets she has never seen,\n' +
        'Hidden paths and secret green.\n' +
        'She loves to wander without a plan,\n' +
        'To go and find all that she can.'
      );
    case 6:
      return (
        'Petals shining in gentle light,\n' +
        'Colors soft and glowing bright.\n' +
        'On any day that feels brand new,\n' +
        'A blooming gift can change her view.'
      );
    case 7:
      return (
        'Wrapped up boxes tied with bows,\n' +
        'Little surprises no one knows.\n' +
        'Giving and receiving fills her heart,\n' +
        'Each tiny moment plays its part.'
      );
    case 8:
      return (
        'Early alarms before sunrise,\n' +
        'Shoes and trails and open skies.\n' +
        'Up she goes with morning air,\n' +
        'Chasing views she longs to share.'
      );
    case 9:
      return (
        'Worlds appear behind her eyes,\n' +
        'Castles, creatures, soft sunrise.\n' +
        'With one small thought she starts to roam,\n' +
        'Creating magic she calls home.'
      );
    case 10:
      return (
        'Warm soft layers in a line,\n' +
        'Neat and tidy, looking fine.\n' +
        'She loves hers clean and kept just so,\n' +
        'While he loves when hers are poofy like snow.'
      );
    case 11:
      return (
        'Little moments soft and sweet,\n' +
        'Placed with care when they both meet.\n' +
        'Teasing pecks or ones that stay,\n' +
        'She gives him love in her own way.'
      );
    case 12:
      return (
        'New ideas that catch her mind,\n' +
        'Questions asked of every kind.\n' +
        'She picks up knowledge quick and bright,\n' +
        'Growing wiser day and night.'
      );
    case 13:
      return (
        'Blocky hills and pixel skies,\n' +
        'Caves and tunnels full of highs.\n' +
        'Hours drift without a sound,\n' +
        'Building worlds deep underground.'
      );
    case 14:
      return (
        'Brand new things that catch her eye,\n' +
        'First time tries that flutter by.\n' +
        'Fresh small thrills that feel just right,\n' +
        'She loves what is new at first sight.'
      );
    case 15:
      return (
        'Linked up arms out on the street,\n' +
        'Cafes, parks, and little treats.\n' +
        'With him or friends, she loves the day,\n' +
        'Whenever she can get away.'
      );
    case 16:
      return (
        'Little treasures by her side,\n' +
        'Straps and pockets full of pride.\n' +
        'Colors lined like a tiny parade,\n' +
        'Choosing which one to take today.'
      );
    case 17:
      return (
        'When the world feels loud and wide,\n' +
        'Thoughts all tumble side by side.\n' +
        'She needs a moment soft and tight,\n' +
        'A tiny pause to feel alright.'
      );
    case 18:
      return (
        'Pages turning late at night,\n' +
        'Chapters drifting out of sight.\n' +
        'One more line becomes one more page,\n' +
        'Stories follow her off the stage.'
      );
    case 19:
      return (
        'Little rolls all in a row,\n' +
        'Rice and fillings, soft and slow.\n' +
        'She was unsure at first, it is true,\n' +
        'But she grew to love it while eating with him too.'
      );
    case 20:
      return (
        'Playful jokes that poke his pride,\n' +
        'Smiling eyes she cannot hide.\n' +
        'Little laughs that light the day,\n' +
        'She teases him in her sweet way.'
      );
    case 21:
      return (
        'Tap a screen when feet are sore,\n' +
        'Car appears outside the door.\n' +
        'She tries to save each time she can,\n' +
        'But sometimes comfort wins the plan.'
      );
    case 22:
      return (
        'Suitcase packed and ready to go,\n' +
        'New bright streets with lights that glow.\n' +
        'With him beside her every mile,\n' +
        'Every trip becomes worthwhile.'
      );
    case 23:
      return (
        'Long full days and steady pace,\n' +
        'Tasks completed face to face.\n' +
        'Even when the hours are long,\n' +
        'She pushes through and still stays strong.'
      );
    case 24:
      return (
        'Twinkling trees and glowing lights,\n' +
        'Red and green on winter nights.\n' +
        'Her favorite season from up above,\n' +
        'Spelled with an X in the holiday she loves.'
      );
    case 25:
      return (
        'She starts to talk about a show,\n' +
        'Then ten more thoughts begin to flow.\n' +
        'Her voice lights up with happy cheer,\n' +
        'And he loves simply hearing her near.'
      );
    case 26:
      return (
        'Fighting sleep with stubborn will,\n' +
        'Then suddenly the world grows still.\n' +
        'A tiny sound when dreams appear,\n' +
        'A triple letter you always hear.'
      );
    default:
      return (
        'Soft winter lights in gentle glow,\n' +
        'Little secrets only you know.\n' +
        'Read each line and look above,\n' +
        'Every clue whispers what she loves.'
      );
  }
}

function getAnswer(id: number): string {
  switch (id) {
    case 1:
      return 'ANIME';
    case 2:
      return 'BOBA';
    case 3:
      return 'CUDDLES';
    case 4:
      return 'DOGS';
    case 5:
      return 'EXPLORING';
    case 6:
      return 'FLOWERS';
    case 7:
      return 'GIFTS';
    case 8:
      return 'HIKING';
    case 9:
      return 'IMAGINATION';
    case 10:
      return 'JACKETS';
    case 11:
      return 'KISSES';
    case 12:
      return 'LEARNING';
    case 13:
      return 'MINECRAFT';
    case 14:
      return 'NOVELTY';
    case 15:
      return 'OUTINGS';
    case 16:
      return 'PURSES';
    case 17:
      return 'QUIET';
    case 18:
      return 'READING';
    case 19:
      return 'SUSHI';
    case 20:
      return 'TEASING';
    case 21:
      return 'UBER';
    case 22:
      return 'VACATIONS';
    case 23:
      return 'WORKING';
    case 24:
      return 'XMAS';
    case 25:
      return 'YAPPING';
    case 26:
      return 'ZZZ';
    default:
      return '';
  }
}

export default function LetterPage() {
  const params = useParams();
  const idParam = params.id as string;
  const idNumber = parseInt(idParam, 10);

  const [isMobile, setIsMobile] = useState(false);
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [wrongGuesses, setWrongGuesses] = useState(0);

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
  const expectedAnswer = getAnswer(idNumber);
  const textSize = isMobile ? '0.9rem' : '1rem';

  // Load solved state and wrong guesses
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      // solved
      const storedSolved = window.localStorage.getItem(STORAGE_KEY);
      if (storedSolved) {
        const parsedSolved: number[] = JSON.parse(storedSolved);
        if (Array.isArray(parsedSolved) && parsedSolved.includes(idNumber)) {
          setStatus('correct');
          setAnswer(expectedAnswer);
        }
      }

      // wrong guesses
      const storedWrong = window.localStorage.getItem(WRONG_KEY);
      if (storedWrong) {
        const parsedWrong = JSON.parse(storedWrong) as Record<string, number>;
        const count = parsedWrong?.[String(idNumber)] ?? 0;
        setWrongGuesses(count);
      }
    } catch {}
  }, [idNumber, expectedAnswer]);

  const updateWrongGuesses = (next: number) => {
    setWrongGuesses(next);
    if (typeof window === 'undefined') return;
    try {
      const storedWrong = window.localStorage.getItem(WRONG_KEY);
      const map = storedWrong ? (JSON.parse(storedWrong) as Record<string, number>) : {};
      map[String(idNumber)] = next;
      window.localStorage.setItem(WRONG_KEY, JSON.stringify(map));
    } catch {}
  };

  const markSolved = () => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const current: number[] = stored ? JSON.parse(stored) : [];
      if (!current.includes(idNumber)) {
        const updated = [...current, idNumber];
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      // keep wrong guess count stored, but visually we will hide the effect or override it
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
      const next = Math.min(wrongGuesses + 1, 10);
      updateWrongGuesses(next);
    }
  };

  // Opacity is based on wrong guesses, but if correct, always fully opaque
  const imageOpacity =
    status === 'correct' ? 1 : Math.min(wrongGuesses, 10) / 10;

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
        boxSizing: 'border-box',
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
          position: 'relative',
        }}
      >
        <p
          style={{
            fontSize: textSize,
            color: '#7a3b4d',
            marginBottom: '0.25rem',
          }}
        >
          Day {idNumber}
        </p>

        {/* Letter with PNGs beside it */}
        <div
          style={{
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? 12 : 16,
          }}
        >
          {imageOpacity > 0 && (
            <div
              style={{
                width: isMobile ? 56 : 72,
                height: isMobile ? 56 : 72,
                backgroundImage: `url(${getCellImage(idNumber)})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                opacity: imageOpacity,
                pointerEvents: 'none',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
              }}
            />
          )}

          <div
            style={{
              fontSize: isMobile ? '3.5rem' : '5rem',
              color: '#c2185b',
              lineHeight: 1,
            }}
          >
            {letter}
          </div>

          {imageOpacity > 0 && (
            <div
              style={{
                width: isMobile ? 56 : 72,
                height: isMobile ? 56 : 72,
                backgroundImage: `url(${getCellImage(idNumber)})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                opacity: imageOpacity,
                pointerEvents: 'none',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
              }}
            />
          )}
        </div>

        {/* Riddle text */}
        <p
          style={{
            fontSize: textSize,
            color: '#5b2433',
            marginBottom: '1rem',
            textAlign: 'center',
            whiteSpace: 'pre-line',
          }}
        >
          {getRiddle(idNumber)}
        </p>

        {/* Prompt line */}
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
              border:
                status === 'incorrect'
                  ? '2px solid #e53935'
                  : '2px solid #f4bccf',
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

            {/* Back button */}
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

        {/* Reserved space for feedback so the card does not jump */}
        <div
          style={{
            minHeight: isMobile ? '2.2rem' : '2.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {status === 'correct' && (
            <p
              style={{
                color: '#2e7d32',
                fontSize: textSize,
                margin: 0,
              }}
            >
              Your answer is correct. This day is now complete 🤍
            </p>
          )}

          {status === 'incorrect' && (
            <p
              style={{
                color: '#e53935',
                fontSize: textSize,
                margin: 0,
              }}
            >
              That is a very cute guess, but it is not quite the one hidden here. Please try again.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
