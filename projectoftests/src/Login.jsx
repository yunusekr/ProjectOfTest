import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";

const initialForm = {
  email: "",
  password: "",
  terms: false,
};

const errorMessages = {
  email: "Please enter a valid email address",
  password: "Password must be at least 4 characters long",
  terms: "You must agree to the terms",
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const history = useHistory();

  useEffect(() => {
    validateForm();
  }, [form]);

  const handleChange = (event) => {
    let { name, value, type } = event.target;
    value = type === "checkbox" ? event.target.checked : value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      axios
        .get("https://6540a96145bedb25bfc247b4.mockapi.io/api/login")
        .then((res) => {
          const user = res.data.find(
            (item) =>
              item.password === form.password && item.email === form.email
          );
          if (user) {
            setForm(initialForm);
            history.push("/success");
          }
        });
    } else {
      validateForm();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateEmail(form.email)) {
      newErrors.email = errorMessages.email;
    }
    if (form.password.length < 4) {
      newErrors.password = errorMessages.password;
    }
    if (!form.terms) {
      newErrors.terms = errorMessages.terms;
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  console.log(errors);
  const git = (event) => {
    history.push("/success");
  };
  console.log(errors);
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={!!errors.email}
        />
        {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password"
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={!!errors.password}
        />
        {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
          invalid={!!errors.terms}
        />{" "}
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
        {errors.terms && <FormFeedback>{errors.terms}</FormFeedback>}
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid} onClick={git}>
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
