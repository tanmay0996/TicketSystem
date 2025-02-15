// ClickSpark.jsx
import React, { useEffect, useState } from 'react';

const ClickSpark = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 50,
  sparkCount = 8,
  duration = 1000,
}) => {
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    // Generate an array of spark objects with evenly spaced angles
    const generatedSparks = Array.from({ length: sparkCount }, (_, i) => ({
      id: i,
      angle: (360 / sparkCount) * i,
    }));
    setSparks(generatedSparks);
    const timer = setTimeout(() => setSparks([]), duration);
    return () => clearTimeout(timer);
  }, [sparkCount, duration]);

  return (
    <div style={{ position: 'relative' }}>
      <style>
        {`
          @keyframes sparkAnim {
            to {
              opacity: 0;
              transform: var(--transform-to);
            }
          }
        `}
      </style>
      {sparks.map((spark) => {
        const radians = (spark.angle * Math.PI) / 180;
        const x = Math.cos(radians) * sparkRadius;
        const y = Math.sin(radians) * sparkRadius;
        return (
          <div
            key={spark.id}
            style={{
              position: 'absolute',
              width: sparkSize,
              height: sparkSize,
              backgroundColor: sparkColor,
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `sparkAnim ${duration}ms forwards`,
              '--transform-to': `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0)`,
            }}
          />
        );
      })}
    </div>
  );
};

export default ClickSpark;
