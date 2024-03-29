import React, { useState, useEffect } from "react";
import { PageLayout, Input, PasswordInput, Button, Spinner } from "../common";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost';

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background: white;
  border: 1px solid #eee;
  padding: 16px;
  color: black;
  border-radius: 4px;

  .alt-text {
    text-align: center;
    margin: 10px 0;
  }

  >${Button}:first-of-type{
    margin-top:20px;
  }

  >${Input}{
    margin-top: 20px;
  }
`;

let timeout;

export default function Login() {
  const [formFields, setFormFields] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  function handleInputChange(e) {
    e.persist();
    setFormFields((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('/login', {
          email: formFields.username,
          password: formFields.password,
      }).then(response => {
        console.log(response);
      }).catch(error => {
        console.log(error);
      });
  });
    timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return (
    <PageLayout>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        {loading ? <Spinner/> :
        <>
        <span>
          Login if you have an account
        </span>
          <Input
            value={formFields.username}
            onChange={handleInputChange}
            name="username"
            placeholder="Username"
          />
          <PasswordInput
            value={formFields.password}
            onChange={handleInputChange}
            name="password"
          />
        </>
        }
        <Button large type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>
        {!loading && (
          <>
            <div className="alt-text">or</div>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button  secondary type="button">
                Register
              </Button>
            </Link>
          </>
        )}
      </Form>
    </PageLayout>
  );
}
 