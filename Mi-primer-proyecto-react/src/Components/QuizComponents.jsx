import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function QuizComponents() {
  const [preguntas, setPreguntas] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      const config = {
        headers: {
          "X-Master-Key": "$2a$10$BFH5/CRqs4mdYHXc86S1vujcG9rttHUTSwC8Y3pNYLrWSRpU6FBbq"
        }
      };

      try {
        const response = await fetch("https://api.jsonbin.io/v3/b/69d40d71aaba882197ce50fb", config);
        const data = await response.json();
        
        const listaFinal = data.record?.record || data.record || [];
        
        setPreguntas(listaFinal);
        setCargando(false);
      } catch (error) {
        console.error("Error al cargar el quiz:", error);
        setCargando(false);
      }
    };
    fetchQuiz();
  }, []);

  const handleAnswerClick = (opcion) => {
    if (preguntas[indiceActual]?.answer === opcion) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        if (indiceActual + 1 < preguntas.length) {
          setIndiceActual(indiceActual + 1);
        } else {
          alert("¡Felicidades Ninja! Has completado el Quiz.");
        }
      }, 4000);
    } else {
      alert("Respuesta incorrecta. ¡Sigue entrenando!");
    }
  };

  // 1. Pantalla de carga
  if (cargando) return <h1>Cargando preguntas de Naruto...</h1>;

  // 2. Validación si el array está vacío
  if (!preguntas || preguntas.length === 0) return <h1>No se encontraron preguntas. Revisa la consola (F12).</h1>;

  // 3. Referencia a la pregunta actual (después de las validaciones)
  const preguntaActual = preguntas[indiceActual];

  return (
    <>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3>Son {preguntas.length} preguntas</h3>
        <h2>{preguntaActual?.question}</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", margin: "20px auto" }}>
          {preguntaActual?.options?.map((opt, i) => (
            <button 
              key={i} 
              onClick={() => handleAnswerClick(opt)}
              style={{ padding: "12px", cursor: "pointer", fontSize: "1rem", borderRadius: "8px" }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}