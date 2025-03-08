"use client";
import { useState, useEffect, useMemo } from "react";
import flags, { Flag } from "../../../data/flags";
import Image from "next/image";
import { getRandomElements, getRandomIndex } from "@/utils";

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
  const [score, setScore] = useState(0); // Added score state
  const [quizFinished, setQuizFinished] = useState(false); // Track if quiz is finished
  const [usedQuestions, setUsedQuestions] = useState<Flag[]>([]); // Track if quiz is finished

  const filteredFlags = useMemo(() => {
    return continent
      ? flags.filter((flag) => flag.continent === continent)
      : flags;
  }, [[flags, continent]]);

  useEffect(() => {
    // Randomize questions
    const selectedQuestions: Flag[] = [];
    for (let i = 0; i < totalQuestions; i++) {
      const randomIndex = getRandomIndex(filteredFlags.length);
      selectedQuestions.push(filteredFlags[randomIndex]);
    }

    setQuestions(selectedQuestions);
  }, [continent, totalQuestions]);

  const handleAnswer = (answer: string) => {
    if (selectedAnswer?.length) {
      return;
    }
    setSelectedAnswer((prev) => [...prev, answer]);
    if (answer === correctAnswer) {
      setScore((prev) => prev + 1); // Increment score if correct answer
      setUsedQuestions((prev) => [...prev, currentQuestion]);
    }

    // Delay for 0.5 seconds before moving to the next question
    if (timerIdTrueAnswer) {
      clearTimeout(timerIdTrueAnswer);
    }
    timerIdTrueAnswer = setTimeout(() => {
      setSelectedAnswer([]);
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prev) => prev + 1); // Move to next question
      } else {
        setQuizFinished(true); // Finish the quiz when last question is reached
      }
    }, 500);
  };

  useEffect(() => {
    if (questions.length > 0) {
      setCorrectAnswer(questions[currentQuestionIndex].name);
    }
  }, [questions, currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];

  const answerOptionSuffled = useMemo(() => {
    if (!currentQuestion) return [];
    const wrongOptions = getRandomElements(
      filteredFlags.filter((f) => f.id !== currentQuestion.id),
      3
    );
    const answerOptions = [
      currentQuestion.name,
      ...wrongOptions.map((f) => f.name),
    ];
    return answerOptions.sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  // Restart quiz logic
  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedAnswer([]);
    setQuizFinished(false);

    const filteredFlags = continent
      ? flags.filter((flag) => flag.continent === continent)
      : flags;

    const selectedQuestions: Flag[] = [];
    for (let i = 0; i < totalQuestions; i++) {
      const randomIndex = getRandomIndex(filteredFlags.length);
      selectedQuestions.push(filteredFlags[randomIndex]);
    }

    setQuestions(selectedQuestions);
  };

  if (answerOptionSuffled.length === 0) return <div>Loading...</div>;

  return (
    <div>
      {quizFinished ? (
        <div className="text-center">
          <h3>Quiz Finished!</h3>
          <p>
            Your score: {score} / {totalQuestions}
          </p>
          <button
            className="mt-4 px-4 py-2 border rounded-lg"
            onClick={restartQuiz}
            style={{ backgroundColor: "#4CAF50", color: "white" }}
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <>
          <h3 className="text-center">Which country&apos;s flag is this?</h3>
          <div className="mb-2 mt-4 mx-auto w-fit min-h-[150px]">
            <div className="shadow shadow-amber-50">
              <Image
                src={`/images/${currentQuestion.img}`.toString()}
                alt={currentQuestion.name}
                width={200}
                height={100}
              />
            </div>
          </div>
          <div className="mt-8">
            <div className="flex flex-wrap gap-4">
              {answerOptionSuffled.map((answer, idx) => (
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
                    fontSize: answer.length >= 18 ? 12 : 16,
                  }}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
