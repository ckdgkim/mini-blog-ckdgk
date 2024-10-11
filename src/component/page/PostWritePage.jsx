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
    const [user, setUser] = useState('');       // 사용자명 상태 추가
    const [password, setPassword] = useState(''); // 비밀번호 상태 추가

    const handleSubmit = () => {
        if (title.trim() === '' || content.trim() === '' || user.trim() === '' || password.trim() === '') {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        const newPost = {
            id: Date.now(), // 고유한 id를 생성하기 위해 현재 시간을 사용
            title,
            content,
            user,          // 사용자명 추가
            password,      // 비밀번호 추가
            comments: [],  // 새로운 게시글은 댓글이 없음
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
                <TextInput
                    height={40}
                    value={user}
                    onChange={(event) => setUser(event.target.value)}
                    placeholder="작성자명을 입력하세요"
                />
                <TextInput
                    height={40}
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="비밀번호를 입력하세요"
                />
                <Button 
                    title="작성하기" 
                    onClick={handleSubmit} 
                />
                <Button 
                    title="뒤로 가기"
                    onClick={() => navigate('/')}
                />
            </Container>
        </Wrapper>
    );
}

export default PostWritePage;
