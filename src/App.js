import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import MainPage from './component/page/MainPage';
import PostWritePage from './component/page/PostWritePage';
import PostViewPage from './component/page/PostViewPage';
import PostEditPage from './component/page/PostEditPage';
import data from './data.json'; 

const MainTitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

function App() {
    const [posts, setPosts] = useState(data);

    // 게시글 추가
    const handleAddPost = (newPost) => {
        setPosts([newPost, ...posts]); // 새로운 게시글을 목록 맨 앞에 추가
    };

    // 게시글 삭제
    const handleDeletePost = (postId) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
    };

    // 게시글 수정
    const handleUpdatePost = (updatedPost) => {
        const updatedPosts = posts.map(post => post.id === updatedPost.id ? updatedPost : post);
        setPosts(updatedPosts);
    };

    // 댓글 추가
    const handleAddComment = (postId, commentContent) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                const newComment = {
                    id: post.comments.length + 1, // 댓글의 고유 ID
                    content: commentContent,
                };
                return {
                    ...post,
                    comments: [...post.comments, newComment],
                };
            }
            return post;
        });
        setPosts(updatedPosts);
    };

    return (
        <BrowserRouter>
            <MainTitleText>소플의 미니 블로그</MainTitleText>
            <Routes>
                <Route index element={<MainPage posts={posts} />} />
                {/* 글 작성 페이지로 handleAddPost 전달 */}
                <Route path="post-write" element={<PostWritePage onAddPost={handleAddPost} />} />
                <Route 
                    path="post/:postId" 
                    element={<PostViewPage posts={posts} onDeletePost={handleDeletePost} onAddComment={handleAddComment} />} 
                />
                <Route 
                    path="post/:postId/edit" 
                    element={<PostEditPage posts={posts} onUpdatePost={handleUpdatePost} />} 
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
