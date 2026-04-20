import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import flag from "../assets/flag.png";

export default function Quiz() {
  const [preguntas, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
  const [bloqueado, setBloqueado] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Manejo de selección de respuesta
  const handleAnswerClick = (index) => {
    if (bloqueado) return;

    setRespuestaSeleccionada(index);
    setBloqueado(true);

    const esCorrecta =
      preguntas[currentQuestionIndex]?.correctAnswer === index;

    if (esCorrecta) {
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
        setRespuestaSeleccionada(null);
        setBloqueado(false);

        if (currentQuestionIndex < preguntas.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          alert("¡Felicidades, completaste el Quiz!");
          setCurrentQuestionIndex(0);
        }
      }, 3000);
    } else {
      setTimeout(() => {
        setRespuestaSeleccionada(null);
        setBloqueado(false);
      }, 1500);
    }
  };

  // Consumo del API con secret
  useEffect(() => {
    const fetchQuiz = async () => {
      const headers = new Headers();
      const apiKey = import.meta.env.VITE_JSONBIN_MASTER_KEY;

      if (apiKey) {
        headers.append("X-Master-Key", apiKey);
      }

      try {
        const response = await fetch(
          "https://api.jsonbin.io/v3/b/69d6c1e3856a68218911cab4",
          { headers }
        );
        const data = await response.json();
        setQuestions(data.record);
      } catch (error) {
        console.error("Error al cargar la trivia:", error);
      }
    };

    fetchQuiz();
  }, []);

  if (preguntas.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Cargando trivia...
      </p>
    );
  }

  const preguntaActual = preguntas[currentQuestionIndex];

  return (
    <>
      {showConfetti && <Confetti />}

      <div
        style={{
          textAlign: "center",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <img
            src={flag}
            alt="Bandera de Costa Rica"
            style={{
              width: "50px",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          />
          Quiz de Costa Rica
        </h1>

        <h3 style={{ color: "#555" }}>
          Pregunta {currentQuestionIndex + 1} de {preguntas.length}
        </h3>

        <p style={{ fontSize: "1.3rem", fontWeight: "bold", margin: "20px 0" }}>
          {preguntaActual.question}
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            alignItems: "center",
          }}
        >
          {preguntaActual.answers.map((option, index) => {
            let colorBoton = "#f0f0f0";
            let colorTexto = "black";

            if (respuestaSeleccionada === index) {
              const esCorrecta = index === preguntaActual.correctAnswer;
              colorBoton = esCorrecta ? "#28a745" : "#dc3545";
              colorTexto = "white";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={bloqueado}
                style={{
                  backgroundColor: colorBoton,
                  color: colorTexto,
                  padding: "15px 25px",
                  width: "300px",
                  fontSize: "1rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  cursor: bloqueado ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  fontWeight:
                    respuestaSeleccionada === index ? "bold" : "normal",
                  boxShadow:
                    respuestaSeleccionada === index
                      ? "0 4px 8px rgba(0,0,0,0.2)"
                      : "none",
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}