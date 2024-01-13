"use client";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { mutate } from "swr";
interface IProps {
  show: boolean;
  id: number
  handleClose: () => void;
}
function DeleteModal(props: IProps) {
  const { show, handleClose, id } = props;
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const CloseModal = () => {
    setTitle("");
    setAuthor("");
    setContent("");
    handleClose();
  };
  const handleSubmit = async () => {
    if (!isDisabled) {
      setIsDisabled(true);
      try{
        let response = await axios.delete(`http://localhost:8000/blogs/${id}`)
      }catch(err){
        console.log(err);
      }  
      setIsDisabled(false)
      CloseModal()
      mutate("http://localhost:8000/blogs")
    }
  };

  const handleCloseModal = () => {
    CloseModal();
  };
  
  useEffect( () => {
    const getBlog = async () => {
        let response = await axios.get(`http://localhost:8000/blogs/${id}`)
        let data = response.data
        setTitle(data.title)
        setAuthor(data.author)
        setContent(data.content)
    }
    getBlog()
  },[show])
  
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              <div style={{textAlign:"center"}}>{`Are You sure delelte ${id} blog?`}</div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            {isDisabled ? "Loading" : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
