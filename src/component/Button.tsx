import React from 'react';

interface ButtonProps {
  onClick: () => void;
}

const Button = ({ onClick }: ButtonProps) => {
  return <button onClick={onClick}>Run Command</button>;
};

export default Button;
