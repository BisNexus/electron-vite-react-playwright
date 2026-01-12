import React from "react";

interface ButtonProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  onIncrement: () => void;
}

const Button: React.FC<ButtonProps> = ({ count, onIncrement }) => {
  return <button onClick={onIncrement}>count is {count}</button>;
};

export default Button;
