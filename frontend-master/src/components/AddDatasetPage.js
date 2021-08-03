import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/svgs/full-logo-shadow.svg";
import axios from "axios";
import {url} from "../utils/url"

class AddDatasetPage extends Component {

    state = {
        temperature: null,
        bpm: null, 
        age: null, 
        gender: null,
        taste_sensitive: null,
        shortness_of_breath: null,
        sneeze: null,
        headache: null, 
        throat_soar: null, 
        cough: null, 
        spO2: null,
        contact_with_positive_person: null, 
        result: null,
        isLoading: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true});
        let bdy = {
            temperature: null,
            bpm: null, 
            age: null, 
            gender: null,
            taste_sensitive: null,
            shortness_of_breath: null,
            sneeze: null,
            headache: null, 
            throat_soar: null, 
            cough: null, 
            spO2: null,
            contact_with_positive_person: null, 
            result: null
        };
        bdy.temperature = parseFloat(this.state.temperature);
        bdy.bpm = parseInt(this.state.bpm);
        bdy.age = parseInt(this.state.age);
        bdy.gender = parseInt(this.state.gender);
        bdy.taste_sensitive = parseInt(this.state.taste_sensitive);
        bdy.shortness_of_breath = parseInt(this.state.shortness_of_breath);
        bdy.sneeze = parseInt(this.state.sneeze);
        bdy.headache = parseInt(this.state.headache);
        bdy.throat_soar = parseInt(this.state.throat_soar);
        bdy.cough = parseInt(this.state.cough);
        bdy.spO2 = parseInt(this.state.spO2);
        bdy.contact_with_positive_person = parseInt(this.state.contact_with_positive_person);
        bdy.result = parseInt(this.state.result);

        console.log(bdy)
        
        axios.post(url + "/ml_model/dataset/add/",
            bdy
        )
        .then(res => {
            console.log(res.data);
            alert("added succesfully");
        })
        .catch(err => {
            console.log("error sending data")
            alert("Not able to add report");
        })
        .finally(()=> {
            this.setState({ isLoading: false});
        })
    };

    render() {
        return <div className="admin">
            {
            this.state.isLoading ?
                (<div class="spinner"><div class="lds-hourglass"></div></div>):
                (<div></div>)
        }
        <div className="container pt-4">
        <Card border="primary" style={{ width: '100%' }}>
            <Card.Body>
            <Card.Title>Add Test Report</Card.Title>
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
                    <Col sm={12} md={6}>
                        <div className="container">
                        <Form  onSubmit={this.handleSubmit}>
                        <h2 className="text-primary text-left text-center">Enter the Report Data</h2>
                        <Form.Group className="m-4">
                            <Form.Label>Temperature</Form.Label>
                            <Form.Control type="number" required min="96" max="105" placeholder="Enter the body Temperature" onChange={(e) => this.setState({ temperature: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="m-4">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" required min="1" max="105"  placeholder="Enter the Age" onChange={(e) => this.setState({ age: e.target.value})}/>
                        </Form.Group>
                        <div class="m-4 form-group">
                            <label class="form-label">Gender</label>
                            <Form.Control as="select" custom style={{ width: '100%', height: '36px'}} value={this.state.gender} onChange={(e) => { this.setState({ gender: e.target.value}) }}>
                            <option value="" selected disabled>Please select</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                            <option value="1">Don't want to mention</option>
                            </Form.Control>
                        </div>
                        <div class="m-4 form-group">
                            <label class="form-label">Headache</label>
                            <Form.Control as="select" custom style={{ width: '100%', height: '36px'}} value={this.state.headache} onChange={(e) => { this.setState({ headache: e.target.value}) }}>
                            <option value="" selected disabled>Please select</option>
                            <option value="0">No Headache</option>
                            <option value="1">Mild Headache</option>
                            <option value="2">Heavy Headache</option>
                            </Form.Control>
                        </div>
                        <div class="m-4 form-group">
                            <label class="form-label">Soar Throad</label>
                            <Form.Control as="select" custom style={{ width: '100%', height: '36px'}} value={this.state.throat_soar} onChange={(e) => { this.setState({ throat_soar: e.target.value}) }}>
                            <option value="" selected disabled>Please select</option>
                            <option value="0">No Soar Throad</option>
                            <option value="1">Mild Soar Throad</option>
                            <option value="2">Heavy Soar Throad</option>
                            </Form.Control>
                        </div>
                        <div class="m-4 form-group">
                            <label class="form-label">Taste Sensitivity</label>
                            <Form.Control as="select" custom style={{ width: '100%', height: '36px'}} value={this.state.taste_sensitive} onChange={(e) => { this.setState({ taste_sensitive: e.target.value}) }}>
                            <option value="" selected disabled>Please select</option>
                            <option value="0">Normal</option>
                            <option value="1">Mild taste Sensitivity</option>
                            <option value="2">No Taste Sensitivity</option>
                            </Form.Control>
                        </div>
                        <div class="m-4 form-group">
                            <label class="form-label">Breathlessness</label>
                            <Form.Control as="select" custom style={{ width: '100%', height: '36px'}} value={this.state.shortness_of_breath} onChange={(e) => { this.setState({ shortness_of_breath: e.target.value}) }}>
                            <option value="" selected disabled>Please select</option>
                            <option value="0">Normal</option>
                            <option value="1">Mild</option>
                            <option value="2">Critical</option>
                            </Form.Control>
                        </div>
                        <div class="m-4 form-group">
                            <label class="form-label">Sneeze</label>
                            <Form.Control as="select" custom style={{ width: '100%', height: '36px'}} value={this.state.sneeze} onChange={(e) => { this.setState({ sneeze: e.target.value}) }}>
                            <option value="" selected disabled>Please select</option>
                            <option value="0">No Sneeze</option>
                            <option value="1">Mild</option>
                            <option value="2">Critical</option>
                            </Form.Control>
                        </div>
                        <div class="m-4 form-group">
                            <label class="form-label">Cough</label>
                            <Form.Control as="select" custom style={{ width: '100%', height: '36px'}} value={this.state.cough} onChange={(e) => { this.setState({ cough: e.target.value}) }}>
                            <option value="" selected disabled>Please select</option>
                            <option value="0">No Cough</option>
                            <option value="1">Mild Cough</option>
                            <option value="2">Critical Cough</option>
                            </Form.Control>
                        </div>
                        <div class="m-4 form-group">
                            <label class="form-label">Contact Status</label>
                            <Form.Control as="select" custom style={{ width: '100%', height: '36px'}} value={this.state.contact_with_positive_person} onChange={(e) => { this.setState({ contact_with_positive_person: e.target.value}) }}>
                            <option value="" selected disabled>Please select</option>
                            <option value="0">No Contact with Covid person</option>
                            <option value="1">Came from Abroad</option>
                            <option value="2">Contacted covid person</option>
                            </Form.Control>
                        </div>
                        <Form.Group className="m-4">
                            <Form.Label>Beats per minute</Form.Label>
                            <Form.Control required min="40" max="125"  type="number" placeholder="Enter the bpm" onChange={(e) => this.setState({ bpm: e.target.value})}/>
                        </Form.Group>
                        <Form.Group className="m-4">
                            <Form.Label>spO2 Level</Form.Label>
                            <Form.Control required min="60" max="100"  type="number" placeholder="Enter the O2 saturation Level" onChange={(e) => this.setState({ spO2: e.target.value})}/>
                        </Form.Group>
                        <div class="m-4 form-group">
                            <label class="form-label">Report Status</label>
                            <Form.Control as="select" custom style={{ width: '100%', height: '36px'}} value={this.state.result} onChange={(e) => { this.setState({ result: e.target.value}) }}>
                            <option value="" selected disabled>Please select</option>
                            <option value="0">No Covid</option>
                            <option value="1">Tested covid positive</option>
                            </Form.Control>
                        </div>
                        <Button variant="primary" type="submit" className="m-4" style={{ width: "90%"}}>
                            Add Report
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

export default AddDatasetPage;