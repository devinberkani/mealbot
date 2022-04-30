import React, { useEffect, useState } from 'react';
import Submit from './Submit';

const Form = () => {
  const [numOfMeals, setNumOfMeals] = useState(0);
  const [numOfVeg, setNumOfVeg] = useState(0);
  const [mealAlert, setMealAlert] = useState('');
  const [vegAlert, setVegAlert] = useState('');

  // form submission prevent page reload
  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // numOfMeals alert logic
    if (numOfMeals > 7 || numOfMeals < 0) {
      setMealAlert(
        'ALERT: Number of meals must be a positive number no greater than 7'
      );
    } else if (isNaN(numOfMeals)) {
      setMealAlert('ALERT: Number of meals cannot contain letters');
    } else {
      setMealAlert('');
    }
  }, [numOfMeals]);

  useEffect(() => {
    // numOfVeg alert logic
    if (numOfVeg > 7) {
      setVegAlert(
        'ALERT: Number of vegetarian meals must be a positive number no greater than 7'
      );
    } else if (isNaN(numOfVeg)) {
      setVegAlert('ALERT: Number of meals cannot contain letters');
    } else {
      setVegAlert('');
    }
  }, [numOfVeg]);

  useEffect(() => {}, []);

  return (
    <div>
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
          {mealAlert ? <p className='alert alert-danger'>{mealAlert}</p> : ' '}
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
          {vegAlert ? <p className='alert alert-danger'>{vegAlert}</p> : ' '}
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
