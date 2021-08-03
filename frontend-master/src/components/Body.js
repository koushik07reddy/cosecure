import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";
import {url} from "../utils/url"

class Body extends Component {
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
        accurary: null,
        isLoading: false,
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ isLoading: true});
        console.log(this.state);
        let bdy = {
            temperature: 100,
            bpm: 60, 
            age: null, 
            gender: null,
            taste_sensitive: 0,
            shortness_of_breath: 0,
            sneeze: 0,
            headache: 0, 
            throat_soar: 0, 
            cough: 0, 
            spO2: 97,
            contact_with_positive_person: 0, 
            result: null
        };
        bdy.temperature = parseFloat(this.state.temperature);
        bdy.bpm = parseInt(this.state.bpm);
        bdy.age = parseInt(this.state.age);
        bdy.gender = parseInt(this.state.gender);
        bdy.taste_sensitive = parseInt(this.state.taste_sensitive);
        bdy.shortness_of_breath = parseFloat(this.state.shortness_of_breath);
        bdy.sneeze = parseInt(this.state.sneeze);
        bdy.headache = parseFloat(this.state.headache);
        bdy.throat_soar = parseFloat(this.state.throat_soar);
        bdy.cough = parseInt(this.state.cough);
        bdy.spO2 = parseInt(this.state.spO2);
        bdy.contact_with_positive_person = parseFloat(this.state.contact_with_positive_person);
        bdy.result = parseInt(this.state.result);

        console.log(bdy);

        axios.post(url + "/ml_model/predict/",
            bdy
        )
        .then(res => {
            let prid = parseFloat(res.data.prediction) > 100 ? "100": parseFloat(res.data.prediction);
            prid = prid < 0 ? "0" : prid;
            this.setState({result: prid});
        })
        .catch(err => {
            console.log("error sending data")
        })
        .finally(() => {
            this.setState({ isLoading: false});
        });

        axios.get(url + "/ml_model/dataset/accuracy/")
        .then(res => {
            this.setState({accurary: res.data.accurary});
        })
        .catch(err => {
            console.log("error sending data")
        })
        .finally(() => {
            this.setState({ isLoading: false});
        });
    }
    render() {
    return <div className="body m-4">
        {
            this.state.isLoading ?
                (<div class="spinner"><div class="lds-hourglass"></div></div>):
                (<div></div>)
        }
        <Container className="alert alert-primary p-4 text-justify" id="about">
            <h2 className="mb-4 mt-4">About CoSecure</h2>
            <p className="lead">Since COVID pandemic is again getting peak and uncontrollable, people are not confirm with their symptoms against covid-19 virus, so we across an idea of predicting the user’s covid-19 virus attack based on their body temperature, beats per minute, spO2 level, taste sensitive, sneeze, headache, throat soar, cough and if they contacted with covid-19 positive patient. We will inform the user the changes that he/she is effected based on the previous data of covid-19 patients.</p>
            <p className="lead">CoSecure has two type of users, one is users who want to test their symptoms and another type of user are doctors who can be consulted based on the symptoms.</p>
            <p className="lead">CoSecure is Android Application where user can login and check their chances of covid-19 virus attack based on the body situation. We will take the user data of body temperature, beats per minute, spO2 level, taste sensitive, sneeze, headache, throat soar, cough and if they contacted with covid-19 positive patient. And then we inform the user the chances of virus affected. The prediction is purely based on Machine Learning model that is trained based on the covid-19 test reports of thousands users. If the chances of the user is really high then user can consult the doctor via chat in our application.</p>
        </Container>
        <br/>
        <Container className="alert alert-info p-4 text-justify mb-4" id="about">
            <h2 className="mb-4 mt-4">help Us!</h2>
            <p className="lead">Since our Application is based on Users Covid test report, help us by adding your test report to enhance our machine learning model prediction</p>
            <Link to="/add-dataset" style={{ textDecoration: "none"}}>Add Your Test Report</Link>
        </Container>
        <Container className="alert alert-success p-4 text-justify">
            <Row>
                <Col md={6} sm={12}>
                    <div className="container">
                        <h2 className="text-success">Sample Prediction Test</h2>
                        <p className="lead">
                            This is just a basic prediction trained over 100 dataset, Download the Official application for actual prediction of the covid-19 virus
                        </p>
                    </div>
                </Col>
                <Col md={6} sm={12} className="alert alert-success text-justify">
                <Form  onSubmit={this.handleSubmit}>
                    <h2 className="text-primary text-left text-center">Enter the Report Data</h2>
                    <Form.Group className="m-4">
                        <Form.Label>Temperature</Form.Label>
                        <Form.Control type="number" placeholder="Enter the body Temperature" onChange={(e) => this.setState({ temperature: e.target.value})} required min="97" max="105" />
                    </Form.Group>
                    <div class="m-4 form-group">
                        <label class="form-label">Headache</label>
                        <Form.Control as="select" custom style={{ width: '100%', height: '36px'}} value={this.state.headache} onChange={(e) => { this.setState({ headache: e.target.value}) }}>
                        <option value="0" selected disabled>Please select</option>
                        <option value="0">No Headache</option>
                        <option value="0.5">Mild Headache</option>
                        <option value="1">Heavy Headache</option>
                        </Form.Control>
                    </div>
                    <div class="m-4 form-group">
                        <label class="form-label">Soar Throad</label>
                        <Form.Control as="select" custom style={{ width: '100%', height: '36px'}} value={this.state.throat_soar} onChange={(e) => { this.setState({ throat_soar: e.target.value}) }}>
                        <option value="0" selected disabled>Please select</option>
                        <option value="0">No Soar Throad</option>
                        <option value="0.5">Mild Soar Throad</option>
                        <option value="1">Heavy Soar Throad</option>
                        </Form.Control>
                    </div>
                    <div class="m-4 form-group">
                        <label class="form-label">Breathlessness</label>
                        <Form.Control as="select" custom style={{ width: '100%', height: '36px'}} value={this.state.shortness_of_breath} onChange={(e) => { this.setState({ shortness_of_breath: e.target.value}) }}>
                        <option value="0" selected disabled>Please select</option>
                        <option value="0">Normal</option>
                        <option value="0.5">Mild</option>
                        <option value="1">Critical</option>
                        </Form.Control>
                    </div>
                    <div class="m-4 form-group">
                        <label class="form-label">Contact Status</label>
                        <Form.Control as="select" custom style={{ width: '100%', height: '36px'}} value={this.state.contact_with_positive_person} onChange={(e) => { this.setState({ contact_with_positive_person: e.target.value}) }}>
                        <option value="0" selected disabled>Please select</option>
                        <option value="0">No Contact with Covid person</option>
                        <option value="0.5">Came from Abroad</option>
                        <option value="1">Contacted covid person</option>
                        </Form.Control>
                    </div>
                    <Form.Group className="m-4">
                        <Form.Label>Beats per minute</Form.Label>
                        <Form.Control min="45" max="140" type="number" placeholder="Enter the bpm" required onChange={(e) => this.setState({ bpm: e.target.value})}/>
                    </Form.Group>
                    <Form.Group className="m-4">
                        <Form.Label>spO2 Level</Form.Label>
                        <Form.Control min="60" max="100" type="number" placeholder="Enter the O2 saturation Level" required onChange={(e) => this.setState({ spO2: e.target.value})}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="m-4" style={{ width: "90%"}}>
                        Check Report
                    </Button>
                    {
                        (this.state.result) ? (<p>Prediction is {this.state.result}% - accurary is {this.state.accurary}</p>) : null
                    }
                    </Form>
                </Col>
            </Row>
        </Container>
    </div>
    }
}

export default Body;