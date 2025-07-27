import MealItem from "./MealItem.jsx";
import Error from "./Error.jsx";
import useHttp from "../hooks/useHttp.jsx";

const requestConfig = { method: 'GET' };
export default function Meals() {
    const {
                data: loadedMeals,
                isLoading,
                error
    } = useHttp('http://localhost:3000/meals', requestConfig,[]);

    if (isLoading) {
        return <p className='center'> Fetching meal options...</p>
    }

    if (error) {
        return <Error title={'Failed to fetch message'} message = { error } />;
    }
    return <ul id="meals">{loadedMeals.map((meal) => <MealItem key={meal.id} meal={meal} /> )}
    </ul>
}