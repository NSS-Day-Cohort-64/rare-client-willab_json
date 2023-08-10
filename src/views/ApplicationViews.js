import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { Posts } from "../posts/Post"
import { Categories } from "../views/categories"
import { PostDetails } from "../posts/PostDetails"
import { Tags } from "../components/tags/Tags.js"
import { PostForm } from "../posts/PostForm"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
      <Route path= "/posts" element={<Posts />} />
      <Route path= "/categories" element={<Categories />} />
      <Route path= "/posts/:postId" element={<PostDetails />} />
      <Route path= "/posts/form" element={<PostForm token={token}/>} />
      <Route path= "/tags" element={<Tags />} />
        {/* Add Routes here */}
        
      </Route>
    </Routes>
  </>
}
