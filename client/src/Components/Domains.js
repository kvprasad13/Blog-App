import { Link } from 'react-router-dom';
import '../styles/Domains.css';
const Domains = () => {
    return <div className='domains-container'>
        <h1>Recommended topics for you </h1>
        <Link className='link'><button> Deep Learning</button></Link>
        <Link className='link'><button> Computer Networks</button></Link>
        <Link className='link'><button> Object Oriented Programming Methodologies(OOPs)</button></Link>
        <Link className='link'><button> Software Engineering</button></Link>
        <Link className='link'><button> C / C++</button></Link>
        <Link className='link'><button> Java </button></Link>
        <Link className='link'><button> Python </button></Link>
        <Link className='link'><button> React</button></Link>
        <Link className='link'><button>   Artificial Intelligence</button></Link>
        <Link className='link'><button> Machine Learning </button></Link>
    </div>
}
export default Domains;