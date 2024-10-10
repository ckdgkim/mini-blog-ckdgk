import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

    :not(:last-child) {
        margin-bottom: 16px;
    }
`;

function Edit({ posts, onEditPost }) {
    const { postId } = useParams();  // URL에서 postId 가져오기
    const navigate = useNavigate();
    const post = posts.find((item) => item.id == postId);  // postId로 해당 게시글 찾기

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    // 저장 버튼을 클릭했을 때 호출되는 함수
    const handleSave = () => {
        const updatedPost = {
            ...post, // 기존 게시글 정보 유지
            title,   // 수정된 제목
            content  // 수정된 내용
        };
        onEditPost(postId, updatedPost);  // 수정된 게시글 저장
        navigate(`/post/${postId}`);  // 저장 후 다시 해당 게시글 보기 페이지로 이동
    };

    return (
        <Wrapper>
            <Container>
                <TextInput
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력하세요"
                />
                <TextInput
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="내용을 입력하세요"
                    height={200}
                />
                <Button
                    title="저장하기"
                    onClick={handleSave}
                />
            </Container>
        </Wrapper>
    );
}

export default Edit;
