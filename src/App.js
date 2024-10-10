import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
// Pages
import MainPage from './component/page/MainPage';
import PostWritePage from './component/page/PostWritePage';
import PostViewPage from './component/page/PostViewPage';
import data from './data.json'; // 게시글 데이터를 가져오기 위해 json 파일을 import

// 메인 타이틀 스타일 정의
const MainTitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
`;

function App(props) {
    // 상태로 관리되는 게시글 목록
    const [posts, setPosts] = useState(data);

    // 게시글 삭제 함수
    const handleDeletePost = (id) => {
        // 해당 ID를 가진 게시글을 삭제하고 상태를 업데이트
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts); // 상태 업데이트
    };

    return (
        <BrowserRouter>
            <MainTitleText>소플의 미니 블로그</MainTitleText>
            <Routes>
                {/* MainPage에 posts와 handleDeletePost를 전달 */}
                <Route 
                    index 
                    element={<MainPage posts={posts} />} 
                />
                <Route path="post-write" element={<PostWritePage />} />
                
                {/* PostViewPage에 게시글 목록과 삭제 함수 전달 */}
                <Route 
                    path="post/:postId" 
                    element={<PostViewPage posts={posts} onDeletePost={handleDeletePost} />} 
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
