import { listCategory } from "../managers/Categories";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export const Categories = () => {
    const [newCategories, setNewCategories] = useState([])
    const [label, setLabel] = useState('')
    const [count, setCount] = useState([0])
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
    
        useEffect(() => {
        console.log('rerendering')
    }, [count])

    const handleSubmit = (event) => {
        event.preventDefault()
        // Process the label (e.g., send it to an API, update state, etc.)
        const categoryToBeSentToServer = {
            label: label
        }
        listCategory() // Assuming this function returns a promise
            .then(data => {
                setCategories(data);
            })
            .catch(err => {
                setError(err.message);
            })

        fetch(`http://localhost:8088/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(categoryToBeSentToServer)
            })
            .then(response => response.json())
            .then(() => {
                listCategory() // Assuming this function returns a promise
                    .then(data => {
                        setCategories(data);
                    })
                    .catch(err => {
                        setError(err.message);
                    });
            })
        console.log('Submitted label:', label)
        setLabel('')
        setCount(count + 1)
    };

    return ( <>
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

        <div className="new-categories container">
            <h1 className="title">Create a Category</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="labelInput">Enter Category Name:</label>
                    <input
                        type="text"
                        id="labelInput"
                        value={label}
                        onChange={(e) => {
                            setLabel(e.target.value)
                            console.log(label)
                        }}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>









        </div>
    </>
    )
                }