import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom";
import { listTags } from "../../managers/TagManager";


export const Tags = () => {
    const [tags, setTags] = useState([])
    const [error, setError] = useState(null)    
    
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

        return (
            <div className="tags-container">
                <h1 className="title">All Tags</h1>
    
                {error && <p className="error-message">{error}</p>}
    
                <ul className="tags-list">
                    {tags.map(tag => (
                        <li key={tag.id}>
                            <h2>{tag.label}</h2>
                            <button>Edit</button>
                            <button>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };
