import { useEffect, useState } from "react"
import { listPost } from "../managers/Posts"
import { useNavigate } from "react-router-dom";


export const Posts = () => {
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)    
    
    useEffect(() => {
        listPost() // Assuming this function returns a promise
        .then(data => {
            setPosts(data);
        })
        .catch(err => {
            setError(err.message);
        });
    },
        [])
    
    
    
        return (
            <div className="posts-container">
                <h1 className="title">All Posts</h1>
    
                {error && <p className="error-message">{error}</p>}
    
                <ul className="posts-list">
                    {posts.map(post => (
                        <li key={post.id}>
                            <h2>{post.title}</h2>
                            <p>By: {post.user.first_name} {post.user.last_name}</p>
                            <p>Category: {post.category.label}</p>
                        </li>
                    ))}
                </ul>
            </div>
        );}; // Empty dependency array means this effect will run once, similar to componentDidMount.

