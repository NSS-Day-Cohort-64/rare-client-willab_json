import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../managers/Posts";

export const PostDetails = () => {
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    
    // useParams is a hook from react-router-dom which allows us to 
    // get parameters from the route. In this case, the post's id.
    const { postId } = useParams();

    useEffect(() => {
        console.log("Post ID:", postId);
        getPostById(postId)
        .then(data => {
            setPost(data);
        })
        .catch(err => {
            setError("An error occurred while fetching the post details.");
        });
    }, [postId]);

    // Loading state
    if(!post && !error) {
        return <p>Loading...</p>;
    }

    // Error state
    if(error) {
        return <p>{error}</p>;
    }

    return (
        <div className="post-detail-container">
            <h2>{post.title}</h2>
            <p>By: {post.user.first_name} {post.user.last_name}</p>
            <p>Category: {post.category.label}</p>
            <p>Publication Date: {post.publication_date}</p>
            <div>{post.content}</div>
        </div>
    );
};
