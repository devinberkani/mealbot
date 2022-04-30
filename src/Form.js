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
    if (numOfMeals > 7 || numOfMeals < 1) {
      setMealAlert(
        'Number of meals must be a positive number no greater than 7'
      );
    } else if (isNaN(numOfMeals)) {
      setMealAlert(
        'Number of meals cannot contain letters or special characters'
      );
    } else {
      setMealAlert('');
    }
  }, [numOfMeals]);

  useEffect(() => {
    // numOfVeg alert logic
    if (numOfVeg > 7) {
      setVegAlert(
        'Number of vegetarian meals must be a positive number no greater than 7'
      );
    } else if (isNaN(numOfVeg)) {
      setVegAlert(
        'Number of meals cannot contain letters or special characters'
      );
    } else {
      setVegAlert('');
    }
  }, [numOfVeg]);

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
            required
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
