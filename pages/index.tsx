import { useState, useRef, useEffect } from 'react';
import DefaultLayout from '@/layouts/default';
import styles from '@/styles/index.module.css';
import Head from 'next/head';
import { isMobile } from '@/utils/detectMobile';
import { getRandomWord, checkWord } from '@/server/data/words';
import ConfettiExplosion from 'react-confetti-explosion';

export default function Index() {
  const length = 5;
  const maxAttempts = 6;
  const slotsPerAttempt = length;
  const [word, setWord] = useState('');
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentSlot, setCurrentSlot] = useState(0);
  const [values, setValues] = useState(Array(maxAttempts).fill('').map(() => Array(slotsPerAttempt).fill('')));
  const [correctness, setCorrectness] = useState(Array(maxAttempts).fill('').map(() => Array(slotsPerAttempt).fill('')));
  const [gameOver, setGameOver] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [bounce, setBounce] = useState(false); // New state to manage bounce animation
  const [isExploding, setIsExploding] = useState(false);
  const inputRefs = useRef(Array(maxAttempts).fill(null).map(() => Array(slotsPerAttempt).fill(null)));

  useEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  useEffect(() => {
    setWord(getRandomWord(length));
  }, []);

  useEffect(() => {
    if (inputRefs.current[currentAttempt][currentSlot]) {
      inputRefs.current[currentAttempt][currentSlot].focus();
    }
  }, [currentAttempt, currentSlot]);

  const handleChange = (index: number, slotIndex: number, value: string) => {
    if (!/^[a-zA-Z]*$/.test(value) || gameOver) {
      return;
    }

    const newValues = values.map((attempt, i) => 
      i === index ? attempt.map((slot, j) => j === slotIndex ? value : slot) : attempt
    );

    setValues(newValues);

    if (value.length === 1 && slotIndex < slotsPerAttempt - 1) {
      setCurrentSlot(slotIndex + 1);
    }
  };

  const handleKeyDown = (index: number, slotIndex: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (gameOver) return;

    if (e.key === 'Backspace' && values[index][slotIndex] === '' && slotIndex > 0) {
      setCurrentSlot(slotIndex - 1);
    } else if (e.key === 'Enter' && slotIndex === slotsPerAttempt - 1) {
      const currentLetters = values[currentAttempt].filter((letter) => letter !== '').length;

      if(currentAttempt === maxAttempts - 1 && values[currentAttempt].join('') !== word) {
        setGameOver(true);
        return;
      }

      if (currentLetters !== slotsPerAttempt) {
        return;
      }

      if (!checkWord(values[currentAttempt].join(""))) {
        setBounce(true);
        setTimeout(() => setBounce(false), 500);
        return;
      }

      if(values[currentAttempt].join('') === word) {
        setIsExploding(true);
        setTimeout(() => {
          setIsExploding(false);
        }, 5000);
      }

      const newCorrectness = correctness.map((attempt) => [...attempt]);

      const letterCounts = word.split('').reduce((acc: { [key: string]: number }, letter: string) => {
        acc[letter] = (acc[letter] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });

      const usedLetters: { [key: string]: number } = {};

      for (let i = 0; i < slotsPerAttempt; i++) {
        if (values[currentAttempt][i] === word[i]) {
          newCorrectness[currentAttempt][i] = 'correct';
          usedLetters[values[currentAttempt][i]] = (usedLetters[values[currentAttempt][i]] || 0) + 1;
        }
      }

      for (let i = 0; i < slotsPerAttempt; i++) {
        if (newCorrectness[currentAttempt][i] !== 'correct') {
          const letter = values[currentAttempt][i];
          if (word.includes(letter) && (usedLetters[letter] || 0) < letterCounts[letter]) {
            newCorrectness[currentAttempt][i] = 'incorrect';
            usedLetters[letter] = (usedLetters[letter] || 0) + 1;
          } else {
            newCorrectness[currentAttempt][i] = 'absent';
          }
        }
      }

      setCorrectness(newCorrectness);
      setCurrentAttempt(currentAttempt + 1);
      setCurrentSlot(0);
    }
  };

  return (
    <DefaultLayout>
      <Head>
        <title>Wordiz | Melhora o teu vocabulário em português!</title>
        <meta name="description" content="Com o Wordiz, podes melhorar o teu vocabulário de uma forma divertida!" />
      </Head>
      <div className={styles.main}>
        <h1 className={styles.h1}>Descobre a palavra 🤔</h1>
        <div className={styles.confetti_left}>{isExploding && <ConfettiExplosion width={1000} particleCount={300} />}</div>
        <div className={styles.confetti_right}>{isExploding && <ConfettiExplosion width={1000} particleCount={300} />}</div>
        {gameOver && (
          <div className={styles.gameOver}>
            <p>Game Over! A palavra era {word}</p>
          </div>
        )}
        {isMobileDevice && (
          <div className={styles.warning}>
            <p>Desculpa, mas o Wordiz ainda não está disponível para dispositivos móveis.</p>
          </div>
        )}
        {!isMobileDevice &&
          <div className={styles.words}>
            {Array.from({ length: maxAttempts }).map((_, index) => (
              <div key={index} className={styles.attempt}>
                {Array.from({ length: slotsPerAttempt }).map((_, slotIndex) => (
                  <input
                    type="text"
                    maxLength={1}
                    value={values[index][slotIndex]}
                    key={slotIndex}
                    ref={(el) => {
                      inputRefs.current[index][slotIndex] = el;
                    }}
                    onChange={(e) => handleChange(index, slotIndex, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, slotIndex, e)}
                    className={`${styles.letter} ${correctness[index][slotIndex] === 'correct' ? styles.correct : correctness[index][slotIndex] === 'incorrect' ? styles.incorrect : correctness[index][slotIndex] === 'absent' ? styles.absent : ''} ${bounce && index === currentAttempt ? styles.bounce : ''}`}
                    disabled={index !== currentAttempt || (index === currentAttempt && slotIndex !== currentSlot) || gameOver}
                  />
                ))}
              </div>
            ))}
          </div>
        }
      </div>
    </DefaultLayout>
  );
}