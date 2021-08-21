import React, { useState } from "react";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { DatePicker, Modal, Button } from 'antd';
import { Itodo } from "components/todo/TodoService";
import { useModalState } from "hooks/useModalState";

const CircleButton = styled.button<{ open: boolean }>`
  background: #33bb77;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  left: 50%;
  transform: translate(50%, 0%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  border-bottom: 1px solid #eeeeee;
`;

const InsertForm = styled.form`
  display: flex;
  background: #eeeeee;
  padding-left: 40px;
  padding-top: 36px;
  padding-right: 60px;
  padding-bottom: 36px;
`;

const Input = styled.input`
    margin-right: 20px;
  padding: 12px;
  border: 1px solid #dddddd;
  width: 90%;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
  color: #119955;
  &::placeholder {
    color: #dddddd;
    font-size: 16px;
  }
`;

interface TodoCreateProps {
  nextId: number;
  createTodo: (todo: Itodo) => void;
  incrementNextId: () => void;
}

const TodoCreate = ({
  nextId,
  createTodo,
  incrementNextId
}: TodoCreateProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [targetDateMoment, setTargetDateMoment] = useState(undefined);
  const { isModalVisible, showModal, closeModal, modalContents, setModalContents } = useModalState(false);

  const handleToggle = () => setOpen(!open);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

    const handleDateChange = (value: any, e: string) => {
        setTargetDate(e);
        setTargetDateMoment(value);
    }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 새로고침 방지
    if (!value.length) {
        setModalContents("'해야할 일'을 적어주세요!");
        showModal();
        return ; 
    }
    if (!targetDate.length) {
        setModalContents("'목표 완수 일자'를 입력해주세요!");
        showModal();
        return ;
    }

    createTodo({
      id: nextId,
      text: value,
      done: false,
      targetDate: targetDate,
    });
    incrementNextId(); // nextId 하나 증가

    setValue(""); // input 초기화
    setTargetDate(""); // targetDate 초기화
    setTargetDateMoment(undefined); // targetDateMoment 초기화
    setOpen(false); // open 닫기
  };

  const disabledDate = (current: any) => {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1))
    return current <= yesterday;
  }

  return (
    <>
      <InsertFormPositioner>
        <InsertForm onSubmit={handleSubmit}>
          <Input
            autoFocus
            placeholder="What's need to be done?"
            onChange={handleChange}
            value={value}
          />
          <DatePicker 
            disabledDate={disabledDate}
            value={targetDateMoment}
            placeholder="target Date" 
            onChange={(value: any, dateString: string) => handleDateChange(value, dateString)}/>
          <CircleButton onClick={handleToggle} open={open}>
            <PlusCircleOutlined />
          </CircleButton>\
        </InsertForm>
      </InsertFormPositioner>
      <Modal 
        title="내용 입력을 완료해주세요" 
        visible={isModalVisible} 
        onOk={closeModal} 
        onCancel={closeModal}
        footer={[
            <Button key="close" type="primary" onClick={closeModal}>
                Close
            </Button>
        ]}
        >
        <p>{modalContents}</p>
      </Modal>
    </>
  );
};

export default React.memo(TodoCreate);
