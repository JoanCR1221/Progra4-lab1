import { useEffect, useState } from "react";   
import "./SaludoPablo.css";

export default function SaludoPablo() {
    //const [name, setNombre] = useState("Pablo");

    //1. declaramos los estados
    const [phrase , setPhrase] = useState([]);
    const [randomNumber, setRandomNumber] = useState(0);

// 2. cargamos la frase motivacionall al iniciar el componente

const motivacion = useEffect(() => {
    const fetchPhrase = async() =>{
        try{
            const response = await fetch ("https://www.positive-api.online/phrases/esp");
            const data = await response.json;

            setPhrase(data);
        } catch (error){
            console.error("Error fetching phrase:", error);
        }
        finally{
            const randomIndex = Math.floor(Math.random() * 40);
            setRandomNumber(randomIndex);
        }
    }
    fetchPhrase();
},[]);

//3. rederizamos el componente

return(
    <div>
        <h1>Holaaaaa</h1>
        <p>{phrase[randomNumber]?.text}</p>


    <button onClick={() => {
            const randomIndex = Math.floor(Math.random() * 40);
            setRandomPhrase(randomIndex);
          }}>Generar nueva frase</button>
    </div>
)
}
