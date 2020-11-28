import React, {useState} from "react";
import { PageLayout, Input, PasswordInput } from "../common";
import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  background: white;
  border: 1px solid #eee;
  padding: 16px;
  color: black;
  border-radius: 4px;
`;

export default function Login() {
    const [formFields, setFormFields] = useState({ username: '', password: '' });
    function handleInputChange(e) {
        e.persist();
        setFormFields(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    }
  return (
    <PageLayout>
      <h1>Login</h1>
          <Form>
              <Input
                  value={formFields.username}
                  onChange={handleInputChange}
                  name="username"
                  placeholder="Username" />
              <PasswordInput
                  value={formFields.password}
                  onChange={handleInputChange}
                  name="password"
                  />
      </Form>
    </PageLayout>
  );
}
