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

    :not(:last-child) {
        margin-bottom: 16px;
    }
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

function PostViewPage({ posts, onDeletePost }) {
    const navigate = useNavigate();
    const { postId } = useParams();

    // 현재 보고 있는 게시글을 postId로 찾음
    const post = posts.find((item) => {
        return item.id == postId;
    });

    const [comment, setComment] = useState('');

    return (
        <Wrapper>
            <Container>
                {/* 뒤로 가기 버튼 */}
                <Button
                    title='뒤로 가기'
                    onClick={() => {
                        navigate('/');
                    }}
                />
                {/* 삭제하기 버튼: 삭제 후 메인 페이지로 이동 */}
                <Button
                    title='삭제 하기'
                    onClick={() => {
                        onDeletePost(post.id); // 해당 게시글 ID를 넘겨 삭제
                        navigate('/'); // 삭제 후 메인 페이지로 이동
                    }}
                />
                {/* 게시글 정보 렌더링 */}
                <PostContainer>
                    <TitleText>{post.title}</TitleText>
                    <ContentText>{post.content}</ContentText>
                </PostContainer>

                {/* 댓글 목록 표시 */}
                <CommentLabel>댓글</CommentLabel>
                <CommentList comments={post.comments} />

                {/* 댓글 입력란 */}
                <TextInput
                    height={40}
                    value={comment}
                    onChange={(event) => {
                        setComment(event.target.value);
                    }}
                />
                <Button
                    title='댓글 작성하기'
                    onClick={() => {
                        navigate('/');
                    }}
                />
            </Container>
        </Wrapper>
    );
}

export default PostViewPage;

.