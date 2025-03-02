"use client";
import { useState, useEffect } from "react";
import flags, { Flag } from "../../../data/flags";
import Image from "next/image";
import { getRandomIndex } from "@/utils";

type QuizProps = {
  totalQuestions?: number;
  continent?: string;
};

let timerIdTrueAnswer: ReturnType<typeof setTimeout>;

const Quiz: React.FC<QuizProps> = ({
  totalQuestions = 10,
  continent = null,
}) => {
  const [questions, setQuestions] = useState<Flag[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  useEffect(() => {
    const filteredFlags = continent
      ? flags.filter((flag) => flag.continent === continent)
      : flags;

    // Randomize questions
    const selectedQuestions: Flag[] = [];
    for (let i = 0; i < totalQuestions; i++) {
      const randomIndex = getRandomIndex(filteredFlags.length);
      selectedQuestions.push(filteredFlags[randomIndex]);
    }

    setQuestions(selectedQuestions);
  }, [continent, totalQuestions]);

  const handleAnswer = (answer: string) => {
    console.log(answer, correctAnswer);
    setSelectedAnswer((prev) => [...prev, answer]);
    if (answer !== correctAnswer) {
      return;
    }
    // Delay for 0.5 seconds before moving to the next question
    if (timerIdTrueAnswer) {
      clearTimeout(timerIdTrueAnswer);
    }
    timerIdTrueAnswer = setTimeout(() => {
      setSelectedAnswer([]);
      setCurrentQuestionIndex((prev) => (prev + 1) % totalQuestions);
    }, 500);
  };

  useEffect(() => {
    if (questions.length > 0) {
      setCorrectAnswer(questions[currentQuestionIndex].name);
    }
  }, [questions, currentQuestionIndex]);

  if (questions.length === 0) return <div>Loading...</div>;

  const currentQuestion = questions[currentQuestionIndex];

  const answerOptions = [
    currentQuestion.name,
    ...flags
      .filter((f) => f.id !== currentQuestion.id)
      .slice(0, 3)
      .map((f) => f.name),
  ];

  // Shuffle answer options
  // answerOptions.sort(() => Math.random() - 0.5);

  console.log(selectedAnswer);

  return (
    <div>
      <h3 className="text-center">Which country&apos;s flag is this?</h3>
      <div className="mb-2 mt-4 mx-auto w-fit">
        <Image
          src={`/images/${currentQuestion.img}`.toString()}
          alt={currentQuestion.name}
          width={200}
          height={100}
        />
      </div>
      <div className="mt-8">
        <div className="flex flex-wrap gap-4">
          {answerOptions.map((answer, idx) => (
            <button
              className="w-[calc(50%-16px)] px-2 py-2 border border-white rounded-lg"
              key={idx}
              onClick={() => handleAnswer(answer)}
              style={{
                backgroundColor: selectedAnswer.includes(answer)
                  ? answer === correctAnswer
                    ? "green"
                    : "red"
                  : "",
                fontSize: answer.length >= 20 ? 12 : 16,
              }}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
