// AuthPage.js
import React, { useState } from 'react';
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

function AuthPage({ posts, onDeletePost, onUpdatePost }) {
    const navigate = useNavigate();
    const { postId, action } = useParams();  // postId와 action(수정/삭제)을 URL에서 가져옴
    const post = posts.find((item) => item.id == postId);

    const [inputUser, setInputUser] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    if (!post) {
        return <div>해당 게시글을 찾을 수 없습니다.</div>;
    }

    const handleAuth = () => {
        if (inputUser === post.user && inputPassword === post.password) {
            if (action === 'edit') {
                navigate(`/post/${postId}/edit`);
            } else if (action === 'delete') {
                onDeletePost(post.id);
                navigate('/');
            }
        } else {
            alert("사용자명 또는 비밀번호가 일치하지 않습니다.");
        }
    };

    return (
        <Wrapper>
            <Container>
                <h3>사용자 인증</h3>
                <TextInput
                    height={40}
                    value={inputUser}
                    onChange={(event) => setInputUser(event.target.value)}
                    placeholder="사용자명을 입력하세요"
                />
                <TextInput
                    height={40}
                    type="password"
                    value={inputPassword}
                    onChange={(event) => setInputPassword(event.target.value)}
                    placeholder="비밀번호를 입력하세요"
                />
                <Button title="확인" onClick={handleAuth} />
                <Button title="취소" onClick={() => navigate(`/post/${postId}`)} />
            </Container>
        </Wrapper>
    );
}

export default AuthPage;
