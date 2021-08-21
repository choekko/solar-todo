import React from "react";
import { useRef, useState } from "react";
import styled from "styled-components";
import { useModalState } from "hooks/useModalState";
import { Modal, Button } from "antd";

interface LoginProps {
    setIsLogged: (isLogged: boolean) => void;
}

const Login = ({ setIsLogged } : LoginProps) => {
    const { isModalVisible, showModal, closeModal } = useModalState(false);
    const [ inputValue, setInputValue ] = useState('');

    const password = "admin123";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }
    const handleClick = () => {
        if (inputValue === password) {
            setIsLogged(true);
        }
        else {
            showModal();
        }
    }

    return (
        <>
        <LoginCard>
            <LoginInput 
            value={inputValue}
            type='password' 
            placeholder="비밀번호"
            onChange={handleChange}
            />
            <Button type="primary" onClick={handleClick}> 
                접속 
            </Button>
        </LoginCard>
        <Modal 
        title="올바른 비밀번호가 아닙니다" 
        visible={isModalVisible} 
        onOk={closeModal} 
        onCancel={closeModal}
        footer={[
            <Button key="close" type="primary" onClick={closeModal}>
                Close
            </Button>
        ]}
        >
            <p>"정확한 비밀번호를 입력해주세요"</p>
        </Modal>
        </>
    )
}

const LoginCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 100px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 1px 1px 4px gray;
`

const LoginInput = styled.input`
    outline: none;
    width: 180px;
    height: 33px;
    margin-right: 5px;
    border : 1px solid gray;
    &:focus {
        border: 2px solid #119955;
    }
`

export default Login;