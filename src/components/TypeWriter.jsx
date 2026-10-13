'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Typing word for the hero headlines (shared by the service pages).
 * - The server HTML and the first paint show the first phrase in full, so the sentence is
 *   always complete for search engines and before JavaScript runs.
 * - Screen readers hear the first phrase once; the typing itself is aria-hidden.
 * - Visitors who ask for reduced motion see the first phrase, still.
 * - It types through the phrases once and stops on the last one, so it does not loop forever.
 *
 * @param {{ phrases: string[], blink?: string }} props
 *   blink: the page's cursor keyframe name (each page defines its own, e.g. "la-blink")
 */
export default function TypeWriter({ phrases, blink }) {
  const reduceMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(phrases[0]);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduceMotion || done) return undefined;
    const phrase = phrases[phraseIdx];
    const last = phraseIdx === phrases.length - 1;
    let delay;
    if (!isDeleting && displayed === phrase) {
      if (last) {
        setDone(true);
        return undefined;
      }
      delay = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed === '') {
      delay = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIdx((i) => i + 1);
      }, 400);
    } else if (isDeleting) {
      delay = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length - 1)), 42);
    } else {
      delay = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 88);
    }
    return () => clearTimeout(delay);
  }, [displayed, phraseIdx, isDeleting, done, reduceMotion, phrases]);

  return (
    <span>
      <span aria-hidden="true">
        {reduceMotion ? phrases[0] : displayed}
        {!done && !reduceMotion && (
          <span
            className="inline-block w-[3px] h-[0.82em] bg-[#1044ff] ml-[3px] align-middle"
            style={blink ? { animation: `${blink} 1s ease-in-out infinite` } : undefined}
          />
        )}
      </span>
      <span className="sr-only">{phrases[0]}</span>
    </span>
  );
}
