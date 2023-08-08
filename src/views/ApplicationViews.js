import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { Posts } from "../posts/Post"
import { Categories } from "../views/categories"
import { Tags } from "../components/tags/Tags.js"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
      <Route path= "/posts" element={<Posts />} />
      <Route path= "/categories" element={<Categories />} />
      <Route path= "/tags" element={<Tags />} />
        {/* Add Routes here */}
        
      </Route>
    </Routes>
  </>
}
