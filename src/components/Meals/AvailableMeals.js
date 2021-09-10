import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  
  useEffect(()=> { // cannot be useEffect(async()=>{},[])
    // this is workaround for the limitation
    const fetchMeals = async () => {
      const response = await fetch('https://asparagus-order-default-rtdb.firebaseio.com/meals.json');
      
      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(error=>{
      setIsLoading(false);
      setHttpError(error.message);  
    });
    
  }, []);
  
  if (isLoading) {
    return <section className={classes.MealsLoading}><p>Loading...</p></section>
  }

  if (httpError) {
    return <section className={classes.MealsError}>{httpError}</section>
  }
  const mealList = meals.map(m => (
    <MealItem 
      id={m.id} 
      key={m.id} 
      name={m.name} 
      description={m.description} 
      price={m.price}/>
    ));

    return (
      <section className={classes.meals}>
          <Card>
            <ul>
              {mealList}
            </ul>
          </Card>
      </section>
    )
};

export default AvailableMeals;