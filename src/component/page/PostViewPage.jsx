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

function PostViewPage({ posts, onDeletePost, onAddComment }) {
    const navigate = useNavigate();
    const { postId } = useParams();

    const post = posts.find((item) => item.id == postId);
    const [comment, setComment] = useState('');

    if (!post) {
        return <div>해당 게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <Wrapper>
            <Container>
                <Button
                    title='뒤로 가기'
                    onClick={() => {
                        navigate('/');
                    }}
                />
                <Button
                    title='삭제 하기'
                    onClick={() => {
                        onDeletePost(post.id);
                        navigate('/');
                    }}
                />
                <Button
                    title='수정 하기'
                    onClick={() => {
                        navigate(`/post/${postId}/edit`);
                    }}
                />
                <PostContainer>
                    <TitleText>{post.title}</TitleText>
                    <ContentText>{post.content}</ContentText>
                </PostContainer>

                <CommentLabel>댓글</CommentLabel>
                <CommentList comments={post.comments} />

                {/* 댓글 입력란 */}
                <TextInput
                    height={40}
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                />
                <Button
                    title='댓글 작성하기'
                    onClick={() => {
                        if (comment.trim()) {
                            onAddComment(post.id, comment);
                            setComment('');
                        }
                    }}
                />
            </Container>
        </Wrapper>
    );
}

export default PostViewPage;
