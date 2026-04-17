import{
    createRootRoute,
    createRoute,
    createRouter,
    Link,
    Outlet,
} from '@tanstack/react-router'

import Quiz from './components/Quiz'

import SaludoPablo from './components/SaludoPablo'

import BuscandoPokemon from './components/BuscandoPokemon'

import './App.css'

const rootRoute = createRootRoute({
    component: function RootLayout(){

        return (
            <>
            <nav style ={{display:'flex', gap:'1rem',padding:'1rem'}}>
                <Link to= "/" activeProps={{style:{fontWeight:'bold'}}}>
                Inicio
                </Link>

                <Link to= "/quiz" activeProps={{style:{fontWeight:'bold'}}}>
                Quiz
                </Link>
               

                <Link to= "/Pokemon" activeProps={{style:{fontWeight:'bold'}}}>
                Pokemon
                </Link>
               

                </nav>

                <section id="center">
                    <Outlet/>
                </section>
            </>
        )
    }
})


const indexRoute = createRoute({

    getParentRoute: () => rootRoute,
    path:'/',
    component:SaludoPablo,
})


const quizRoute = createRoute({

    getParentRoute: () => rootRoute,
    path:'/quiz',
    component:Quiz,
})

const PokemonRoute = createRoute({

    getParentRoute: () => rootRoute,
    path:'/pokemon',
    component:BuscandoPokemon,
})

const routeTree = rootRoute.addChildren([indexRoute, quizRoute, PokemonRoute])
export const router = createRouter ({routeTree})