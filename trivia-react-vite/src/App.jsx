import './App.css'
import Quiz from "./components/Quiz";
import BuscandoPokemon from './components/BuscandoPokemon';
import SaludoPablo from "./components/SaludoPablo";

function App() {
  return (
   <>
   <section id="center">
    <Quiz/>
     <SaludoPablo />
     <BuscandoPokemon />
      
   </section>
   </>
  );
}

export default App;