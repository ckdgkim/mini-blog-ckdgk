import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CommentList from '../list/CommentList';
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

const PostContainer = styled.div`
    padding: 8px 16px;
    border: 1px solid grey;
    border-radius: 8px;
`;

const TitleText = styled.p`
    font-size: 28px;
    font-weight: 500;
`;

const ContentText = styled.p`
    font-size: 20px;
    line-height: 32px;
    white-space: pre-wrap;
`;

const CommentLabel = styled.p`
    font-size: 16px;
    font-weight: 500;
`;

function PostViewPage({ posts, onDeletePost, onAddComment }) { // onAddComment 함수 추가
    const navigate = useNavigate();
    const { postId } = useParams();
    const post = posts.find(post => post.id == postId);

    const [comment, setComment] = useState(''); // 댓글 입력 상태 추가

    if (!post) {
        return <div>해당 게시글을 찾을 수 없습니다.</div>;
    }

    // 댓글 작성 후 상태를 업데이트하는 함수
    const handleAddComment = () => {
        if (comment.trim()) {
            onAddComment(post.id, comment); // 댓글 추가 함수 호출
            setComment(''); // 댓글 작성 후 입력 필드 초기화
        } else {
            alert("댓글을 입력해주세요.");
        }
    };

    return (
        <Wrapper>
            <Container>
                <Button title="뒤로 가기" onClick={() => navigate('/')} />
                <Button title="삭제 하기" onClick={() => navigate(`/auth/${postId}/delete`)} />
                <Button title="수정 하기" onClick={() => navigate(`/auth/${postId}/edit`)} />
                <PostContainer>
                    <TitleText>{post.title}</TitleText>
                    <ContentText>{post.content}</ContentText>
                </PostContainer>

                <CommentLabel>댓글</CommentLabel>
                <CommentList comments={post.comments} />

                {/* 댓글 입력 UI */}
                <TextInput
                    height={40}
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="댓글을 입력하세요"
                />
                <Button title="댓글 작성하기" onClick={handleAddComment} /> {/* 댓글 작성 버튼 */}
            </Container>
        </Wrapper>
    );
}

export default PostViewPage;
