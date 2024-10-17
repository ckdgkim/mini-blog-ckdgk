import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import axios from "axios"; 
import MainPage from './component/page/MainPage';
import PostWritePage from './component/page/PostWritePage';
import PostViewPage from './component/page/PostViewPage';
import PostEditPage from './component/page/PostEditPage';
import AuthPage from './component/page/AuthPage';

const MainTitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

function App() {
    const [posts, setPosts] = useState([]);

    console.log('App.js - posts 상태:', posts);
    // 데이터를 불러오기 위한 useEffect
    useEffect(() => {
        // public 폴더에 있는 data.json 파일에서 데이터를 가져옵니다.
        axios.get(`${process.env.PUBLIC_URL}/data.json`)
            .then(response => {
                setPosts(response.data); 
            })
            .catch(error => {
                console.error('데이터를 가져오는데 실패했습니다:', error);
            });
    }, []);

    // 글 추가 함수
    const handleAddPost = (newPost) => {
        const updatedPosts = [...posts, { ...newPost, id: posts.length + 1 }];
        setPosts(updatedPosts);
    };

    // 글 수정 함수
    const handleUpdatePost = (updatedPost) => {
        const updatedPosts = posts.map(post => 
            post.id === Number(updatedPost.id) ? updatedPost : post
        );
        setPosts(updatedPosts);
    };

    // 글 삭제 함수
    const handleDeletePost = (postId) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
    };

    // 댓글 추가 함수
    const handleAddComment = (postId, commentContent) => {
        const postToUpdate = posts.find(post => post.id === postId);
        const newComment = {
            id: postToUpdate.comments.length + 1,
            content: commentContent
        };
        const updatedPost = {
            ...postToUpdate,
            comments: [...postToUpdate.comments, newComment]
        };

        const updatedPosts = posts.map(post => 
            post.id === postId ? updatedPost : post
        );
        setPosts(updatedPosts);
    };

    return (
        <BrowserRouter>
            <MainTitleText>AWS 소개 블로그</MainTitleText>
            <Routes>
                <Route index element={<MainPage posts={posts} />} />
                <Route path="post-write" element={<PostWritePage onAddPost={handleAddPost} />} />
                <Route path="post/:postId" element={<PostViewPage posts={posts} onDeletePost={handleDeletePost} onAddComment={handleAddComment} />} />
                <Route path="post/:postId/edit" element={<PostEditPage posts={posts} onUpdatePost={handleUpdatePost} />} />
                <Route path="auth/:postId/:action" element={<AuthPage posts={posts} onDeletePost={handleDeletePost} onUpdatePost={handleUpdatePost} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
