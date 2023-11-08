import React from 'react';
import { Container, Row, Col, Card} from 'react-bootstrap';

const About = () => {
  return (
    <Container className="main-container">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2>About</h2>
              <p>BlueBus is a simple and convenient way to book bus tickets.
                We offer great deals and discounts on all our tickets, so you can save more while traveling. 
                Our system is built to make the booking process easier and faster, allowing you to find the best routes, 
                compare prices, and book tickets with just a few clicks.</p>
              <p>Our bus reservation system is secure and reliable, so your data is always safe. 
                We also provide personalized customer service, so you can get the help you need when you need it. 
                Our goal is to make your booking experience as easy and stress-free as possible.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;