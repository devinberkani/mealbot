import React, { useEffect, useState } from 'react';
import data from './data';

const Recipe = ({
  id,
  showAllRecipes,
  hideAllRecipes,
  setShowAllRecipes,
  setHideAllRecipes,
}) => {
  const [showRecipe, setShowRecipe] = useState(false);
  const [specificRecipe, setSpecificRecipe] = useState('');

  //show all recipes logic
  useEffect(() => {
    if (showAllRecipes && !hideAllRecipes) {
      data.map((item) => {
        if (item.id === id) {
          return setSpecificRecipe(item.recipe);
        }
      });
      setShowRecipe(true);
    }
  }, [showAllRecipes]);

  //hide all recipes logic
  useEffect(() => {
    if (hideAllRecipes && !showAllRecipes) {
      data.map((item) => {
        if (item.id === id) {
          return setSpecificRecipe(item.recipe);
        }
      });
      setShowRecipe(false);
    }
  }, [hideAllRecipes]);

  //show individual recipe logic
  const getRecipe = (specificId) => {
    data.map((item) => {
      if (item.id === specificId) {
        return setSpecificRecipe(item.recipe);
      }
    });
    setShowRecipe(true);
    setHideAllRecipes(false);
  };

  const hideRecipe = () => {
    setShowRecipe(false);
    setShowAllRecipes(false);
  };

  return (
    <span>
      <span className='show-hide-toggle'>
        {showRecipe ? (
          <a href='#' onClick={() => hideRecipe()}>
            Hide Recipe
          </a>
        ) : (
          <a href='#' onClick={() => getRecipe(id)}>
            Show Recipe
          </a>
        )}
      </span>
      {showRecipe && <span className='specific-recipe'>{specificRecipe}</span>}
    </span>
  );
};

export default Recipe;
