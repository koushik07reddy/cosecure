import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import logo from "../assets/svgs/full-logo-shadow.svg";
import axios from "axios";
import {url} from "../utils/url"

class Admin extends Component {

    state = {
        email: "",
        password: "",
        credits: false,
        isLoading: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true});
        console.log(this.state);
        axios.post(url + "/rest-auth/login/", 
            { username: "admin", password: this.state.password }
        )
        .then(res => {
            localStorage.setItem("token", res.data.key);
            console.log(res.data.key);
            this.setState({ credits: true });
            this.setState({ isLoading: false});
        })
        .catch(err => {
            console.log("error login")
            this.setState({ isLoading: false});
        })
    };

    render() {
        if (this.state.credits) return (<Redirect to='/admin-page' />);

        return <div className="admin">
            {
            this.state.isLoading ?
                (<div class="spinner"><div class="lds-hourglass"></div></div>):
                (<div></div>)
        }
        <div className="container pt-4">
        <Card border="primary" style={{ width: '100%' }}>
            <Card.Body>
            <Card.Title>Admin Access Only</Card.Title>
            <Card.Text>
            <Container>
                <Row className="justify-content-md-center">
                    <Col sm={12} md={6} className="text-center">
                        <span>
                            <img src={logo} alt="logo" style={{ width: "80%" }} />
                            <p className="lead">Autoscale and manage the Machine model in admin page exclusive. Change or Update dataset manage dataset train model and much more...</p>
                            <p>Not a right page ? <Link to="/">Navigate to Home page</Link></p>
                        </span>
                    </Col>
                    <Col sm={12} md={6} className="text-center">
                        <div className="container">
                        <Form>
                        <h2 className="text-primary text-left">Admin Login</h2>
                        <Form.Group className="m-4">
                            <Form.Control type="username" placeholder="Enter admin username" onChange={(e) => this.setState({ email: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="m-4">
                            <Form.Control type="password" placeholder="Enter Password" onChange={(e) => this.setState({ password: e.target.value})} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={this.handleSubmit} className="m-4" style={{ width: "90%"}}>
                            Login
                        </Button>
                        </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
            </Card.Text>
            </Card.Body>
        </Card>
        </div>
    </div>
    }
}

export default withRouter(Admin);