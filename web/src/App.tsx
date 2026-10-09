import { useEffect, useState } from "react";

export default function App() {
  // useState: a value React remembers and redraws the screen when it changes
  const [dbTime, setDbTime] = useState("loading...");

  // useEffect with [] runs once, after the first draw
  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((data) => setDbTime(data.dbTime))
      .catch(() => setDbTime("error"));
  }, []);

  return <h1>Database time: {dbTime}</h1>;
}