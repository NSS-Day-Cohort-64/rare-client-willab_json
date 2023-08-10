import "./Tags.css"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { listTags } from "../../managers/TagManager";


export const Tags = () => {
    const [tags, setTags] = useState([])
    const [error, setError] = useState(null)
    const [label, setLabel] = useState('');
    const [count, setcount] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        listTags() // Assuming this function returns a promise
            .then(data => {
                setTags(data);
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
        const tagToBeSentToServer = {
            label: label
        }

        fetch(`http://localhost:8088/tags`, {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(tagToBeSentToServer)
        })
            .then(response => response.json())
            .then(() => {
                listTags() // Assuming this function returns a promise
                    .then(data => {
                        setTags(data);
                    })
                    .catch(err => {
                        setError(err.message);
                    });
            })

        console.log('Submitted label:', label)
        setLabel('')
        setcount(count + 1)
    };

    return (<div className="form">
        <div className="tags-container">
            <h1 className="title">All Tags</h1>

            {error && <p className="error-message">{error}</p>}

            <ul className="tags-list">
                {tags.map(tag => (
                    <li key={tag.id}>
                        <button>Edit</button>
                        <button>Delete</button>
                        <h2>{tag.label}</h2>

                    </li>
                ))}
            </ul>
        </div>

        <div classname="create-tags-container">
            <h2 className="title">Create a new tag</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="labelInput">Enter Tag Name:</label>
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
    </div>
    );
};
