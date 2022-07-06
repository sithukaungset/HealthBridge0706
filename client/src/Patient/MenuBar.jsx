import '../css/Menubar.css';
import { faFileMedical } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";

function MenuBar({setState}) {
const menu = [

  { icon: "fa fa-solid fa-hospital", name: "My Records"},
  { icon: "fa fa-solid fa-address-card", name: "My transactions"},
  { icon: "fa fa-solid fa-chart-bar", name: "Predictions"},
  { icon: "fa fa-solid fa-chart", name: "My wearable device"}
  ]
  const onClickBtn = (event, key) => {
    setState(key);
}
  return(
    <div className='side_menu'>
      <nav className="main-menu">
      
        <ul>
          {menu.map((item, index) => {
           
            return (
              <li key={index} onClick={e => onClickBtn(e, index)}>
                <a href="#!">
                  <i className={item.icon} ></i>
                  <span className='nav-text'>
                  {item.name}
                  
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}


export default MenuBar;
