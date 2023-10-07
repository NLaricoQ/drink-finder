import axios from "axios";
import { useState, useEffect, createContext } from "react";
const DrinksContext = createContext();

const DrinksProvider = ({ children }) => {
  const [drinks, setDrinks] = useState([]);
  const [modal, setModal] = useState(false);
  const [drinkId, setDrinkId] = useState(null);
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getRecipe = async () => {
      if (!drinkId) return;
      try {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
        const data = await axios(url);
        setRecipe(data.data.drinks[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getRecipe();
  }, [drinkId]);
  const getDrink = async (datos) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.name}&c=${datos.category}`;
      const { data } = await axios(url);
      setDrinks(data.drinks);
    } catch (error) {
      console.log(error);
    }
  };
  const handleModalClick = () => {
    setModal(!modal);
  };
  const handleDrinkId = (id) => {
    setDrinkId(id);
  };
  return (
    <DrinksContext.Provider
      value={{
        getDrink,
        drinks,
        handleModalClick,
        modal,
        handleDrinkId,
        recipe,
        loading,
      }}
    >
      {children}
    </DrinksContext.Provider>
  );
};

export { DrinksProvider };

export default DrinksContext;
