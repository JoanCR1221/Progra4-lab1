import{
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet,
} from '@tanstack/react-router'

import SaludosJoan from './Components/SaludosJoan'
import QuizComponents from './Components/QuizComponents'
import BuscandoPokemon from './Components/BuscandoPokemon'
import './App.css'

const rootRoute = createRootRoute({
    component: function RootLayout() {
        return (
            <>//paginas o componentes
                <nav style={{ display: 'flex', gap: '1rem' }}>
                    <Link to="/" activeProps={{ style: { fontWeight: 'bold' } }}>
                        Inicio
                    </Link>
                    <Link to="/quiz" activeProps={{ style: { fontWeight: 'bold' } }}> 
                        Quiz
                    </Link>
                    <Link to="/pokemon" activeProps={{ style: { fontWeight: 'bold' } }}>
                        Pokemon
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
    component: SaludosJoan,
})

const quizRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/quiz',
    component: QuizComponents,
})

const pokemonRoute = createRoute({
    getParentRoute: () => rootRoute,    
    path: '/pokemon',
    component: BuscandoPokemon,
})


const routeTree = rootRoute.addChildren([indexRoute, quizRoute, pokemonRoute])

export const router = createRouter({ routeTree })