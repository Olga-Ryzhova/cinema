import { Link } from 'react-router-dom';
const AppHeader = () => {
  return (
    <header className="page-header">
     <Link to="/" className="page-header__title">
        Идём<span>в</span>кино
      </Link>
    </header>
  )
}

export default AppHeader; 