import '../css/Menubar.css';
function WearableMenuBar({setState}) {
const menu = [

  { icon: "fa fa-solid fa-file-waveform", name: "Wearable PHR"},
  { icon: "fa fa-solid fa-file-import", name: "Register PHR"},
  { icon: "fa fa-solid fa-gear", name: "Settings"}
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


export default WearableMenuBar;
