function SideMenu({setState, CODE}) {
    let menu = [];
    if(CODE === 1) {
        menu = [
            {icon: "fa fa-solid fa-users-between-lines", name: "Patient List"},
            {icon: "fa fa-solid fa-reply", name: "Request PHR"},
            {icon: "fa fa-solid fa-address-card", name: "My Transactions"}
        ]
    } else {
        menu = [
            {icon: "fa fa-soild fa-hospital-user", name: "Patients"},
            {icon: "fa fa-solid fa-file-import", name: "Send PHR"},
            {icon: "fa fa-solid fa-gear", name: "Setting"},
        ]
    }
    // const menu = [
    //     {icon: "fa fa-soild fa-hospital-user", name: "Patients"},
    //     {icon: "fa fa-solid fa-file-import", name: "Send PHR"},
    //     {icon: "fa fa-solid fa-gear", name: "Setting"},
    //     {icon: "fa fa-solid fa-info", name: "My Info"},
    //     {icon: "fa fa-solid fa-reply", name: "Request PHR"},
    //     {icon: "fa fa-solid fa-rectangle-history", name: "Patient List"}
    // ]

    
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

export default SideMenu;