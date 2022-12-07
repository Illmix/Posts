import React from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({addNewPost, post, setPost}) => {
    return (
        <form>
            {/*Управляемый компонент*/}
            <MyInput
                type="text"
                placeholder="Title: "
                onChange={e => setPost({...post, title: e.target.value})}
                value={post.title}
            />
            {/*Неуправляемый компонент*/}
            {/*<MyInput*/}
            {/*    ref={bodyInputRef}*/}
            {/*    type="text"*/}
            {/*    placeholder="Description: "*/}
            {/*/>*/}
            <MyInput
                type="text"
                placeholder="Description: "
                onChange={e => setPost({...post, body: e.target.value})}
                value={post.body}/>
            <MyButton onClick={addNewPost}>Add</MyButton>
        </form>
    );
};

export default PostForm;