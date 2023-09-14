import { Outlet } from "react-router-dom"
import picture from "../pictures/picture.png"
import logo from "../pictures/logo.png"

function Home({ picHidden, setPicHidden }) {
  return (
    <div id="homePage" className="bg-yellow">
      <div className="conatiner homePage vhContainer">
        <div className={picHidden ? "side smaller" : "side"}>
          <img className="logoImg" src={logo} alt="logo" />
          <img className={picHidden ? "d-m-n pic_hidden" : "d-m-n"} src={picture} alt="workImg" />
        </div>
        <div className={picHidden ? "interactive bigger" : "interactive"}>
          <Outlet />
        </div>
      </div>
    </div >
  )
}

export default Home