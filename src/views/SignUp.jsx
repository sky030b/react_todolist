import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const { VITE_APP_HOST } = import.meta.env;

function SignUp({ picHidden, setPicHidden }) {

  const [form, setForm] = useState({
    email: "",
    password: "",
    nickname: ""
  })

  const [pwdcheck, setPwdcheck] = useState("")
  const navigate = useNavigate()

  function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  return (
    <div>
      <form className="formControls" action="index.html">
        <h2 className="formControls_txt">註冊帳號</h2>
        <label className="formControls_label" htmlFor="email">Email</label>
        <input className="formControls_input" type="text"
          id="email" name="email" placeholder="請輸入 email"
          onChange={(e) => { setForm({ ...form, email: e.target.value }) }}
          required />
        {
          form.email ?
            (!isValidEmail(form.email) ? (<span>Email格式錯誤</span>) : null) :
            null
        }
        <label className="formControls_label" htmlFor="nickname">您的暱稱</label>
        <input className="formControls_input" type="text"
          id="nickname" name="nickname" placeholder="請輸入您的暱稱"
          onChange={(e) => { setForm({ ...form, nickname: (e.target.value).trim() }) }}
        />
        <label className="formControls_label" htmlFor="pwd">密碼</label>
        <input className="formControls_input" type="password"
          id="pwd" name="pwd" placeholder="請輸入密碼"
          onChange={(e) => { setForm({ ...form, password: e.target.value }) }}
          required />
        {
          form.password ?
            (form.password.length < 6 ? (<span>密碼請至少輸入6碼</span>) : null) :
            null
        }
        <label className="formControls_label" htmlFor="pwd2">再次輸入密碼</label>
        <input className="formControls_input" type="password"
          id="pwd2" name="pwd2" placeholder="請再次輸入密碼"
          onChange={(e) => { setPwdcheck(e.target.value) }}
          required />
        {
          pwdcheck ?
            (pwdcheck !== form.password ? (<span>密碼不相同</span>) : null) :
            null
        }
        <input className="formControls_btnSubmit" type="button" value="註冊帳號"
          onClick={() => {
            if (pwdcheck !== form.password) {
              alert("請再次確認您所輸入的兩次密碼是否皆相同。")
            } else {
              (async () => {
                try {
                  const res = await axios.post(`${VITE_APP_HOST}/users/sign_up`, form)
                  alert("註冊成功！\n將於1秒後跳轉至登入介面")
                  setTimeout(() => {
                    navigate("/")
                  }, "1000");
                  // const result = confirm("是否跳轉至登入頁面？");
                  // if (result) {
                  //   navigate("/")
                  // }
                } catch (error) {
                  // console.dir(error)
                  alert(error.response.data.message)
                }
              })()
            }
          }} />
        <a type="button" className="formControls_btnLink"
          onClick={() => {
            setPicHidden(false)
            navigate("/")
          }}>登入</a>
      </form>
    </div>
  )
}

export default SignUp