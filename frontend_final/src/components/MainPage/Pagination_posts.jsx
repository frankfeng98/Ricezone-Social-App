import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import Pagination from "./Pagination";
import { connect, useSelector } from 'react-redux'

export const Pagination_posts = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const posts = useSelector(state => state.displayPost);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div>
            <Posts posts={currentPosts} />
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
    )
}

