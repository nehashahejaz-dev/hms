import axios from 'axios';
import React, { useState } from 'react'
import { Form, Button, Card, Container, Row, Col, InputGroup } from "react-bootstrap";
export default function Adduser() {
     const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
    phone: "",
  });
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    console.log("Submitting User Data:", formData);
   const res = await axios.post("http://localhost:5000/register", formData);
console.log("User Registered:", res.data);
  };
  return (

    
<Container className="my-5" style={{ maxWidth: "700px" }}>
      <Card className="shadow border-0 rounded-3">
        <Card.Header className="bg-primary text-white py-3 text-center">
          <h4 className="mb-0 fw-bold">Create User Account</h4>
        </Card.Header>

  <Card.Body className="p-4">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* Name Field */}
            <Form.Group className="mb-3" controlId="userName">
              <Form.Label className="fw-semibold">Full Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="enter you name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter full name.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Email & Phone Row */}
            <Row className="mb-3">
              <Form.Group as={Col} md="7" controlId="userEmail">
                <Form.Label className="fw-semibold">Email Address *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email address.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="userPhone">
                <Form.Label className="fw-semibold">Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="+92 300 1234567"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            {/* Password & Role Row */}
            <Row className="mb-4">
              <Form.Group as={Col} md="7" controlId="userPassword">
                <Form.Label className="fw-semibold">Password *</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter strong password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={6}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    Password must be at least 6 characters.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="5" controlId="userRole">
                <Form.Label className="fw-semibold">Role *</Form.Label>
                <Form.Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="receptionist">Receptionist</option>
                  <option value="housekeeping">Housekeeping</option>
                </Form.Select>
              </Form.Group>
            </Row>

            {/* Form Action Buttons */}
            <div className="d-grid gap-2 d-md-flex justify-md-content-end">
              <Button
                variant="light"
                type="button"
                className="me-2"
                onClick={() => setValidated(false)}
              >
                Reset
              </Button>
              <Button variant="primary" type="submit" className="px-4">
                Register User
              </Button>
            </div>
          </Form>
        </Card.Body>

        </Card>
        </Container>

  )
}
