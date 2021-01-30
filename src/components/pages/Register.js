import React, { useState, useEffect } from "react";
import { PageLayout, Input, PasswordInput, Button, Spinner } from "../common";
import styled from "styled-components";
import axios from 'axios';
import { Link } from "react-router-dom";

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

export default function Register() {
  const [formFields, setFormFields] = useState({ name: "", email: "", password: "", password_confirmation: "" });
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
          axios.post('/register', {
              name: formFields.name,
              email: formFields.email,
              password: formFields.password,
              password_confirmation: formFields.password_confirmation
          }).then(response => {
            console.log(response);
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
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        {loading ? <Spinner/> :
        <>
        <span>
          Register
        </span>
          <Input
            value={formFields.name}
            onChange={handleInputChange}
            name="name"
            placeholder="Name"
            />
            <Input
            value={formFields.email}
            onChange={handleInputChange}
            name="email"
            placeholder="email"
          />
          <PasswordInput
            value={formFields.password}
            onChange={handleInputChange}
            name="password"
                      />
            <PasswordInput
            value={formFields.password_confirmation}
            onChange={handleInputChange}
            name="password_confirmation"
          />
        </>
        }
        <Button large type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </Button>
        {!loading && (
          <>
            <div className="alt-text">or</div>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button  secondary type="button">
                Login
              </Button>
            </Link>
          </>
        )}
      </Form>
    </PageLayout>
  );
}
