import { useState } from "react";   
import "./SaludosJoan.css";

export default function SaludosJoan() {
    const [name, setNombre] = useState("Joan");

    return (
        <section className="saludo-joan">
            <h2 className="saludos_title">¡Hola, {name}!</h2>
            <p className="saludos_extra">¡Bienvenido a mi primer proyecto en React!</p>

        </section>
    )

}