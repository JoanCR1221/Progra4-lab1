import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import flag from "../assets/flag.png";



export default function Quiz(){

  const [preguntas, setQuestions]= useState([]);
const [showConfetti, setShowConfetti] = useState(false);
  const handleAnswerClick = (index) => {
    if(preguntas[0]?.correctAnswer === index){
      setShowConfetti(true);

      setTimeout(() =>{
        setShowConfetti(false);
      }, 6000); // 6segundos
    }
  }

  useEffect(() => {
    const fetchQuiz = async () =>{
      const headers = new Headers();
      headers.append("X-Master-Key", "$2a$10$bV/B77bKOlWA1kZA/b8bCeOspMhDKR6kfq2FEkGdufOqLlip6gsWS");

      try{
const response = await fetch("https://api.jsonbin.io/v3/b/69d6c1e3856a68218911cab4" , {headers});
const data = await response.json();
setQuestions(data.record);
      }catch (error){
        console.error("Error fetching quiz data:", error);
      }
    }  

    fetchQuiz();
  },[]);

  return (
    <>
    {showConfetti && <Confetti/>}
    <div>
     <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
  <img 
    src={flag} 
    alt="Costa Rica" 
    width="50" 
    style={{ marginRight: "10px" }} 
  />
  Quiz Component
</h1>
      <p>{preguntas[0]?.question}</p>

      <div>
        {preguntas[0]?.answers.map((option, index) =>(
<button key ={index} onClick={() => handleAnswerClick(index)} >{option}</button>
        ))}
      </div>
    </div>
    </>
  )
}
