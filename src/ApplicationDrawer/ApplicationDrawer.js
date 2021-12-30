import React, { useState} from 'react';
import {Form, Collapse, Accordion} from 'react-bootstrap';
import { Drawer, } from 'react-bootstrap-drawer';
import './ApplicationDrawer.css';

function ApplicationDrawer(props){
  
    const [open, setOpen] = useState(false);
  
    const allBreaths = [
      'Arts & Literature',
      'Physical Science',
      'Social & Behavioral Sciences',
      'Historical Studies',
      'Biological Science',
      'Philosophy & Values',
      'International Studies'
    ];

    const allGenReqs = [
        '1st Half of Reading & Composition',
        '2nd Half of Reading & Composition',
        'American Cultures',
        'American History',
        'American Institutions',
        'Entry Level Writing Requirement'
    ];

    const allSemesters = [
      'Fall 20',
      'Spring 21',
      'Fall 21',
      'Spring 22',
      'Summer 22'
    ]
  
    const handleToggle = () => setOpen(!open);
    
    return (
        <Drawer>
            <Drawer.Toggle onClick={ handleToggle } />
  
            <Collapse in={ open }>
                <Drawer.Overflow>
                    <Drawer.ToC>
                        <Form>
                        <Accordion flush>
                          <Accordion.Header className="filterHeader"><Drawer.Header>Semester {'\u00A0'.repeat(22)}</Drawer.Header></Accordion.Header>
                          <Accordion.Body>
                          <Form.Group className="mb-3">
                            {allSemesters.map(breadth => (
                              <Form.Check checked={ props.getters.semesters===breadth && "true" } key={breadth} type="radio" label={breadth} onChange={(e) => {
                                if (e.target.checked) {
                                  props.setters.semesters(breadth);
                                } else {
                                  //props.setters.semesters(props.getters.semesters.filter(breadthFilter => breadthFilter !== breadth));
                                }
                              }}/>
                            ))}
                          </Form.Group>
                          </Accordion.Body>
                        </Accordion>
                        </Form>
                        <Form>
                        <Accordion flush>
                          <Accordion.Header className="filterHeader"><Drawer.Header>General Requirements</Drawer.Header></Accordion.Header>
                          <Accordion.Body>
                          <Form.Group className="mb-3">
                            {allGenReqs.map(breadth => (
                              <Form.Check key={breadth} type="checkbox" label={breadth} onChange={(e) => {
                                if (e.target.checked) {
                                  props.setters.genReqs(props.getters.genReqs.concat(breadth));
                                } else {
                                  props.setters.genReqs(props.getters.genReqs.filter(breadthFilter => breadthFilter !== breadth));
                                }
                              }}/>
                            ))}
                          </Form.Group>
                          </Accordion.Body>
                        </Accordion>
                        </Form>
                        <Form>
                          <Accordion flush>
                          <Accordion.Header className="filterHeader"><Drawer.Header>Breadth Requirements</Drawer.Header></Accordion.Header>
                          <Accordion.Body>
                          <Form.Group className="mb-3">
                            {allBreaths.map(breadth => (
                              <Form.Check key={breadth} type="checkbox" label={breadth} onChange={(e) => {
                                if (e.target.checked) {
                                  props.setters.breadths(props.getters.breadths.concat(breadth));
                                } else {
                                  props.setters.breadths(props.getters.breadths.filter(breadthFilter => breadthFilter !== breadth));
                                }
                              }}/>
                            ))}
                          </Form.Group>
                          </Accordion.Body>
                          </Accordion>
                        </Form>

                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Check type="checkbox" label="Open Seats" onChange={(e) => {
                                    if (e.target.checked) {
                                        props.setters.openSeats(true);
                                    } else {
                                        props.setters.openSeats(false);
                                    }
                                }}/>
                            </Form.Group>
                        </Form>
                        
                    </Drawer.ToC>
                </Drawer.Overflow>
            </Collapse>
        </Drawer>
    );
  }

  export default ApplicationDrawer;