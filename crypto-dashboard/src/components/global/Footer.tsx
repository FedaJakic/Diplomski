import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary">
      <Container>
        <Row>
          <Col>
            <ul className="list-unstyled mb-0 m-2 d-flex flex-row justify-content-center align-items-center">
              <li className="mx-5" style={{ color: '#fff' }}>
                Block Explorer
              </li>
              <li className="mx-5" style={{ color: '#fff' }}>
                Feda Jakic
              </li>
            </ul>
          </Col>
        </Row>

        <Row>
          <Col
            className="text-center py-1 fw-bold"
            style={{
              color: '#fff',
            }}
          >
            Copyright &copy; Kriptovalute
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
