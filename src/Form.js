import React, { useState } from 'react';
import Submit from './Submit';

const Form = () => {
  const [numOfMeals, setNumOfMeals] = useState(0);
  const [numOfVeg, setNumOfVeg] = useState(0);

  return (
    <div>
      <label htmlFor='numOfMeals'>how many meals would you like to plan?</label>
      <input
        id='numOfMeals'
        type='text'
        onChange={(e) => setNumOfMeals(e.target.value)}
        required
      />
      <br />
      <label htmlFor='numOfVeg'>
        how many meals would you like to be vegetarian?
      </label>
      <input
        id='numOfVeg'
        type='text'
        onChange={(e) => setNumOfVeg(e.target.value)}
        required
      />
      <Submit numOfMeals={numOfMeals} numOfVeg={numOfVeg} />
    </div>
  );
};

export default Form;
