import './SingleBlogPage';
import ShowBlog from '../ShowBlog/ShowBlog';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../providers/UserContext';

function SingleBlogPage(props){
    const navigate = useNavigate();
    const user = useUser();
    const isUserAuthor = props?.blog?.author_id  == user;
    if ( isUserAuthor ) {
        return <ShowBlog />
    }else {
        return (navigate("/dashboard"));
    }
}

export default SingleBlogPage;