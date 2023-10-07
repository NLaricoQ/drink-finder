import { Container } from "react-bootstrap";
import Formulario from "./components/Formulario";
import { CategoriesProvider } from "./context/CategoriesProvider";
import { DrinksProvider } from "./context/DrinksProvider";
import DrinksList from "./components/DrinksList";
import DrinkModal from "./components/DrinkModal";

function App() {
  return (
    <CategoriesProvider>
      <DrinksProvider>
        <header className="py-5">
          <h1>Drink Finder</h1>
        </header>
        <Container className="mt-5">
          <Formulario />
          <DrinksList />
          <DrinkModal />
        </Container>
      </DrinksProvider>
    </CategoriesProvider>
  );
}

export default App;
