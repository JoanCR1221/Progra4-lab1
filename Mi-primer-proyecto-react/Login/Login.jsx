import { useState } from "react"
import './Login.css'

export default function Login(){
    const [name, setName]=useState('Pablo')

    return (
        <section className="Helloo">
            <h2 className="Helloo__title"> Hello,{name}!</h2>
            <p className ="Helloo__extra">
                Bienvenido
            </p>
        </section>
    )
}