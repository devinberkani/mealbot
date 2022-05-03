import React, { useEffect, useRef, useState } from 'react';
import Submit from './Submit';
import image from './mealbot-logo.png';
import { useGlobalContext } from './context';

const Form = () => {
  // ===============
  // import context
  // ===============
  const {
    numOfMeals,
    setNumOfMeals,
    numOfVeg,
    setNumOfVeg,
    mealAlert,
    setMealAlert,
    vegAlert,
    setVegAlert,
  } = useGlobalContext();

  // useRef to be able to get the length of the numOfMeals input
  const numOfMealsInput = useRef('one');

  // form submit handler
  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    // numOfMeals alert logic  //if numOfVeg is larger than the numOfMeals input
    if (numOfMeals < 1 || numOfVeg > numOfMealsInput.current.value) {
      setMealAlert('ALERT: Number of meals must be greater than 0');
    } else if (numOfMeals > 7) {
      setMealAlert('ALERT: Number of meals cannot be greater than 7');
    } else if (isNaN(numOfMeals) || numOfMeals.toString().includes('.')) {
      setMealAlert(
        'ALERT: Number of meals cannot contain letters or special characters'
      );
    } else {
      setMealAlert('');
    }
  }, [numOfMeals, numOfVeg, numOfMealsInput]);

  useEffect(() => {
    // numOfVeg alert logic
    if (numOfVeg > 7) {
      setVegAlert('ALERT: Number of vegetarian meals cannot be greater than 7');
    } else if (numOfVeg < 0) {
      setVegAlert(
        'ALERT: Number of vegetarian meals cannot be a negative number'
      );
    } else if (isNaN(numOfVeg) || numOfVeg.toString().includes('.')) {
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
      <div className='title-container'>
        <img className='logo' src={image} alt='' />
        <h2>welcome to MealBot</h2>
        <h4>weekly meal idea generator</h4>
      </div>
      {mealAlert ? <p className='alert alert-danger'>{mealAlert}</p> : ' '}
      {vegAlert ? <p className='alert alert-danger'>{vegAlert}</p> : ' '}
      <form onSubmit={submitHandler} className='meal-form'>
        <div className='form-padding-container'>
          <div>
            <label htmlFor='numOfMeals'>number of meals</label>
            <input
              ref={numOfMealsInput}
              autoComplete='off'
              id='numOfMeals'
              type='text'
              onChange={(e) => setNumOfMeals(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor='numOfVeg'>number of vegetarian meals</label>
            <input
              autoComplete='off'
              id='numOfVeg'
              type='text'
              onChange={(e) => setNumOfVeg(e.target.value)}
            />
          </div>
        </div>
        <Submit />
      </form>
    </div>
  );
};

export default Form;
