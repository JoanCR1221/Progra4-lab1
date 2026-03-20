import { useState } from "react"
import './Login.css'

export default function Login(){
    const [name, setName]=useState('Pablo')

    return (
        <section className="Hello">
            <h2 className="Hello__title"> Hello,{name}!</h2>
            <p className ="Hello__extra">
                Bienvenido
            </p>
        </section>
    )
}