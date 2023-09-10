import picture from "../pictures/picture.png"
import logo from "../pictures/logo.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Cookies from "js-cookie"

const { VITE_APP_HOST } = import.meta.env;

function Login() {

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const signIn = () => {
    ; (async () => {
      try {
        const res = await axios.post(`${VITE_APP_HOST}/users/sign_in`, form)
        setIsLoading(true)
        console.log(res)

        Cookies.set('token', res.data.token)
        // document.cookie = `token=${res.data.token}; nickname=${res.data.nickname}`

        setIsLoading(false)
        navigate("/todo")
      } catch (error) {
        alert(error.response.data.message)
      }
    })()
  }

  function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  return (
    <div id="loginPage" className="bg-yellow">
      <div className="conatiner loginPage vhContainer ">
        <div className="side">
          <img className="logoImg" src={logo} alt="logo" />
          <img className="d-m-n" src={picture} alt="workImg" />
        </div>
        <div>
          <form className="formControls" action="index.html">
            <h2 className="formControls_txt">最實用的線上待辦事項服務</h2>
            <label className="formControls_label" htmlFor="email">Email</label>
            <input className="formControls_input" type="text"
              id="email" name="email" placeholder="請輸入 email"
              onChange={(e) => { setForm({ ...form, email: e.target.value }) }}
              onKeyDown={(e) => { e.key === 'Enter' ? signIn() : null }}
              required />
            {!form.email ?
              <span>此欄位不可留空</span> :
              (!isValidEmail(form.email) ?
                <span>Email格式錯誤</span> : null)
            }
            <label className="formControls_label" htmlFor="pwd">密碼</label>
            <input className="formControls_input" type="password"
              name="pwd" id="pwd" placeholder="請輸入密碼"
              onChange={(e) => { setForm({ ...form, password: e.target.value }) }}
              onKeyDown={(e) => { e.key === 'Enter' ? signIn() : null }}
              required />
            <input
              className={isLoading ? "formControls_btnSubmit btn_dis" : "formControls_btnSubmit btn_able"}
              type="button" value="登入"
              onClick={signIn} disabled={isLoading}
            />
            <a onClick={() => { navigate("/signUpPage") }} className="formControls_btnLink" >註冊帳號</a>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login