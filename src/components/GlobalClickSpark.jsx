// GlobalClickSpark.jsx
import React, { useState, useEffect } from 'react';
import ClickSpark from './ClickSpark';

const GlobalClickSpark = () => {
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const sparkId = Date.now();
      const { clientX, clientY } = e;
      // Add a new spark event with click coordinates
      setSparks((prev) => [
        ...prev,
        { id: sparkId, x: clientX, y: clientY },
      ]);
      // Remove the spark after the animation duration (e.g., 400ms)
      setTimeout(() => {
        setSparks((prev) => prev.filter((spark) => spark.id !== sparkId));
      }, 400);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    // A full-screen container with pointerEvents: 'none' so it doesn't interfere with UI
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {sparks.map((spark) => (
        <div
          key={spark.id}
          style={{
            position: 'absolute',
            left: spark.x,
            top: spark.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <ClickSpark
            sparkColor="#fff"
            sparkSize={10}
            sparkRadius={30}
            sparkCount={8}
            duration={400}
          />
        </div>
      ))}
    </div>
  );
};

export default GlobalClickSpark;
