import React, { useState } from "react";
import Modal from "../components/Modal";

export default function useModal() {
  const [modalContent, setMocalContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const setModal = (content) => {
    console.log(content);
    setMocalContent(content);
    if (!content) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const ModalPackage = () => (isOpen ? <Modal>{modalContent}</Modal> : null);
  return [ModalPackage, setModal, setIsOpen];
}
