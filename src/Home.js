import Form from './Form';

function Home() {
  return (
    <div className='main-container'>
      <div className='main-container-center'>
        <div className='title-container'>
          <h2>welcome to MealBot</h2>
          <h4>weekly meal planner</h4>
        </div>
        <Form />
      </div>
    </div>
  );
}

export default Home;
