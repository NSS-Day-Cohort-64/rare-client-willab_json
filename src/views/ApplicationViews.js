import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { Posts } from "../posts/Post"
import { PostDetails } from "../posts/PostDetails"


export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
      <Route path= "/posts" element={<Posts />} />
      <Route path= "/posts/:postId" element={<PostDetails />} />
        {/* Add Routes here */}
        
      </Route>
    </Routes>
  </>
}
