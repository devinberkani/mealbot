import React, { useContext, useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // ===============
  // useStateValues
  // ===============

  //number of meals input
  const [numOfMeals, setNumOfMeals] = useState(1);
  //number of vegetarian meals input
  const [numOfVeg, setNumOfVeg] = useState(0);
  //alert for number of meals input
  const [mealAlert, setMealAlert] = useState('');
  //alert for number of vegetarian meals input
  const [vegAlert, setVegAlert] = useState('');
  // sets unique meals object for iterating through and displaying to user
  const [meals, setMeals] = useState([]);
  //sets whether show all is true for all recipes
  const [showAllRecipes, setShowAllRecipes] = useState(false);
  //sets whether hide all is true for all recipes
  const [hideAllRecipes, setHideAllRecipes] = useState(true);

  return (
    <AppContext.Provider
      value={{
        //needed for Form.js
        numOfMeals,
        setNumOfMeals,
        numOfVeg,
        setNumOfVeg,
        mealAlert,
        setMealAlert,
        vegAlert,
        setVegAlert,
        //needed for Submit.js
        meals,
        setMeals,
        showAllRecipes,
        setShowAllRecipes,
        hideAllRecipes,
        setHideAllRecipes,
        //Recipe.js cannot be included
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//custom hook -- ********IMPORTANT********** -- MUST START WITH 'use'

//must be invoked, you don't need to import useContext when doing it this way

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
