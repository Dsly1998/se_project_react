import './Header.css'

const Header = () => {
    console.log('Header')

return(
    <header className="header">
    <div className="header__left">
    <div><img src='/images/logo.svg' alt='logo'/></div>
    <div>date</div>
    </div>
    <div className="header__right">
    <div>
      <button type="text"> Add New clothes </button>
    </div>
    <div>name</div>
    <div><img src='/images/avatar.svg' alt='logo'/></div>
    </div>
  </header>
)

}

export default Header;