import React, { useEffect, useState } from 'react';
import Submit from './Submit';

const Form = () => {
  const [numOfMeals, setNumOfMeals] = useState(7);
  const [numOfVeg, setNumOfVeg] = useState(3);
  const [mealAlert, setMealAlert] = useState('');
  const [vegAlert, setVegAlert] = useState('');

  // form submission prevent page reload
  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // numOfMeals alert logic
    if (numOfMeals < 1) {
      setMealAlert('ALERT: Number of meals must be greater than 0');
    } else if (numOfMeals > 7) {
      setMealAlert('ALERT: Number of meals cannot be greater than 7');
    } else if (isNaN(numOfMeals)) {
      setMealAlert(
        'ALERT: Number of meals cannot contain letters or special characters'
      );
    } else {
      setMealAlert('');
    }
  }, [numOfMeals]);

  useEffect(() => {
    // numOfVeg alert logic
    if (numOfVeg > 7) {
      setVegAlert('ALERT: Number of vegetarian meals cannot be greater than 7');
    } else if (numOfVeg < 0) {
      setVegAlert(
        'ALERT: Number of vegetarian meals cannot be a negative number'
      );
    } else if (isNaN(numOfVeg)) {
      setVegAlert(
        'ALERT: Number of vegetarian meals cannot contain letters or special characters'
      );
    } else if (numOfVeg > numOfMeals) {
      setVegAlert(
        'ALERT: Number of vegetarian meals cannot be greater than the number of total meals'
      );
    } else {
      setVegAlert('');
    }
  }, [numOfVeg, numOfMeals]);

  return (
    <div>
      {mealAlert ? <p className='alert alert-danger'>{mealAlert}</p> : ' '}
      {vegAlert ? <p className='alert alert-danger'>{vegAlert}</p> : ' '}
      <form onSubmit={submitHandler} className='meal-form'>
        <div>
          <label htmlFor='numOfMeals'>number of meals</label>
          <input
            id='numOfMeals'
            type='text'
            onChange={(e) => setNumOfMeals(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='numOfVeg'>number of vegetarian meals</label>
          <input
            id='numOfVeg'
            type='text'
            onChange={(e) => setNumOfVeg(e.target.value)}
          />
        </div>
        <Submit
          numOfMeals={numOfMeals}
          numOfVeg={numOfVeg}
          mealAlert={mealAlert}
          vegAlert={vegAlert}
        />
      </form>
    </div>
  );
};

export default Form;
