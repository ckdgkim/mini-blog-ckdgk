// PostEditPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';

const Wrapper = styled.div`
    padding: 16px;
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 100%;
    max-width: 720px;
`;

function PostEditPage({ posts, onUpdatePost }) {
    const navigate = useNavigate();
    const { postId } = useParams();
    const post = posts.find((item) => item.id == postId);

    const [title, setTitle] = useState(post ? post.title : '');
    const [content, setContent] = useState(post ? post.content : '');

    // 게시글 수정 버튼 클릭 시 호출되는 함수
    const handleSave = () => {
        const updatedPost = { ...post, title, content };
        onUpdatePost(updatedPost);
        navigate(`/post/${postId}`);
    };

    return (
        <Wrapper>
            <Container>
                <h2>게시글 수정</h2>
                <TextInput
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력하세요"
                    height={40}
                />
                <TextInput
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용을 입력하세요"
                    multiline
                    height={400}
                />
                <Button title="저장하기" onClick={handleSave} />
                <Button title="취소" onClick={() => navigate(`/post/${postId}`)} />
            </Container>
        </Wrapper>
    );
}

export default PostEditPage;
