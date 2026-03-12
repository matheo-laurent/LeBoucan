import React, { useState, useEffect, useCallback } from "react";
import quiz_data from "./quiz_data";

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

  const getOptionClass = (option) => {
    if (!hasAnswered) return "option";
    if (option === questions[currentIndex].reponse_correcte) return "option correct";
    if (option === selectedAnswer) return "option incorrect";
    return "option";
  };

  if (questions.length === 0) return <div>Chargement...</div>;

  if (isFinished) {
    return (
      <div className="quiz-container">
        <h2>Quiz terminé !</h2>
        <p>
          Votre score : {score} / {questions.length}
        </p>
        <button onClick={initQuiz}>Rejouer</button>
        {onClose && <button onClick={onClose}>Fermer</button>}
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <span>
          Question {currentIndex + 1} / {questions.length}
        </span>
        <span>Score : {score}</span>
      </div>

      <h2 className="quiz-question">{currentQuestion.question}</h2>

      <div className="quiz-options">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={getOptionClass(option)}
            onClick={() => handleAnswer(option)}
            disabled={hasAnswered}
          >
            {option}
          </button>
        ))}
      </div>

      {hasAnswered && (
        <div className="quiz-feedback">
          {selectedAnswer === currentQuestion.reponse_correcte
            ? "✅ Bonne réponse !"
            : `❌ Mauvaise réponse. La bonne réponse était : ${currentQuestion.reponse_correcte}`}
          <button onClick={handleNext}>
            {currentIndex + 1 >= questions.length
              ? "Voir les résultats"
              : "Question suivante"}
          </button>
        </div>
      )}

      {onClose && (
        <button className="quiz-close" onClick={onClose}>
          Fermer
        </button>
      )}
    </div>
  );
};

export default Quiz;
