import { useState } from "react";   
import "./SaludoAlex.css";

export default function SaludoAlex() {
    const [name, setNombre] = useState("Alex");

    return (
        <section className="saludo-alex">
            <h2 className="saludos_title">¡Hola, {name}!</h2>
            <p className="saludos_extra">¡Bienvenido a mi primer proyecto en React!</p>

        </section>
    )

}