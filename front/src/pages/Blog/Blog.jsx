import './Blog';
import ShowArticles from '../../components/ShowArticles/ShowArticles';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../providers/UserContext';
import { useEffect, useState } from 'react';
import BlogRepository from '../../repository/BlogRepository';
import ArticleRepository from '../../repository/ArticleRepository';
import Loader from '../../components/Loader/Loader';

function SingleBlogPage(){
    const navigate = useNavigate();
    const {user} = useUser();
    const { blogid } = useParams();
    const [ articles, setArticles ] = useState(null)
    const [ blogName, setBlogName ] = useState(null)

    useEffect(() => {
        const fetchBlog = async () => {
            const blog = await BlogRepository.getBlog(blogid);
            const isUserAuthor = blog?.author_id  == user?._id
            if(isUserAuthor) {
                navigate('/dashboard')
            }

            setBlogName(blog.title)
            // Charge les articles uniquement après avoir vérifier l'author
            const articles = await ArticleRepository.getArticleByBlog(blogid);
            setArticles(articles)
        }
        fetchBlog()
    }, [blogid]);

    return (
        <>
            {/* Affiche le contenu uniquement si il y a des articles (donc ce n'est pas l'author) */}
            {articles ?
                <div>
                    <h1>{blogName}</h1>
                    <ShowArticles articles={articles} canEdit={false} />
                </div>
                : 
                <h1><Loader /></h1>
            }
        </>
    )
}

export default SingleBlogPage;