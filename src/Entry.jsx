import { Route, Routes, useNavigate } from "react-router-dom"
import Login from "./views/Login"
import SignUp from "./views/SignUp"
import Todo from "./views/Todo"
import NotFound from "./views/NotFound"
import Home from "./views/Home"

function Entry() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path='' element={<Login />} />
          <Route path='signUpPage' element={<SignUp />} />
        </Route>
        <Route path='/todo' element={<Todo />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}

export default Entry