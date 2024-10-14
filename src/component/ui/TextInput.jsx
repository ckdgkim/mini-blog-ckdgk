import React, { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
    width: calc(100% - 32px);
    ${(props) =>
        props.height &&
        `height: ${props.height}px;`}
    padding: 16px;
    font-size: 16px;
    line-height: 20px;
`;

const PasswordWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const ToggleButton = styled.button`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px; /* 아이콘 크기 설정 */
`;

function TextInput({ height, value, onChange, placeholder, type = "text" }) {
    const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기 상태

    // 실제 입력 필드의 타입을 결정
    const inputType = type === "password" && showPassword ? "text" : type;

    return (
        <PasswordWrapper>
            <StyledInput 
                height={height}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={inputType} // 실제 타입 설정
            />
            {type === "password" && (
                <ToggleButton
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} // 보이기/숨기기 토글
                >
                    {showPassword ? "🙈" : "👁️"} {/* 눈 모양 아이콘 */}
                </ToggleButton>
            )}
        </PasswordWrapper>
    );
}

export default TextInput;
