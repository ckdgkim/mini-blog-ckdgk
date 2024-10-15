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

const StyledTextarea = styled.textarea`
    width: calc(100% - 32px);
    ${(props) =>
        props.height &&
        `height: ${props.height}px;`}
    padding: 16px;
    font-size: 16px;
    line-height: 20px;
    resize: none; /* 사용자가 크기 조절하지 못하도록 설정 */
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
    font-size: 18px;
`;

function TextInput({ height, value, onChange, placeholder, type = "text", multiline = false }) {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === "password" && showPassword ? "text" : type;

    return (
        <PasswordWrapper>
            {multiline ? (
                <StyledTextarea
                    height={height}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={10}
                />
            ) : (
                <StyledInput
                    height={height}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    type={inputType}
                />
            )}
            {type === "password" && (
                <ToggleButton
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? "🙈" : "👁️"}
                </ToggleButton>
            )}
        </PasswordWrapper>
    );
}

export default TextInput;
