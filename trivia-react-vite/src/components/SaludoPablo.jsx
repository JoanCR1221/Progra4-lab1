import { useState } from "react";   
import "./SaludoPablo.css";

export default function SaludoPablo() {
    const [name, setNombre] = useState("Hola");

    return (
        <section className="saludo-pablo">
            <h2 className="saludos_title">¡Hola {name}!</h2>
            <p className="saludos_extra">¡Bienvenido a mi primer proyecto en React!</p>

        </section>
    )

}