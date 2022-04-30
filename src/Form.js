import React, { useEffect, useState } from 'react';
import Submit from './Submit';

const Form = () => {
  const [numOfMeals, setNumOfMeals] = useState(0);
  const [numOfVeg, setNumOfVeg] = useState(0);
  const [mealAlert, setMealAlert] = useState('');
  const [vegAlert, setVegAlert] = useState('');

  // form submission
  const submitHandler = (e) => {
    e.preventDefault();
    // numOfMeals alert logic
    if (numOfMeals > 7 || numOfMeals < 1) {
      setMealAlert('ALERT: Number of meals must be a number between 1 and 7');
    } else if (isNaN(numOfMeals)) {
      setMealAlert('ALERT: Number of meals cannot contain letters');
    } else {
      setMealAlert('');
    }
    // numOfVeg alert logic
    if (numOfVeg > 7) {
      setVegAlert(
        'ALERT: Number of vegetarian meals must be a number between 0 and 7'
      );
    } else if (isNaN(numOfVeg)) {
      setVegAlert('ALERT: Number of meals cannot contain letters');
    } else {
      setVegAlert('');
    }
  };

  return (
    <div>
      {mealAlert && <p class='alert alert-danger'>{mealAlert}</p>}
      {vegAlert && <p class='alert alert-danger'>{vegAlert}</p>}
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='numOfMeals'>
            how many meals would you like to plan?
          </label>
          <input
            id='numOfMeals'
            type='text'
            onChange={(e) => setNumOfMeals(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='numOfVeg'>
            how many meals would you like to be vegetarian?
          </label>
          <input
            id='numOfVeg'
            type='text'
            onChange={(e) => setNumOfVeg(e.target.value)}
            required
          />
        </div>
        <Submit numOfMeals={numOfMeals} numOfVeg={numOfVeg} />
      </form>
    </div>
  );
};

export default Form;
