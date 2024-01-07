import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
const NavBar = () => {
    return <div className='nav-bar-container'>
        <Link className='link'><button>Top</button></Link>
        <Link className='link'> <button>For You</button></Link>
        <Link className='link'><button>Following</button></Link>
        <Link className='link'><button>Computer Networks</button></Link>
        <Link className='link'><button>Artificial Intelligence</button></Link>
    </div>
}
export default NavBar;