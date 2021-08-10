import React, {useState} from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarToggler,
    MDBCollapse,
    MDBContainer
  } from 'mdbreact';



function ClassItem(props) {
    console.log(props.children.enrollmentStatus);
    if(typeof props.children === 'undefined'){
        return (<p></p>);
    }
    return (
        <Card>
            <Card.Header>{props.children.classDisplayName}</Card.Header>
            <Card.Body>
                <Card.Title>{props.children.classTitle}</Card.Title>
                <Card.Subtitle>{props.children.instructor}</Card.Subtitle>
                <br></br>
                    <ListGroup horizontal>
                        <ListGroup.Item>Days: {props.children.meetsDays}</ListGroup.Item>
                        <ListGroup.Item>Time: {props.children.meetTimes}</ListGroup.Item>
                    </ListGroup>
                    <br></br>
                    <strong>Instruction Mode: </strong>{props.children.instructionMode}
                    <br></br>
                    <strong>Open Seats: </strong>{props.children.enrollmentStatus.status.description}
                    <MDBContainer>
                        <MDBNavbar color="amber lighten-4" style={{ marginTop: '20px' }} light>
                            <MDBContainer>
                            <MDBNavbarBrand>
                                MDBNavbar
                            </MDBNavbarBrand>
                            </MDBContainer>
                        </MDBNavbar>
                    </MDBContainer>
                    <br></br><br></br>
                    {props.children.description}
                    <br></br>
                    <a href={props.children.url} target="_blank">View Details</a>
            </Card.Body>
        </Card>
    )
}

export default ClassItem