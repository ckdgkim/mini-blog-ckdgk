import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PostList from '../list/PostList';
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

function MainPage({ posts }) {  // posts를 props로 받음
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Container>
                {/* 글 작성 페이지로 이동하는 버튼 */}
                <Button
                    title='글 작성하기'
                    onClick={() => {
                        navigate('/post-write');
                    }}
                />

                {/* PostList에 posts 전달 */}
                <PostList
                    posts={posts}  // props로 전달받은 posts 사용
                    onClickItem={(item) => {
                        // 게시글을 클릭하면 해당 ID에 맞는 상세 페이지로 이동
                        navigate(`/post/${item.id}`);
                    }}
                />
            </Container>
        </Wrapper>
    );
}

export default MainPage;
