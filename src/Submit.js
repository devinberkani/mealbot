import React, { useState } from 'react';
import data from './data';

const Submit = ({ numOfMeals, numOfVeg, mealAlert, vegAlert }) => {
  const [meals, setMeals] = useState([]);

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
      let randomNumber = Math.floor(Math.random() * 19) + 1;
      // map through entire data list and destructure
      data.map((item) => {
        const { id, meal, vegOrNonVeg } = item;
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
              vegArray.push({ id, meal, vegOrNonVeg });
              masterMealArray.push({ id, meal, vegOrNonVeg });
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
      let randomNumber = Math.floor(Math.random() * 19) + 1;
      // map through entire data list and destructure
      data.map((item) => {
        const { id, meal, vegOrNonVeg } = item;
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
              nonVegArray.push({ id, meal, vegOrNonVeg });
              masterMealArray.push({ id, meal, vegOrNonVeg });
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
      setMeals([]);
      return meals;
    } else {
      return calculateMeals(numOfMeals, numOfVeg);
    }
  };

  return (
    <div>
      <button class='btn submit' onClick={() => handleSubmit()}>
        submit »
      </button>
      <div className='meal-results'>
        {meals.map((item, index) => {
          const { id, meal, vegOrNonVeg } = item;
          return (
            <p key={id}>
              {`${index + 1}. ${meal} `}
              {vegOrNonVeg === 'vegetarian'
                ? '(vegetarian)'
                : '(non-vegetarian)'}
            </p>
          );
        })}
        {/* {(mealAlert || vegAlert) && (
        <p className='alert alert-danger'>
          ERROR: Please check your entries and try again
        </p>
      )} */}
      </div>
    </div>
  );
};

export default Submit;
