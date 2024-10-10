import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextInput from "../ui/TextInput";
import Button from "../ui/Button";

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

const TitleText = styled.p`
    font-size: 24px;
    font-weight: bold;
    text-align: left;
`;

function PostWritePage({ onAddPost }) {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        if (title.trim() === '' || content.trim() === '') {
            alert("제목과 내용을 모두 입력해주세요.");
            return;
        }

        const newPost = {
            id: Date.now(), // 고유한 id를 생성하기 위해 현재 시간을 사용
            title,
            content,
            comments: [], // 새로운 게시글은 댓글이 없음
        };

        // 새 게시글을 추가하는 함수 호출
        onAddPost(newPost);

        // 글 작성 후 메인 페이지로 이동
        navigate('/');
    };

    return (
        <Wrapper>
            <Container>
                <TitleText>글 작성하기</TitleText>
                <TextInput 
                    height={40} 
                    value={title} 
                    onChange={(event) => setTitle(event.target.value)} 
                    placeholder="제목을 입력하세요"
                />
                <TextInput 
                    height={200} 
                    value={content} 
                    onChange={(event) => setContent(event.target.value)} 
                    placeholder="내용을 입력하세요"
                />
                <Button 
                    title="작성하기" 
                    onClick={handleSubmit} 
                />
            </Container>
        </Wrapper>
    );
}

export default PostWritePage;
