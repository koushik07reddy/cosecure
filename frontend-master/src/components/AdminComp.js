import { Component } from "react";
import axios from 'axios';
import {url} from "../utils/url"
import { ListGroup, Container, Row, Col, Button, Form } from "react-bootstrap";
import fileDownload from 'js-file-download';
import  { Redirect } from 'react-router-dom';

class AdminComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
           token: localStorage.getItem("token"),
           dataset: [],
           datasetSelect: null,
           field: null,
           value: 0,
           attrFactor: null,
           isLoading: false,
        };

        if (!this.state.token) {
            return <Redirect to='/login' />
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true});
        axios.get(url+"/ml_model/dataset/get-factor/", {
            headers: { Authorization: `Token ${localStorage.getItem("token")}` }
        })
        .then(res => {
            console.log(res.data);
            this.setState({ attrFactor: res.data });
            this.setState({ isLoading: false});
        })
        .catch(err => {
            console.log("error fetching dataset");
            this.setState({ isLoading: false});
        })

        axios.get(url+"/ml_model/dataset/list/", {
            headers: { Authorization: `Token ${localStorage.getItem("token")}` }
        })
        .then(res => {
            console.log(res.data);
            this.setState({ dataset: res.data });
            console.log(this.state)
            this.setState({ isLoading: false});
        })
        .catch(err => {
            console.log("error fetching dataset");
            this.setState({ isLoading: false});
        })
    }

    handleCSVDownload = () => {
        this.setState({ isLoading: true});
        axios.get(url+"/ml_model/dataset/download/", {
            responseType: 'blob',
            headers: { 
                Authorization: `Token ${localStorage.getItem("token")}`,
                'Content-Type': 'application/csv'
            }
        })
        .then(res => {
            fileDownload(res.data, 'dataset.csv');
            console.log(res.data);
        })
        .catch(err => {
            console.log("error fetching dataset");
        })
        .finally(() => {
            this.setState({ isLoading: false});
        })
    }

    handleChangedataset = () => {
        this.setState({ isLoading: true});
        axios.post(url+"/ml_model/dataset/change/", { dataset: this.state.datasetSelect }, {
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
            }
        })
        .then(res => {
            alert("Changed Successfully!");
            console.log(res)
        })
        .catch(err => {
            console.log("error fetching dataset");
        })
        .finally(() => {
            this.setState({ isLoading: false});
        })
    }

    handleChangeFieldFactor = () => {
        this.setState({ isLoading: true});
        axios.post(url+"/ml_model/dataset/change-factor/", { field: this.state.field, value: parseFloat(this.state.value) }, {
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`,
            }
        })
        .then(res => {
            alert("Changed Successfully!");
            console.log(res)
        })
        .catch(err => {
            console.log("error fetching dataset");
        })
        .finlly(()=> {
            this.setState({ isLoading: false});
        })
    }

    render() {
        return <div>
            {
            this.state.isLoading ?
                (<div class="spinner"><div class="lds-hourglass"></div></div>):
                (<div></div>)
        }
            <h2>Welcome Admin, Lucky YOU</h2>
            <Container>
            <Button variant="info" type="submit" onClick={this.handleCSVDownload} className="m-4" style={{ width: "90%"}}>Download CSV</Button>
            <div className="alert alert-info p-4 text-justify mb-4">
            <h2>Alter Dataset</h2>
            <div class="m-4 form-group">
                <label class="form-label">Change Dataset</label>
                <Form.Control as="select" custom style={{ width: '100%', height: '36px'}} value={this.state.datasetSelect} onChange={(e) => { this.setState({ datasetSelect: e.target.value}) }}>
                <option value="" selected disabled>Please select</option>
                <option value="cleanedDataSet">Clearned Data Set</option>
                <option value="fullDataset">Full Dataset</option>
                <option value="dataset50">dataset50</option>
                <option value="dataset100">dataset100</option>
                <option value="dataset500">dataset500</option>
                <option value="dataset5000">dataset5000</option>
                <option value="dataset10000">dataset10000</option>
                <option value="dataset25000">dataset25000</option>
                <option value="dataset50000">dataset50000</option>
                <option value="dataset100000">dataset100000</option>
                </Form.Control>
            </div>
            <Button variant="info" type="submit" onClick={this.handleChangedataset} className="m-4" style={{ width: "90%"}}>Change Dataset</Button>
            <div class="m-4 form-group">
                <label class="form-label">Change Attribute Factor</label>
                <Form.Control as="select" custom style={{ width: '100%', height: '36px'}} value={this.state.field} onChange={(e) => { this.setState({ field: e.target.value}) }}>
                <option value="" selected disabled>Please select</option>
                <option value="throat_soar">throat soar</option>
                <option value="shortness_of_breath">shortness of breath</option>
                <option value="head_ache">head_ache</option>
                <option value="contacted_positive_person">contacted_positive_person</option>
                </Form.Control>
            </div>
            <Form.Group className="m-4">
                <Form.Label>Value</Form.Label>
                <Form.Control type="number" placeholder="Enter the change factor" onChange={(e) => this.setState({ value: e.target.value})}/>
            </Form.Group>
            <Button variant="info" type="submit" onClick={this.handleChangeFieldFactor} className="m-4" style={{ width: "90%"}}>Change Dataset</Button>
            </div>
            <div className="alert alert-info p-4 text-justify mb-4">
                <h2>Attribute Factors</h2>
                {
                    (this.state.attrFactor) ? Object.entries(this.state.attrFactor).map(([key, value]) => {
                        return (<p>{key} - {value}</p>)
                    }) : null
                }
            </div>
            <ListGroup>
                <Row>
                {
                    this.state.dataset.map(data => {
                        return (
                            <Col md={6} lg={3} sm={12} key={data.pk}>
                            <ListGroup.Item id={data.key} key={data.pk}>
                                <p className="mb-0">id: {data.pk}</p>
                                <p className="mb-0">temperature: {data.fields.temperature}</p>
                                <p className="mb-0">gender: {data.fields.gender}</p>
                                <p className="mb-0">headache: {data.fields.headache}</p>
                                <p className="mb-0">contact_with_positive_person: {data.fields.contact_with_positive_person}</p>
                                <p className="mb-0">cough: {data.fields.cough}</p>
                                <p className="mb-0">shortness_of_breath: {data.fields.shortness_of_breath}</p>
                                <p className="mb-0">spO2: {data.fields.spO2}</p>
                                <p className="mb-0">taste_sensitive: {data.fields.taste_sensitive}</p>
                                <p className="mb-0">bpm: {data.fields.bpm}</p>
                                <p className="mb-0">throat_soar: {data.fields.throat_soar}</p>
                                <p className="mb-0">result: {data.fields.result}</p>
                            </ListGroup.Item>
                            </Col>
                        )
                    })
                }
                </Row>
            </ListGroup>
            </Container>
        </div>
    }
}

export default AdminComp;