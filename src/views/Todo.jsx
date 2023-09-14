import { useEffect, useState } from "react"
import logo from "../pictures/logo.png"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { VITE_APP_HOST } = import.meta.env;

function Todo() {

  const navigate = useNavigate()
  const [btnLoading, setBtnLoading] = useState(false)
  const [statusChanging, setStatusChanging] = useState(false)

  // get token
  const token = Cookies.get('token')

  // set default token
  axios.defaults.headers.common['Authorization'] = token;

  // set nickname
  const [nickname, setNickname] = useState("")
  useEffect(() => {
    ; (async () => {
      try {
        const res = await axios.get(`${VITE_APP_HOST}/users/checkout`)
        // console.dir(res)
        console.log("認證成功")
        setNickname(res.data.nickname)
      } catch (error) {
        // console.dir(error)

        // alert("token驗證錯誤。\n將於1秒後回到登入頁面。")
        // setTimeout(() => {
        //   navigate("/")
        // }, "1000");
      }
    })()
  }, [])

  // checkout
  const checkout = async () => {
    try {
      const res = await axios.get(`${VITE_APP_HOST}/users/checkout`)
      // console.dir(res)
      console.log("認證成功")
    } catch (error) {
      // console.dir(error)
      alert("token驗證錯誤。\n將於1秒後回到登入頁面。")
      setTimeout(() => {
        navigate("/")
      }, "1000");
    }
  }
  // useEffect(() => { checkout() }, [])

  // get user's todos
  const [todos, setTodos] = useState([])
  const [showTodos, setShowTodos] = useState([]);
  const getTodos = async () => {
    try {
      checkout()
      const res = await axios.get(`${VITE_APP_HOST}/todos/`)
      // console.dir(res)
      setTodos(res.data.data)
      showNow(res.data.data)
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
  // useEffect(() => { getTodos() }, [])

  // change the status tab
  const [tab, setTab] = useState([
    {
      id: 1,
      title: "全部",
      selected: true
    },
    {
      id: 2,
      title: "待完成",
      selected: false
    },
    {
      id: 3,
      title: "已完成",
      selected: false
    }
  ])
  const showNow = (newlist) => {
    tab.map((item) => {
      if (item.selected === true) {
        if (item.title === "全部") {
          setShowTodos(newlist)
        } else if (item.title === "待完成") {
          setShowTodos(newlist.filter((one) => one.status === false))
        } else {
          setShowTodos(newlist.filter((one) => one.status === true))
        }
      }
    })
  }
  useEffect(() => { getTodos() }, [tab])

  // add new todo
  const [newTodo, setNewTodo] = useState("")
  const addNewTodo = async () => {
    if (!newTodo.trim()) {
      return setNewTodo("");
    }
    setBtnLoading(true)
    try {
      const res = await axios.post(`${VITE_APP_HOST}/todos`, { content: newTodo })
      setTab([
        {
          id: 1,
          title: "全部",
          selected: true
        },
        {
          id: 2,
          title: "待完成",
          selected: false
        },
        {
          id: 3,
          title: "已完成",
          selected: false
        }
      ])
      setNewTodo("");
    } catch (error) {
      checkout()
    }
    setBtnLoading(false)
  };

  // change todo status
  const changeTodoStatus = async (id) => {
    setStatusChanging(true)
    try {
      const res = await axios.patch(`${VITE_APP_HOST}/todos/${id}/toggle`, {});
      // checkout()
      getTodos();
    } catch (error) {
      checkout()
    }
    setStatusChanging(false)
  }

  // delete one todo
  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`${VITE_APP_HOST}/todos/${id}`);
      // checkout()
      getTodos();
    } catch (error) {
      console.dir(error)
      alert("刪除失敗...")
      checkout()
    }
  }

  // clean the done todos
  const cleanDoneTodo = async () => {
    todos.filter((todo) => {
      if (todo.status) {
        deleteTodo(todo.id);
      }
    });
  };

  // useEffect(() => { checkout() }, [todos])

  return (
    <div id="todoListPage" className="bg-half">
      <nav className="todo_nav">
        <img className="logo" src={logo} alt="logo" />
        <ul>
          <li className="todo_sm"><a><span>{nickname}的待辦清單</span></a></li>
          <li><a type="button" className="logout_btn" onClick={() => {
            const result = confirm("是否登出線上待辦系統？");
            if (result) {
              Cookies.remove('token')
              console.log("token已移除")
              navigate("/")
            }
          }}>登出</a></li>
        </ul>
      </nav>
      <div className="conatiner todoListPage vhContainer">
        <div className="todoList_Content">
          <div className="inputBox">
            <input type="text" placeholder="請輸入待辦事項" value={newTodo}
              onChange={(e) => { setNewTodo(e.target.value) }}
              onKeyDown={(e) => {
                e.key === 'Enter' ?
                  (!btnLoading ? addNewTodo() : null)
                  : null
              }} />
            <a type="button" onClick={!btnLoading ? addNewTodo : null}>
              <i className="fa fa-plus"></i>
            </a>
          </div>
          <div className="todoList_list">
            <ul className="todoList_tab">
              {tab.map((item) => {
                return (
                  <li key={item.id}>
                    <a className={(item.selected ? "active" : "inactive")}
                      onClick={() => {
                        const newTab = tab.map((newItem) => {
                          newItem.selected = false
                          if (item.title === newItem.title) {
                            newItem.selected = true
                          }
                          return newItem
                        })
                        setTab(newTab)
                      }}>{item.title}</a>
                  </li>
                )
              })}
            </ul>
            <div className="todoList_items">
              {todos.length === 0 ?
                <div className="nothing">目前尚無待辦事項</div> :
                <ul className="todoList_item">
                  {showTodos.length === 0 ?
                    <div className="nothing">目前尚無此分類之待辦事項</div> :
                    showTodos.map((todo) => {
                      return (
                        <li key={todo.id}>
                          <label className="todoList_label">
                            <input className="todoList_input" type="checkbox"
                              value="true" checked={todo.status}
                              onChange={() => { !statusChanging ? changeTodoStatus(todo.id) : null }} />
                            <span>{todo.content}</span>
                          </label>
                          <a onClick={() => { deleteTodo(todo.id) }}>
                            <i className="fa fa-times"></i>
                          </a>
                        </li>
                      )
                    })
                  }
                </ul>
              }
              <div className="todoList_statistics">
                <p> {todos.filter((todo) =>
                  todo.status !== true ? todo : null).length} 個未完成項目</p>
                <a
                  className={(todos.filter((todo) => todo.status === true)).length === 0 ? "off" : "on"}
                  onClick={() => { cleanDoneTodo() }}>清除已完成項目</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo