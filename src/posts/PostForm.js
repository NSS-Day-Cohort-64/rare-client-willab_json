import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addPost } from "../managers/Posts";
import { listCategory } from "../managers/Categories";




export const PostForm = () => {
    const [categories, setCategories] = useState([])
    const [post, setPost] = useState({
        user_id: "",
        category_id: "",
        title: "",
        publication_date: "",
        image_url: "",
        content: "",
        approved: true
    });

    useEffect(() => {
        // function you'll define to make an API call to get all categories.
        listCategory().then(fetchedCategories => {
            setCategories(fetchedCategories);
        });
    }, []);

    const navigate = useNavigate();

    const updatePost = (evt) => {
        const copy = { ...post };
        copy[evt.target.id] = evt.target.value;
        setPost(copy);
    };

    const handlePostSubmission = (e) => {
        e.preventDefault();

        addPost(post)
            .then(createdPost => {
                if (createdPost.hasOwnProperty("id")) {
                    navigate(`/posts/${createdPost.id}`);
                } else {
                    window.alert("Failed to create a new post.");
                }
            });
    };

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--post" onSubmit={handlePostSubmission}>
                <h1 className="h3 mb-3 font-weight-normal">Create a New Post</h1>
                
                <fieldset>
                    <label htmlFor="title">Title</label>
                    <input onChange={updatePost}
                           type="text" id="title" className="form-control"
                           placeholder="Enter post title" required autoFocus />
                </fieldset>
                
                <fieldset>
                    <label htmlFor="category_id">Category</label>
                    <select 
                    id="category_id"
                    className="form-control"
                    value={post.category_id}
                     onChange={updatePost} required>
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                        ))}
                    </select>
                </fieldset>
                
                <fieldset>
                    <label htmlFor="publication_date">Publication Date</label>
                    <input onChange={updatePost}
                           type="date" id="publication_date" className="form-control" required />
                </fieldset>

                <fieldset>
                    <label htmlFor="image_url">Image URL</label>
                    <input onChange={updatePost}
                           type="url" id="image_url" className="form-control" required />
                </fieldset>

                <fieldset>
                    <label htmlFor="content">Content</label>
                    <textarea onChange={updatePost} id="content" className="form-control" required />
                </fieldset>

                <fieldset>
                    <button type="submit">Submit</button>
                </fieldset>
            </form>
        </main>
    );
}

