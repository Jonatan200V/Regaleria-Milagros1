import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import Axios from "axios";
import { Store } from "../Store";
import { toast } from "react-toastify";
const SiginupScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectUrl ? redirectUrl : "/";

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await Axios.post(`/api/users/signup`, {
        name,
        email,
        password,
      });

      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
      console.log(data);
    } catch (err) {
      toast.error("Invalida email or password");
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <div className="sigin__container">
      <Container>
        <Helmet>
          <title>Sign In</title>
        </Helmet>
        <h1 className="my-3">Sign In</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <div className="mt-3">
            <Button type="submit">Sign Up</Button>
          </div>
          <div className="mt-3">
            New Customer?
            <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default SiginupScreen;
