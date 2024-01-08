import { Link } from 'react-router-dom';
import BlogPost from '../BlogPost/index.js';
const ArticlesGroupComponent = ({ Blogs }) => {

    return <>

        {Blogs.map((Blog) => (
            <div key={Blog._id}>
                {/* {console.log(Blog)} */}
                <Link to={`/${Blog.username}/${(Blog.title + " " + Blog._id).trim().replace(/ /g, '-')}`}>

                    <BlogPost authorUserName={Blog.username} title={Blog.title} content={Blog.content} updatedAt={Blog.updatedAt} user_id={Blog.user_id} />
                </Link>
            </div>
        ))}


    </>

}

export default ArticlesGroupComponent;