import './LastBlogGrid.scss'
import BlogCard from './BlogCard/BlogCard'
import Loader from '../Loader/Loader.jsx';

import { useEffect, useState } from "react";
import BlogRepository from "../../repository/BlogRepository.js";

function LastBlogGrid() {
  const [blogs, setBlog] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await BlogRepository.getBlogs()
      setBlog(data)
    }
    fetchBlogs()
  }, [])


  return (
    <>
      <div className="last_blog_grid">
        {blogs.length > 0 ?
          blogs.map((blog, index) => (
            <BlogCard blog={blog} key={index} />
          ))
          :
          <h1><Loader/></h1>
        }
      </div>
    </>
  )
}

export default LastBlogGrid
