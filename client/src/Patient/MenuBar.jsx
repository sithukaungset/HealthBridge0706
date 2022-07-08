import '../css/Menubar.css';

function MenuBar({setState}) {
const menu = [

  { icon: "fa fa-solid fa-file-medical", name: "My PHR"},
  { icon: "fa fa-solid fa-address-card", name: "Transaction History"},
  { icon: "fa fa-solid fa-chart-bar", name: "Healthcare AI"},
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