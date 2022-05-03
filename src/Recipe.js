import React, { useEffect, useState } from 'react';
import { useGlobalContext } from './context';
import data from './data';

const Recipe = ({ id, meal }) => {
  // ===============
  // import context
  // ===============
  const {
    showAllRecipes,
    hideAllRecipes,
    setShowAllRecipes,
    setHideAllRecipes,
  } = useGlobalContext();

  //show/hide individual recipe
  const [showRecipe, setShowRecipe] = useState(false);
  //specific recipe state for displaying to user
  const [specificRecipe, setSpecificRecipe] = useState('');
  //if this state is true...
  const [linkCopied, setLinkCopied] = useState(false);
  //...the copied alert will display
  const [copiedAlert, setCopiedAlert] = useState('');

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

  // copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(specificRecipe);
    setCopiedAlert('recipe copied to clipboard');
    setLinkCopied(true);
    setTimeout(() => {
      setCopiedAlert('');
      setLinkCopied(false);
    }, '2000');
  };

  useEffect(() => {
    return clearTimeout();
  }, [handleCopy]);

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
      {showRecipe && (
        <span>
          <span className='specific-recipe'>
            <a
              className='btn recipe-btn'
              href={specificRecipe}
              target='_blank'
            >{`${meal} recipe`}</a>
            <button className='btn copy-btn' onClick={() => handleCopy()}>
              copy link
              <i className='fa-solid fa-copy'></i>
            </button>
          </span>
          {linkCopied && <div className='copied-alert'>{copiedAlert}</div>}
        </span>
      )}
    </span>
  );
};

export default Recipe;
