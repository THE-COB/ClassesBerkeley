import 'bootstrap/dist/css/bootstrap.min.css';
import ClassItem from './ClassItem/ClassItem';
import ClassObject from './ClassItem/ClassObject';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import React, { useState, useEffect, useRef} from 'react';

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
        <Col lg={10} xs={12}>
          {classes.map(item => <><ClassItem>{item}</ClassItem><br></br></>)}
        </Col>
      </Row>
      </>
    </Container>
  );
}

export default App;