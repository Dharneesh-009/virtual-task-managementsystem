import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingPage = () => {
  // Inline styles
  const featureCardStyle = {
    backgroundColor: '#1e1e1e',
    padding: '2rem',
    borderRadius: '16px',
    transition: 'transform 0.3s ease',
    cursor: 'default',
    boxShadow: '0 0 10px rgba(0, 255, 150, 0.1)',
  };

  const iconCircle = {
    width: '60px',
    height: '60px',
    margin: '0 auto 1rem',
    borderRadius: '50%',
    color: 'white',
    fontSize: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const featureTitle = {
    fontFamily: 'Space Grotesk, sans-serif',
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: '0.5rem',
  };

  const featureText = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.95rem',
    color: '#ccc',
  };

  return (
    <div style={{ backgroundColor: '#121212', color: 'white', minHeight: '100vh', padding: '2rem' }}>
      <Container>
        {/* Hero Section */}
        <Row className="align-items-center">
          <Col md={6}>
            <h1 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700,
              fontSize: '3.5rem',
              lineHeight: '1.2'
            }}>
              Build Your{' '}
              <span style={{
                background: 'linear-gradient(90deg, #22c55e, #84cc16)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
               Projects with our Task Management System
              </span>
            </h1>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.25rem',
              marginTop: '1rem'
            }}>
              Manage your tasks efficiently with our modern and intuitive platform.
            </p>
            <div className="mt-4">
              <Link to="/login">
  <Button variant="success" className="me-3">
    Get Started
  </Button>
</Link>
              <Button variant="outline-light">Try a Demo</Button>
            </div>
          </Col>

          {/* Dashboard Image */}
          <Col md={6} style={{ textAlign: 'center' }}>
            <img
              src="/images/task_dashboard.svg.svg" // place your image in public/images
              alt="Task Dashboard"
              style={{
                width: '100%',
                maxHeight: '320px',
                objectFit: 'contain',
                animation: 'fadeInUp 1s ease-out'
              }}
            />
          </Col>
        </Row>

        {/* Tech Logos */}
        <Row className="justify-content-center mt-5">
          <Col xs="auto">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" width="50" />
          </Col>
          <Col xs="auto">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Boot" width="50" />
          </Col>
          <Col xs="auto">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" width="50" />
          </Col>
          <Col xs="auto">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" width="50" />
          </Col>
        </Row>

        {/* Features Section */}
        <Row className="mt-5 justify-content-center">
          <Col md={3} className="text-center mb-4">
            <div className="feature-card" style={featureCardStyle}>
              <div style={{ ...iconCircle, backgroundColor: '#22c55e' }}>
                📌
              </div>
              <h5 style={featureTitle}>Task Tracking</h5>
              <p style={featureText}>Organize, prioritize, and track your daily and team-based tasks.</p>
            </div>
          </Col>

          <Col md={3} className="text-center mb-4">
            <div className="feature-card" style={featureCardStyle}>
              <div style={{ ...iconCircle, backgroundColor: '#3b82f6' }}>
                🤝
              </div>
              <h5 style={featureTitle}>Team Collaboration</h5>
              <p style={featureText}>Assign roles, communicate in real-time, and boost productivity.</p>
            </div>
          </Col>

          <Col md={3} className="text-center mb-4">
            <div className="feature-card" style={featureCardStyle}>
              <div style={{ ...iconCircle, backgroundColor: '#f59e0b' }}>
                🔐
              </div>
              <h5 style={featureTitle}>Secure Access</h5>
              <p style={featureText}>Role-based login secured with JWT authentication.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
