
import "../../index.css";
import React, { useState, useEffect, useCallback } from "react";
import quiz_data from "../data/quiz_data";

const QUESTION_COUNT = 20;

const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const Quiz = ({ onClose }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const initQuiz = useCallback(() => {
    const randomQuestions = shuffle(quiz_data.quiz.questions)
      .slice(0, QUESTION_COUNT)
      .map((q) => ({ ...q, options: shuffle(q.options) }));
    setQuestions(randomQuestions);
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setIsFinished(false);
  }, []);

  useEffect(() => {
    initQuiz();
  }, [initQuiz]);

  const handleAnswer = (option) => {
    if (hasAnswered) return;
    setSelectedAnswer(option);
    setHasAnswered(true);
    if (option === questions[currentIndex].reponse_correcte) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setIsFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    }
  };

  const getOptionClasses = (option) => {
    const base =
      "w-full text-left px-5 py-3 rounded-xl border-2 font-['29LT_RiwayaInformal'] text-base transition-all duration-200 cursor-pointer";

    if (!hasAnswered)
      return `${base} bg-white border-[#D9D5D2] text-[#374B62] hover:bg-[#7AADD4] hover:border-[#1B6BAA] hover:text-white`;

    if (option === questions[currentIndex].reponse_correcte)
      return `${base} bg-[#FFE453] border-[#FFE453] text-[#374B62] font-semibold`;

    if (option === selectedAnswer)
      return `${base} bg-[#8C7269] border-[#8C7269] text-white`;

    return `${base} bg-white border-[#D9D5D2] text-[#374B62] opacity-50`;
  };

  // --- Écran de chargement ---
  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#374B62]">
        <p className="font-[ text-[#FFE453]'Bebas_Neue'] animate-pulse text-3xl tracking-widest">
          Chargement…
        </p>
      </div>
    );
  }

  // --- Écran de résultat ---
  if (isFinished) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#374B62] px-4">
        <div className="w-full max-w-md rounded-3xl bg-[#D9D5D2] p-10 text-center shadow-2xl">
          <h1 className="font-['Bebas_Neue'] mb-2 text-5xl tracking-wide text-[#374B62]">
            Résultat
          </h1>
          <p className="font-['29LT_RiwayaInformal'] mb-1 text-xl text-[#1B6BAA]">
            Votre score :
          </p>
          <p className="font-['Bebas_Neue'] mb-6 text-7xl text-[#1B6BAA]">
            {score}
            <span className="text-4xl text-[#8C7269]"> / {questions.length}</span>
          </p>

          {/* Barre de progression du score */}
          <div className="mb-8 h-4 w-full overflow-hidden rounded-full bg-white">
            <div
              className="h-4 rounded-full bg-[#FFE453] transition-all duration-700"
              style={{ width: `${(score / questions.length) * 100}%` }}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={initQuiz}
              className="font-[ bg-[#1B6BAA] text-white hover:bg-[#7AADD4]'Bebas_Neue'] rounded-xl px-8 py-3 text-xl tracking-widest transition-colors duration-200"
            >
              Rejouer
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="font-[ bg-[#8C7269] text-white hover:bg-[#374B62]'Bebas_Neue'] rounded-xl px-8 py-3 text-xl tracking-widest transition-colors duration-200"
              >
                Fermer
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- Écran de question ---
  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#374B62] px-4 py-8">
      <div className="w-full max-w-xl rounded-3xl bg-[#D9D5D2] p-8 shadow-2xl">

        {/* Header : progression */}
        <div className="mb-3 flex items-center justify-between">
          <span className="font-['Bebas_Neue'] text-lg tracking-widest text-[#1B6BAA]">
            MACE-GO QUIZ
          </span>
          <span className="font-['29LT_RiwayaInformal'] text-sm text-[#8C7269]">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Barre de progression */}
        <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-white">
          <div
            className="h-2 rounded-full bg-[#FFE453] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question */}
        <h2 className="font-['Bebas_Neue'] mb-6 min-h-[4rem] text-2xl leading-snug tracking-wide text-[#374B62]">
          {questions[currentIndex].question}
        </h2>

        {/* Options */}
        <div className="mb-6 flex flex-col gap-3">
          {questions[currentIndex].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={getOptionClasses(option)}
              disabled={hasAnswered}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Bouton Suivant */}
        {hasAnswered && (
          <button
            onClick={handleNext}
            className="font-[ w-full bg-[#1B6BAA] text-white hover:bg-[#374B62]'Bebas_Neue'] rounded-xl py-3 text-xl tracking-widest transition-colors duration-200"
          >
            {currentIndex + 1 >= questions.length ? "Voir le résultat" : "Question suivante →"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
