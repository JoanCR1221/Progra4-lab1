import { useState } from "react";   
import "./SaludoJoan.css";

export default function SaludoJoan() {
    const [name, setNombre] = useState("Joan");

    return (
        <section className="saludo-joan">
            <h2 className="saludos_title">¡Hola, {name}!</h2>
            <p className="saludos_extra">¡Bienvenido a mi primer proyecto en React!</p>

        </section>
    )

}