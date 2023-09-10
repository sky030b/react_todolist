import { Outlet } from "react-router-dom"
import picture from "../pictures/picture.png"
import logo from "../pictures/logo.png"

function Home() {
  return (
    <div id="homePage" className="bg-yellow">
      <div className="conatiner homePage vhContainer">
        <div className="side">
          <img className="logoImg" src={logo} alt="logo" />
          <img className="d-m-n" src={picture} alt="workImg" />
        </div>
        {/* <div> */}
        <Outlet />
        {/* </div> */}
      </div>
    </div >
  )
}

export default Home