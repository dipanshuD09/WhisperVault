import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useRecoverPassMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";

const RecoverPasswordScreen = () => {
  const [email, setEmailid] = useState("");

  const navigate = useNavigate();

  const [recover, { isLoading }] = useRecoverPassMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await recover({ email }).unwrap();
      navigate("/resetpass", { state : { email: res.email } });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Recover Account</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmailid(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          hidden={isLoading}
        >
          Submit
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default RecoverPasswordScreen;
