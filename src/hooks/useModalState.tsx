import { useState } from "react";

export const useModalState = (defaultState: boolean) => {
    const [isModalVisible, setIsModalVisible] = useState(defaultState);
    const [modalContents, setModalContents] = useState(''); 

    const showModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    return {
        isModalVisible,
        showModal,
        closeModal,
        modalContents,
        setModalContents,
    }
}