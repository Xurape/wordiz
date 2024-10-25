import { useState, useRef, useEffect } from 'react';
import DefaultLayout from '@/layouts/default';
import styles from '@/styles/index.module.css';
import Head from 'next/head';

export default function Index() {
  let word = 'clube';
  const maxAttempts = 6;
  const slotsPerAttempt = word.length;
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentSlot, setCurrentSlot] = useState(0);
  const [values, setValues] = useState(Array(maxAttempts).fill('').map(() => Array(slotsPerAttempt).fill('')));
  const inputRefs = useRef(Array(maxAttempts).fill(null).map(() => Array(slotsPerAttempt).fill(null)));

  useEffect(() => {
    if (inputRefs.current[currentAttempt][currentSlot]) {
      inputRefs.current[currentAttempt][currentSlot].focus();
    }
  }, [currentAttempt, currentSlot]);

  const handleChange = (index: number, slotIndex: number, value: string) => {
    const newValues = values.map((attempt, i) => 
      i === index ? attempt.map((slot, j) => j === slotIndex ? value : slot) : attempt
    );

    setValues(newValues);

    if (value.length === 1 && slotIndex < slotsPerAttempt - 1) {
      setCurrentSlot(slotIndex + 1);
    }
  };

  const handleKeyDown = (index: number, slotIndex: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && values[index][slotIndex] === '' && slotIndex > 0) {
      setCurrentSlot(slotIndex - 1);
    } else if (e.key === 'Enter' && slotIndex === slotsPerAttempt - 1 && currentAttempt < maxAttempts - 1) {
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
        <h1 className={styles.h1}>Descobre a palavra diária ✨</h1>
        <div className={styles.words}>
          {Array.from({ length: maxAttempts }).map((_, index) => (
            <div key={index} className={styles.attempt}>
              {Array.from({ length: slotsPerAttempt }).map((_, slotIndex) => (
                <input
                  type="text"
                  maxLength={1}
                  value={values[index][slotIndex]}
                  key={slotIndex}
                  ref={(el) => inputRefs.current[index][slotIndex] = el}
                  onChange={(e) => handleChange(index, slotIndex, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, slotIndex, e)}
                  className={styles.letter}
                  disabled={index !== currentAttempt || (index === currentAttempt && slotIndex !== currentSlot)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}