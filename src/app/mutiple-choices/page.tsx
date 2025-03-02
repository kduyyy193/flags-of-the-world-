import React from "react";
import Quiz from "./components/Quiz";

const Page = () => {
  return (
    <div>
      <h1 className="text-lg font-semibold mt-4 text-center">
        Mutiple Choices Game
      </h1>
      <div className="p-4">
        <Quiz totalQuestions={10} continent="Europe" />{" "}
      </div>
    </div>
  );
};

export default Page;
