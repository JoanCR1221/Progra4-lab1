import {
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet,
} from '@tanstack/react-router'

import SaludoEmmanuel from './Components2/SaludoEmmanuel'
import BuscarPokemon from './Components2/BuscarPokemon'
import QuizPokemon from './Components2/QuizComponent'
import './App.css'


const rootRoute = createRootRoute({ // esto devuelve un componente y este componente es el primero en renderisarse
    component: function RootLayout(){
        return(
        <>
        <nav style={{display: 'flex', gap: '1rem', padding: '1rem'}}>
            <Link to="/" activeProps={{ style: {fontWeight: 'bold'}}}>
            Inicio
            </Link>
            <Link to="/pokemon" activeProps={{ style: {fontWeight: 'bold'}}}>
            Pokemon
            </Link>
            <Link to="/quiz" activeProps={{ style: {fontWeight: 'bold'}}}>
            PokeQuiz
            </Link>
        </nav>

        <section id="center">
            <Outlet />
        </section>
        </>
        )
    },
})

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: SaludoEmmanuel,
})

const pokemonRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/pokemon',
    component: BuscarPokemon,
})

const quizRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/quiz',
    component: QuizPokemon,
})


const routeTree = rootRoute.addChildren([indexRoute,pokemonRoute,quizRoute])

export const router = createRouter({ routeTree })