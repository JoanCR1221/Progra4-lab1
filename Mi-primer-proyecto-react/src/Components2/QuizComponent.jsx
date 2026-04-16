// import "./QuizComponent.css";
// import { useEffect, useState } from "react";
// import Confetti from "react-confetti";


// export default function QuizComponent(){

// const [preguntas, setPreguntas] = useState([]);
// const [showConfetti, setShowConfetti] = useState(false);
// const handleAnswerClick = (index) =>{
//     if (preguntas[0]?.correctAnswer === index){
//         setShowConfetti(true);

//         setTimeout(() => {
//             setShowConfetti(false);
//         }, 3000);
//     }
// }

// useEffect(() => {
// const fetchQuiz = async () => {
// const headers = new Headers();
// headers.append("X-Master-Key", "$2a$10$oNI2V67yduBBrw3zZ3s8P.VNAOOQ7aKbxmrrOkXFxtgkZKqJ05yTS");
// try {
// const response = await fetch("https://api.jsonbin.io/v3/b/69ddb9e936566621a8aeae11", { headers });
// const data = await response.json();
// setPreguntas(data.record);
// } catch (error) {
// console.error("Error fetching quiz data:", error);
// }
// }

// fetchQuiz();
// },[]);

//     return (
//         <>
//         {showConfetti && <Confetti/>}
//     <div>
//         <h2>
//             Quiz Component
//         </h2>
//         <p>{preguntas[0]?.question}</p>
//         <div>
//             {preguntas[0]?.answers.map((option, index) => (
//                 <button key={index} onClick={() => handleAnswerClick(index)}> {option} </button>
//             ))}
//         </div>
//     </div>
//     </>
//     )
// }

import "./QuizComponent.css";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function Quiz() {
  const [preguntas, setPreguntas] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      const headers = new Headers();
      headers.append("X-Master-Key", "$2a$10$oNI2V67yduBBrw3zZ3s8P.VNAOOQ7aKbxmrrOkXFxtgkZKqJ05yTS");

      try {
        const response = await fetch(
          "https://api.jsonbin.io/v3/b/69ddb9e936566621a8aeae11",
          { headers }
        );

        const data = await response.json();
        setPreguntas(data.record);
      } catch (err) {
        setError("No se pudieron cargar las preguntas.");
        console.error("Error fetching quiz data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  const preguntaActual = preguntas[currentQuestionIndex];

  const handleAnswerClick = (index) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);

    const correct = preguntaActual.correctAnswer === index;
    setIsCorrect(correct);

    if (correct) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const getButtonClass = (index) => {
    if (selectedAnswer === null) return "quiz-button default";

    if (index === preguntaActual.correctAnswer) {
      return "quiz-button correct";
    }

    if (index === selectedAnswer && index !== preguntaActual.correctAnswer) {
      return "quiz-button incorrect";
    }

    return "quiz-button default";
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < preguntas.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  if (loading) return <p className="quiz-loading">Cargando preguntas...</p>;
  if (error) return <p className="quiz-error">{error}</p>;
  if (!preguntaActual) return <p className="quiz-loading">No hay preguntas disponibles.</p>;

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="quiz-container">
        <h2 className="quiz-title">PokéQuiz</h2>
        <p className="quiz-question">{preguntaActual.question}</p>

        <div className="quiz-options">
          {preguntaActual.answers.map((option, index) => (
            <button
              key={index}
              className={getButtonClass(index)}
              onClick={() => handleAnswerClick(index)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <p
            className={`quiz-feedback ${
              isCorrect ? "feedback-correct" : "feedback-incorrect"
            }`}
          >
            {isCorrect ? "¡Respuesta correcta!" : "Respuesta incorrecta"}
          </p>
        )}

        {selectedAnswer !== null && currentQuestionIndex < preguntas.length - 1 && (
          <button className="quiz-next-btn" onClick={nextQuestion}>
            Siguiente pregunta
          </button>
        )}
      </div>
    </>
  );
}