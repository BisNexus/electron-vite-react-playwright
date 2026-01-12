import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import { increment } from "./utils/increment";

function App() {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(prev => increment(prev));
  }

  return (
    <>
      <h1>Electron + Vite + React</h1>
      <div className="card">
        <Button count={count} setCount={setCount} onIncrement={handleIncrement} />
      </div>
    </>
  );
}

export default App;
