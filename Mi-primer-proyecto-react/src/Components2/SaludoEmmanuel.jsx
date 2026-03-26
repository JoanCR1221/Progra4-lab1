import { useState } from "react";   
import "./SaludoEmmanuel.css";

export default function SaludoPablo() {
    const [name, setNombre] = useState("Emmanuel");

    return (
        <section className="saludo-emmanuel">
            <h2 className="saludos_title">¡Hola, {name}!</h2>
            <p className="saludos_extra">¡Bienvenido a mi primer proyecto en React!</p>

        </section>
    )

}