import React, { useState } from 'react';
import axios from 'axios';
import { Container,Row,Col,Card,Form,Button } from "react-bootstrap";

const API_URL = 'http://127.0.0.1:8000/api/';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const contact = {
      name: name,
      email: email,
      message: message
    };

    const errors = validate(contact);

    if (Object.keys(errors).length === 0) {
      axios.post(API_URL + 'contact/', {
        name,
        email,
        message
      })
      .then((response) => {
        if (response.status === 201) {
          console.log('Message sent successfully');
          setErrors({}); 
          alert('Message Sent Successfully')
        }
      })
        .catch((error) => {
          if (error.response.status === 400) {
            setErrors(error.response.data.errors || {});
          }
        });
    } else { 
      setErrors(errors);
    }
  }

  function validate(contact) {
    let errors = {};

    if (!contact.name.trim()) {
      errors.name = "Name is required";
    } else if (contact.name.length < 4) {
      errors.name = "Name must be at least 4 characters";
    } 

    if (!contact.message) {
      errors.message = "Message is required";
    } else if (contact.message.length < 20) {
      errors.message = "Message must be at least 20 characters";
    }
    
    if (!contact.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
      errors.email = "Email is invalid";
    }
    return errors;
  }

  return (
    <Container className="main-container">
      <Row>
      <Col>
      <Card>
      <Card.Body>
        <h2 className="text-center">Contact Us</h2>
        <p>If you have any questions, comments, or feedback about our bus reservation system, 
          please feel free to get in touch with us. You can reach us by phone at <span>1234567891</span>, 
          or by email at <span>bluebus@gmail.com</span>.</p>
        <p>We are available 24/7 to answer your questions and provide customer service. 
          We look forward to hearing from you.</p>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                {errors.name && <p className="text-danger font-weight-bold">{errors.name}</p>}
                <Form.Control type="text" placeholder="Enter your name" value={name} onChange={handleNameChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                {errors.email && <p className="text-danger font-weight-bold">{errors.email}</p>}
                <Form.Control type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Message</Form.Label>
                {errors.message && <p className="text-danger font-weight-bold">{errors.message}</p>}
                <Form.Control as="textarea" rows="3" value={message} onChange={handleMessageChange} />
            </Form.Group><br></br>
            <Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form.Group>
        </Form>
      </Card.Body>
      </Card>
      </Col>
      </Row>
    </Container>
  );
}

export default Contact;