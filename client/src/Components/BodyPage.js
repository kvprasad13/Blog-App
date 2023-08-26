import NavBarArticlesInfo from './NavBarArticlesInfo.js';
import '../styles/BodyPage.css';
import Domains from './Domains.js'
const BodyPage = () => {
    return <div className="body-page-container">
        <NavBarArticlesInfo></NavBarArticlesInfo>
        <Domains />
    </div>

}


export default BodyPage;