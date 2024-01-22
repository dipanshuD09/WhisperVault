import { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useResetPassMutation } from '../slices/userApiSlice';
import { toast } from "react-toastify";

const ResetPasswordScreen = () => {
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const [reset, { isLoading }] = useResetPassMutation();

    const { email } = useLocation();

    const submitHandler = async(e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            toast.error('Passwords do not match');
            return;
        }else {
            try {
                await reset({email, code, password}).unwrap();
                navigate("/recoverpass");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

  return (
    <FormContainer>
        <h1>Sign Up</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group controlId="code" className="my-3">
                <Form.Label>Recovery Code</Form.Label>
                <Form.Control 
                    type="code" 
                    placeholder="Enter Code" 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="password" className="my-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="comfirmPassword" className="my-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter Password Again" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-2" hidden={isLoading}>
                Register
            </Button>

            {isLoading && <Loader />}
        </Form>
    </FormContainer>
  )
}

export default ResetPasswordScreen