'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Renders a fixed-size design canvas (width x height in px) scaled to fit the
 * width of its container, so it stays crisp and proportional on every screen.
 */
const ScaledPage = ({ html, width, height, className = '' }) => {
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / width);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden"
      style={{ height: scale ? height * scale : undefined, aspectRatio: scale ? undefined : `${width} / ${height}` }}
    >
      <div
        className={className}
        style={{
          width,
          height,
          transform: `scale(${scale ?? 0})`,
          transformOrigin: '0 0',
          visibility: scale ? 'visible' : 'hidden',
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default ScaledPage;
