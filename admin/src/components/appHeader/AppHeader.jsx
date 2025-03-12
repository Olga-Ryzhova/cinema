import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className="page-header">
        <Link to="/" className="page-header__title">Идём<span>в</span>кино</Link>
        <span to="/" className="page-header__subtitle">Администраторррская</span>
    </header>
  )
}

export default AppHeader;
