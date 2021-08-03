import { Container, Row, Col, Jumbotron, Button } from 'react-bootstrap';
import Logo from "../assets/svgs/full-logo.svg";
import { Link } from "react-router-dom";

function Header() {
    return <div id="header" className="d-flex flex-column">
        <Container fluid>
        <Row className="justify-content-md-center align-items-md-center bg-light text-dark">
            <Col sm={6}><img src={Logo} height="80" alt="logo" /></Col>
            <Col sm={{ offset: 3 }}>
                <Row className="align-items-center justify-content-center">
                    <Col className="text-center"><Link to="/admin" style={{ textDecoration: "none"}}>Admin</Link></Col>
                    <Col className="text-center"><span  onClick={() => window.scrollTo(0, 1400)} style={{ textDecoration: "none"}}>Test</span></Col>
                    <Col className="text-center"><span onClick={() => window.scrollTo(0, 600)} style={{ textDecoration: "none"}}>Explore</span></Col>
                </Row>
            </Col>
        </Row>
        </Container>
        <div className="d-flex flex-column justify-content-center fluid flex-grow-1 container">
        <Jumbotron>
            <h1 className="font-weight-bolder text-primary shadow-effect"><span className="text-blue">Co</span>Secure</h1>
            <p className="font-weight-bolder">
                A Machine Learning based Application trained over millions of dataset to predict the covid-19 virus attack
                <br/>
                <strong>Test your results now with acurate predictor!</strong>
            </p>
            <p>
                <Button variant="primary" onClick={() => window.scrollTo(0, 600)}>Learn more</Button>
                <Button variant="outline-primary" onClick={() => window.scrollTo(0, 1400)} className="m-2">Test Now</Button>
            </p>
        </Jumbotron>
        </div>
    </div>
}

export default Header;