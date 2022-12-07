import React from 'react';
import PostItem from "./PostItem";
import TransitionGroup from "react-transition-group/TransitionGroup";
import CSSTransition from "react-transition-group/CSSTransition";

const PostsList = ({posts, title, deletePost}) => {
    if (!posts.length) {
        return (
            <h1 style={{textAlign: "center"}}>There is no posts.</h1>
        )
    }
    return (
        <div>
            <h1 style={{textAlign: "center"}}>{title}</h1>
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={200}
                        classNames="post"
                    >
                        <PostItem remove={deletePost} post={post} id={index+1}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PostsList;