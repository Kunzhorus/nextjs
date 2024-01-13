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
function EditModal(props: IProps) {
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
      let data = {title, author, content}
      let response = await axios.put(`http://localhost:8000/blogs/${id}`,data)
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
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Author</Form.Label>
              <Form.Control
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </Form.Group>
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
            {isDisabled ? "Loading" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
