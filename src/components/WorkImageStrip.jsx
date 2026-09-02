import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';

/**
 * WorkImageStrip — reusable scrolling portfolio image marquee with lightbox.
 *
 * Props:
 *   table      {string}  Supabase table to fetch images from (required)
 *   speed      {number}  Scroll duration in seconds — higher = slower (default 33)
 *   label      {string}  Small label above the strip (default 'Recent Work')
 *   fadeColor  {string}  CSS colour the edge gradients fade to; match the page
 *                        background (default '#ffffff')
 */
const WorkImageStrip = ({
  table,
  speed = 33,
  label = 'Recent Work',
  fadeColor = '#ffffff',
}) => {
  const [images, setImages]     = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!table) return;
    supabase
      .from(table)
      .select('id, image_url, alt_text, display_order')
      .order('display_order', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data?.length) setImages(data);
      });
  }, [table]);

  const close = useCallback(() => setSelected(null), []);

  // Escape key closes lightbox
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, close]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  if (images.length === 0) return null;

  // Pad to at least 10 tiles so the track always overflows its container
  const repeat = Math.ceil(10 / images.length);
  const padded = Array.from({ length: repeat }, () => images).flat();
  const tiles  = [...padded, ...padded]; // doubled for translateX(-50%) loop

  const leftFade  = { background: `linear-gradient(to right, ${fadeColor}, transparent)` };
  const rightFade = { background: `linear-gradient(to left,  ${fadeColor}, transparent)` };

  return (
    <>
      <div className="w-full bg-white">
        {/* Label — centred across full width */}
        <div className="flex items-center justify-center gap-3 pt-6 pb-5">
          <span className="h-px w-10 bg-gray-200 flex-shrink-0" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] whitespace-nowrap">
            {label}
          </span>
          <span className="h-px w-10 bg-gray-200 flex-shrink-0" />
        </div>

        {/* 70 % centred container — leaves 10-15 % truly empty on each side */}
        <div className="w-full lg:w-[70%] lg:mx-auto pb-6">
          <div className="relative border-t border-b border-gray-100 py-5 overflow-hidden">
            {/* Edge fades — desktop only */}
            <div className="hidden lg:block absolute inset-y-0 left-0 lg:w-[18%] z-10 pointer-events-none" style={leftFade} />
            <div className="hidden lg:block absolute inset-y-0 right-0 lg:w-[18%] z-10 pointer-events-none" style={rightFade} />

            <style>{`
              @keyframes wis-scroll {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              /* mobile: faster */
              .wis-track {
                animation: wis-scroll ${Math.round(speed / 2)}s linear infinite;
                will-change: transform;
              }
              /* desktop: normal speed */
              @media (min-width: 1024px) {
                .wis-track { animation-duration: ${speed}s; }
              }
              .wis-track:hover {
                animation-play-state: paused;
              }
            `}</style>

            <div className="wis-track flex gap-3 md:gap-4 items-center">
              {tiles.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelected(img)}
                  className="relative group/card flex-shrink-0 w-40 h-[107px] md:w-72 md:h-48 rounded-[2rem] overflow-hidden bg-white border border-[#1044ff]/20 shadow-md cursor-zoom-in transition-all duration-300 hover:shadow-xl hover:shadow-[#1044ff]/15 hover:border-[#1044ff]/60"
                >
                  <img
                    src={img.image_url}
                    alt={img.alt_text || 'Work sample'}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                  />
                  {/* Soft white shimmer on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Lightbox (2× card size, above everything) ── */}
      {selected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm"
          onClick={close}
        >
          {/* Image card — stop propagation so only backdrop click closes */}
          <div
            className="relative w-[576px] max-w-[92vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selected.image_url}
              alt={selected.alt_text || 'Work sample'}
              className="w-full h-auto max-h-[85vh] object-contain rounded-[2rem] shadow-2xl"
            />

            {/* Close — pinned to top-right corner of the image */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg hover:bg-gray-100 active:scale-95 transition-all duration-150"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkImageStrip;
