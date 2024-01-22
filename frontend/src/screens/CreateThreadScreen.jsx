import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useCreateThreadMutation } from "../slices/threadsApiSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const [create, { isLoading }] = useCreateThreadMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await create({ title, content }).unwrap();
      toast.success("Post created successfully");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Create Post</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="title" className="my-3">
          <Form.Label>title</Form.Label>
          <Form.Control
            type="title"
            placeholder="Enter Subject"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="content" className="my-3">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea"
            type="paragraph"
            placeholder="Spill your Thoughts"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          hidden={isLoading}
        >
          Post
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
