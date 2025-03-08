"use client";
import React, { useState } from "react";
import Quiz from "./components/Quiz";

const OPTIONS_QUESTIONS = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 30,
    label: "30",
  },
  {
    value: 40,
    label: "40",
  },
  {
    value: 251,
    label: "All",
  },
];

const OPTIONS_CONTINENTS = [
  {
    value: "Europe",
    label: "Europe",
  },
  {
    value: "Asia",
    label: "Asia",
  },
  {
    value: "North America",
    label: "North America",
  },
  {
    value: "Antarctica",
    label: "Antarctica",
  },
  {
    value: "Oceania",
    label: "Oceania",
  },
  {
    value: "Africa",
    label: "Africa",
  },
  {
    value: "All",
    label: "All",
  },
];

const Page = () => {
  const [screen, setScreen] = useState<"config" | "game">("config");
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [continent, setContinent] = useState("Europe");

  const handleStart = () => {
    setScreen("game");
  };

  const handleReset = () => {
    setScreen("config");
  };

  return (
    <div className="grow flex flex-col">
      <div className="p-4 h-full flex flex-col">
        {screen === "config" && (
          <>
            <div className="mt-4">
              <h3>Select total questions</h3>
              <select
                name="questions"
                id="questions"
                onChange={(e) => setTotalQuestions(+e.target.value)}
              >
                {OPTIONS_QUESTIONS.map((q) => (
                  <option key={q.value} value={q.value}>
                    {q.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <h3>Select total Continent</h3>
              <select
                name="Continent"
                id="Continent"
                onChange={(e) => setContinent(e.target.value)}
              >
                {OPTIONS_CONTINENTS.map((q) => (
                  <option key={q.value} value={q.value}>
                    {q.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full mt-4 flex justify-center">
              <button
                onClick={handleStart}
                className="px-8 py-2 border rounded-lg bg-white text-black"
              >
                Get Started
              </button>
            </div>
          </>
        )}
        {screen === "game" && (
          <>
            <Quiz totalQuestions={totalQuestions} continent={continent} />
            <div className="w-full flex justify-center grow">
              <button
                onClick={handleReset}
                className="mt-auto px-8 py-2 border rounded-lg bg-white text-black"
              >
                Reset
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
