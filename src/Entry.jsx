import { Route, Routes } from "react-router-dom"
import Login from "./views/Login"
import SignUp from "./views/SignUp"
import Todo from "./views/Todo"
import NotFound from "./views/NotFound"

function Entry() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signUpPage' element={<SignUp />} />
        <Route path='/todo' element={<Todo />} />

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}

export default Entry