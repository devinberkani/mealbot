import React, { useState } from 'react';
import { useGlobalContext } from './context';
import data from './data';
import Recipe from './Recipe';

const Submit = ({}) => {
  // ===============
  // import context
  // ===============
  const {
    meals,
    setMeals,
    showAllRecipes,
    setShowAllRecipes,
    hideAllRecipes,
    setHideAllRecipes,
    numOfMeals,
    numOfVeg,
    mealAlert,
    vegAlert,
  } = useGlobalContext();

  const calculateMeals = (numOfMeals, numOfVeg) => {
    //initialize the master meal array to push all final meals to
    let masterMealArray = [];
    // intialize empty array to push meal items to
    let newMealArr = [];
    //initialize new veg array to push vegetarian meals to
    let vegArray = [];

    // while the length of the new array is less than numOfVeg...
    while (newMealArr.length < numOfVeg) {
      // get a new random number
      let randomNumber = Math.floor(Math.random() * (data.length - 1)) + 1;
      // map through entire data list and destructure
      data.map((item) => {
        const { id, meal, vegOrNonVeg, recipe } = item;
        // if the random number matches the id of the meal...
        if (randomNumber === id && vegOrNonVeg === 'vegetarian') {
          // push that id into the new array...
          newMealArr.push(id);
          // remove duplicates from array
          newMealArr = [...new Set(newMealArr)];
        }
        if (newMealArr.length !== vegArray.length) {
          // loop through newMealArr
          newMealArr.map((vegId) => {
            if (vegId === id) {
              //push that info into veg array
              vegArray.push({ id, meal, vegOrNonVeg, recipe });
              masterMealArray.push({ id, meal, vegOrNonVeg, recipe });
            }
            return masterMealArray;
          });
        }
        return masterMealArray;
      });
    }
    // console.log(vegArray);
    // make newMealArr empty again
    newMealArr = [];
    //initialize new nonVeg array to push nonvegetarian meals to
    let nonVegArray = [];
    // while i is less than numOfMeals minus numOfVeg...
    while (newMealArr.length < numOfMeals - numOfVeg) {
      // get a new random number
      let randomNumber = Math.floor(Math.random() * (data.length - 1)) + 1;
      // map through entire data list and destructure
      data.map((item) => {
        const { id, meal, vegOrNonVeg, recipe } = item;
        // if the random number matches the id of the meal...
        if (randomNumber === id && vegOrNonVeg === 'nonVegetarian') {
          // push that id into the new array...
          newMealArr.push(id);
          // remove duplicates from array
          newMealArr = [...new Set(newMealArr)];
        }
        if (newMealArr.length !== nonVegArray.length) {
          // loop through newMealArr
          newMealArr.map((nonVegId) => {
            if (nonVegId === id) {
              //push that info into nonVeg array
              nonVegArray.push({ id, meal, vegOrNonVeg, recipe });
              masterMealArray.push({ id, meal, vegOrNonVeg, recipe });
            }
            return masterMealArray;
          });
        }
        return masterMealArray;
      });
    }
    //and now that both veg and non veg have been handled, return master array
    // console.log(nonVegArray);
    // console.log(masterMealArray);
    setMeals(masterMealArray);
    return meals;
  };

  //ensures that bot only works as long as alerts don't return truthy values
  const handleSubmit = () => {
    if (mealAlert || vegAlert) {
      setShowAllRecipes(false);
      setHideAllRecipes(true);
      setMeals([]);
      return meals;
    } else {
      setShowAllRecipes(false);
      setHideAllRecipes(true);
      return calculateMeals(numOfMeals, numOfVeg);
    }
  };

  //show all recipes
  const showAllRecipesHandler = () => {
    setShowAllRecipes(true);
    setHideAllRecipes(false);
  };

  //hide all recipes
  const hideAllRecipesHandler = () => {
    setHideAllRecipes(true);
    setShowAllRecipes(false);
  };

  const copyToClipBoard = () => {};

  return (
    <div>
      <div className='meal-results'>
        {!meals.length > 0 && (
          <button className='btn submit' onClick={() => handleSubmit()}>
            submit »
          </button>
        )}
        {meals.length > 0 && (
          <div>
            <div className='meal-results-title'>
              <h3>
                <span className='object'>↓</span> {meals.length} meals planned{' '}
                <span className='object'>↓</span>
              </h3>
            </div>
            {/* show all/hide all recipe buttons */}
            <div className='show-hide-buttons'>
              <button
                onClick={() => showAllRecipesHandler()}
                className='btn btn-show'
              >
                show all recipes
              </button>
              <button
                onClick={() => hideAllRecipesHandler()}
                className='btn btn-hide'
              >
                hide all recipes
              </button>
            </div>
          </div>
        )}
        {meals.length > 0 ? (
          meals.map((item, index) => {
            const { id, meal, vegOrNonVeg, recipe } = item;
            return (
              <div key={id}>
                <p>
                  {`${index + 1}. `}
                  <span>
                    {vegOrNonVeg === 'vegetarian' ? (
                      <span className='veg'>vegetarian</span>
                    ) : (
                      <span className='non-veg'>non-vegetarian</span>
                    )}
                  </span>
                  <span className='meal'> {meal}</span>
                  <span className='recipe'>
                    <Recipe id={id} meal={meal} />
                  </span>
                </p>
              </div>
            );
          })
        ) : (
          <div className='meal-results-title'>
            <h5>
              <span className='object'>↓</span> your meals will appear below{' '}
              <span className='object'>↓</span>
            </h5>
          </div>
          // <h5 className='result-directions'>*your results will appear below</h5>
        )}
      </div>
      {meals.length > 0 && (
        <div className='submit-btn-bottom-wrapper'>
          <button className='btn submit' onClick={() => handleSubmit()}>
            generate new meals »
          </button>
        </div>
      )}
    </div>
  );
};

export default Submit;
