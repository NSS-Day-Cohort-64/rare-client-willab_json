import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { listCategory } from "../managers/Categories";

export const Categories = () => {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null)   

    useEffect(() => {
        listCategory() // Assuming this function returns a promise
            .then(data => {
                setCategories(data);
            })
            .catch(err => {
                setError(err.message);
            });
    },
        [])



    return (
        <div className="categories-container">
            <h1 className="title">Categories</h1>

        {error && <p className="error-message">{error}</p>}

            <ul className="categories-list">
                {categories.map(category => (
                    <li key={category.id}>
                        <h2>{category.label}</h2>
                        <button>edit</button> <button>delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}; // Empty dependency array means this effect will run once, similar to componentDidMount.



