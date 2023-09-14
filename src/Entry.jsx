import { Route, Routes } from "react-router-dom"
import Login from "./views/Login"
import SignUp from "./views/SignUp"
import Todo from "./views/Todo"
import NotFound from "./views/NotFound"
import Home from "./views/Home"
import { useState } from "react"

function Entry() {
  const [picHidden, setPicHidden] = useState(false)

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home picHidden={picHidden} setPicHidden={setPicHidden} />} >
          <Route path='' element={<Login picHidden={picHidden} setPicHidden={setPicHidden} />} />
          <Route path='signUpPage' element={<SignUp picHidden={picHidden} setPicHidden={setPicHidden} />} />
        </Route>
        <Route path='/todo' element={<Todo />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}

export default Entry