import './SingleBlogPage';
import ShowBlog from '../ShowBlog/ShowBlog';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../providers/UserContext';
import { useEffect } from 'react';
import BlogRepository from '../../repository/BlogRepository';

function SingleBlogPage(){
    const navigate = useNavigate();
    const {user} = useUser();
    const { blogid } = useParams();
    useEffect(() => {
        const fetchBlog = async () => {
            const blog = await BlogRepository.getBlog(blogid);
            const isUserAuthor = blog?.author_id  == user?._id
            if(!isUserAuthor) {
                return <ShowBlog blog={blog} />;
            }
            else {
                navigate('/dashboard')
            }
        }
        fetchBlog()
    },[blogid]);
}

export default SingleBlogPage;