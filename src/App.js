import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-drawer/lib/style.css';
import ClassItem from './ClassItem/ClassItem';
import ClassObject from './ClassItem/ClassObject';
import {
  Row,
  Col,
  Container,
  InputGroup,
  FormControl,
  Button,
  Form,
  Collapse,
} from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect, useRef} from 'react';
import { Drawer, } from 'react-bootstrap-drawer';

const ApplicationDrawer = (props) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
      <Drawer { ...props }>
          <Drawer.Toggle onClick={ handleToggle } />

          <Collapse in={ open }>
              <Drawer.Overflow>
                  <Drawer.ToC>
                      <Form>
                        <Drawer.Header>Breath Requirements</Drawer.Header>
                        <Form.Group className="mb-3">
                          <Form.Check type="checkbox" label="Arts & Literature" />
                          <Form.Check type="checkbox" label="Physical Science" />
                          <Form.Check type="checkbox" label="Social & Behavioral Sciences" />
                          <Form.Check type="checkbox" label="Historical Studies" />
                          <Form.Check type="checkbox" label="Biological Science" />
                          <Form.Check type="checkbox" label="Philosophy & Values" />
                          <Form.Check type="checkbox" label="Historical Studies" />
                        </Form.Group>
                      </Form>
                  </Drawer.ToC>
              </Drawer.Overflow>
          </Collapse>
      </Drawer>
  );
};

function createClass(searchResult){
  return new ClassObject(JSON.parse(searchResult.children[0].getAttribute('data-json')));
}

function App() {
  const [classes, setClasses] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if(isLoading) {
      let baseUrl = '/search/class/' + searchRef.current.value;
      axios.get(baseUrl, {
        params: {
          "f[0]": "im_field_term_name:2208"
        }
      }).then(function (response) {
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(response.data, "text/html");
        let allResults = htmlDoc.getElementsByClassName('search-result');
        let allClasses = []
        for(let element of allResults){
          allClasses.push(createClass(element));
        }
        setClasses(allClasses);
      });
    }
  }, [isLoading]);

  useEffect(() => {
    setLoading(false);
  }, [classes]);

  const handleClick = () => setLoading(true);
  return (
    <Container fluid="md" >
      <>
      <br></br>
      <Row>
        
        <Col xs={9} sm={9} md={6} lg={6}>
          <InputGroup size="sm" className="mb-3">
            <>
            <InputGroup.Text id="searchInput" >Search...</InputGroup.Text>
            <FormControl aria-label="Small" ref={searchRef} aria-describedby="searchInput" />
            <Button variant="outline-secondary" id="button-addon1" disabled={isLoading} onClick={!isLoading ? handleClick : null}>
              {!isLoading ? 'Submit' : 'Loading...'}
            </Button>
            </>
          </InputGroup>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col as={ ApplicationDrawer } xs={ 12 } md={ 3 } lg={ 2 } />
        {/* <Col xs={1} lg={2}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Arts & Literature" />
              <Form.Check type="checkbox" label="Physical Science" />
              <Form.Check type="checkbox" label="Social & Behavioral Sciences" />
              <Form.Check type="checkbox" label="Historical Studies" />
              <Form.Check type="checkbox" label="Biological Science" />
              <Form.Check type="checkbox" label="Philosophy & Values" />
              <Form.Check type="checkbox" label="Historical Studies" />
            </Form.Group>
          </Form>
        </Col> */}
        <Col lg={10} xs={11}>
          {classes.map(item => <ClassItem key={item.id} item={item} />)}
        </Col>
      </Row>
      </>
    </Container>
  );
}

export default App;