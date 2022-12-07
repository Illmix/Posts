import React, {useEffect, useState} from "react";
import PostsList from "../components/PostsList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {usePosts} from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/loader/loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";

function Posts() {

    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [visible, setVisible] = useState(false)
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [post, setPost] = useState({title: '', body: ''});
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })
    useEffect(()=>{
            fetchPosts(limit, page);
        }, []
    )
    function addNewPost(e) {
        e.preventDefault();
        setPosts([...posts, {id: Date.now(), ...post}])
        setPost({title: '', body: ''})
        setVisible(false)
    }
    const deletePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    const changePage = (page) => {
        setPage(page);
        fetchPosts(limit, page)
    }
    return (
        <div className="App">
            <MyModal visible={visible} setVisible={setVisible}>
                <PostForm post={post} addNewPost={addNewPost} setPost={setPost}/>
            </MyModal>
            <MyButton onClick={()=>{setVisible(true)}}>
                Add post
            </MyButton>
            <hr style={{margin: "15px 0"}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
                <h1 style={{textAlign: "center"}}>Error. {postError}</h1>
            }
            <PostsList deletePost={deletePost} posts={sortedAndSearchedPosts} title={'List of offers'}/>
            {isPostsLoading &&
                <div style={{display: "flex", justifyContent: 'center', marginTop: '20px'}}><Loader/></div>
            }
            <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
        </div>
    );
}

export default Posts;
