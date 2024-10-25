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
  const [correctness, setCorrectness] = useState(Array(maxAttempts).fill('').map(() => Array(slotsPerAttempt).fill('')));
  const [gameOver, setGameOver] = useState(false); // New state to manage game over status
  const inputRefs = useRef(Array(maxAttempts).fill(null).map(() => Array(slotsPerAttempt).fill(null)));

  useEffect(() => {
    if (inputRefs.current[currentAttempt][currentSlot]) {
      inputRefs.current[currentAttempt][currentSlot].focus();
    }
  }, [currentAttempt, currentSlot]);

  const handleChange = (index: number, slotIndex: number, value: string) => {
    if (!/^[a-zA-Z]*$/.test(value) || gameOver) {
      return; // Prevent changes if game is over
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
    if (gameOver) return; // Prevent key actions if game is over

    if (e.key === 'Backspace' && values[index][slotIndex] === '' && slotIndex > 0) {
      setCurrentSlot(slotIndex - 1);
    } else if (e.key === 'Enter' && slotIndex === slotsPerAttempt - 1 && currentAttempt < maxAttempts - 1) {
      const currentLetters = values[currentAttempt].filter((letter) => letter !== '').length;
  
      if (currentLetters !== slotsPerAttempt) {
        return;
      }
  
      const newCorrectness = correctness.map((attempt) => [...attempt]);
  
      for (let i = 0; i < slotsPerAttempt; i++) {
        if (values[currentAttempt][i] === word[i]) {
          newCorrectness[currentAttempt][i] = 'correct';
        } else if (word.includes(values[currentAttempt][i])) {
          newCorrectness[currentAttempt][i] = 'incorrect';
        } else {
          newCorrectness[currentAttempt][i] = 'absent'; // Mark as absent if the letter is not in the word
        }
      }
  
      setCorrectness(newCorrectness);

      if (newCorrectness[currentAttempt].every((letter) => letter === 'correct')) {
        alert('Parabéns! Acertaste na palavra!');
        setGameOver(true); // Set game over to true
        return;
      }
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
                  onKeyDown={( e) => handleKeyDown(index, slotIndex, e)}
                  className={`${styles.letter} ${correctness[index][slotIndex] === 'correct' ? styles.correct : correctness[index][slotIndex] === 'incorrect' ? styles.incorrect : correctness[index][slotIndex] === 'absent' ? styles.absent : ''}`}
                  disabled={index !== currentAttempt || (index === currentAttempt && slotIndex !== currentSlot) || gameOver} // Disable inputs if game is over
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
}