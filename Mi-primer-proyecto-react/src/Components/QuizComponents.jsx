import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function QuizComponents() {
  const [preguntas, setPreguntas] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [seleccionada, setSeleccionada] = useState(null);

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
    if (seleccionada) return;

    setSeleccionada(opcion);

    // Verificamos la respuesta usando el índice actual de este renderizado
    const esCorrecta = preguntas[indiceActual]?.answer === opcion;

    if (esCorrecta) {
      setShowConfetti(true);
    }

    // El tiempo de espera para avanzar
    setTimeout(() => {
      avanzarPregunta();
    }, esCorrecta ? 3000 : 2000);
  };

  const avanzarPregunta = () => {
    setShowConfetti(false);
    setSeleccionada(null);
    
    // USAR ACTUALIZACIÓN FUNCIONAL AQUÍ:
    setIndiceActual((prevIndice) => {
      if (prevIndice + 1 < preguntas.length) {
        return prevIndice + 1; // Ahora el contador subirá a 1, 2, 3...
      } else {
        alert("¡Felicidades Ninja! Has completado el Quiz.");
        return 0; 
      }
    });
  };

  if (cargando) return <h1>Cargando preguntas de Naruto...</h1>;
  if (!preguntas || preguntas.length === 0) return <h1>No se encontraron preguntas.</h1>;

  const preguntaActual = preguntas[indiceActual];

  const getButtonStyle = (opt) => {
    const baseStyle = { 
      padding: "12px", 
      cursor: seleccionada ? "default" : "pointer", 
      fontSize: "1rem", 
      borderRadius: "8px",
      transition: "background-color 0.3s ease",
      border: "1px solid #ccc"
    };

    if (seleccionada === opt) {
      const esCorrecta = opt === preguntaActual.answer;
      return { 
        ...baseStyle, 
        backgroundColor: esCorrecta ? "#4CAF50" : "#f44336",
        color: "white",
        fontWeight: "bold"
      };
    }

    // Opcional: Mostrar la respuesta correcta en verde si el usuario falló
    if (seleccionada && opt === preguntaActual.answer) {
       return { ...baseStyle, backgroundColor: "#4CAF50", color: "white" };
    }

    return baseStyle;
  };

  return (
    <>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      <div style={{ textAlign: "center", padding: "20px" }}>
        {/* Este indicador ahora se actualizará correctamente */}
        <h3>Pregunta {indiceActual + 1} de {preguntas.length}</h3>
        <h2>{preguntaActual?.question}</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", margin: "20px auto" }}>
          {preguntaActual?.options?.map((opt, i) => (
            <button 
              key={`${indiceActual}-${i}`} // Usar el índice actual en la key ayuda a resetear estados visuales
              onClick={() => handleAnswerClick(opt)}
              style={getButtonStyle(opt)}
              disabled={seleccionada !== null}
            >
              {opt}
            </button>
          ))}
        </div>
        
        {seleccionada && (
          <p>{seleccionada === preguntaActual.answer ? "¡Excelente!" : "¡Incorrecto!"}</p>
        )}
      </div>
    </>
  );
}