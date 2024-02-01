import React from 'react';
import Confetti from 'react-confetti';

const ConfettiComponent = ({ runConfetti }) => {
  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={runConfetti ? 200 : 0}
    />
  );
};

export default ConfettiComponent;
