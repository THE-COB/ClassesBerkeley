import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-bootstrap-drawer/lib/style.css';
import './App.css';
import ClassItem from './ClassItem/ClassItem';
import ClassObject from './ClassItem/ClassObject';
import {
  Row,
  Col,
  Container,
  InputGroup,
  FormControl,
  Button,
} from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect, useRef} from 'react';
import ApplicationDrawer from './ApplicationDrawer/ApplicationDrawer';

function createClass(searchResult){
  return new ClassObject(JSON.parse(searchResult.children[0].getAttribute('data-json')));
}

function App() {
  const [classes, setClasses] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const [pageNum, setPageNum] = useState(0);
  const [triedSearching, setTriedSearching] = useState('Try searching something!');
  
  const [breadthFilters, setBreathFilters] = useState([]);
  const [genReqFilters, setGenReqFilters] = useState([]);
  const [openSeatsFilter, setOpenSeatsFilter] = useState(false);


  useEffect(() => {
    if(isLoading) {
      setTriedSearching('Searching...');
      let baseUrl = '/search/class/' + searchRef.current.value;
      let payloadNum = 1;
      let paramObj = {
        'page': pageNum,
        "f[0]": "im_field_term_name:2208"
      };
      breadthFilters.forEach((filter, index) => {
        paramObj["f[" + payloadNum + "]"] = "sm_breadth_reqirement:"+filter;
        payloadNum++;
      });
      genReqFilters.forEach((filter, index) => {
        paramObj["f[" + payloadNum + "]"] = "sm_general_requirement:"+filter;
        payloadNum++;
      });
      if(openSeatsFilter) {
        paramObj["f[" + payloadNum + "]"] = "ts_open_seats:open";
        payloadNum++;
      }
      axios.get(baseUrl, {
        params: paramObj
      }).then(function (response) {
        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(response.data, "text/html");
        let allResults = htmlDoc.getElementsByClassName('search-result');
        let allClasses = []
        for(let element of allResults){
          allClasses.push(createClass(element));
        }
        setClasses(allClasses);
        if(allClasses.length === 0){
          setTriedSearching('Go outside lmao');
        }
      });
    }
  }, [isLoading]);

  useEffect(() => {
    setLoading(false);
  }, [classes]);

  const handlePageChange = (pageChange) => {
    let newPage = pageNum+pageChange;
    if(newPage >= 0){
      setPageNum(newPage);
      setLoading(true);
    }
  }

  const handleClick = () => {
     setLoading(true);
     setPageNum(0);
  }
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
        <Col xs={ 12 } md={ 3 } lg={ 2 }>
          <ApplicationDrawer getters={{
            breadths: breadthFilters,
            genReqs: genReqFilters,
            openSeats: openSeatsFilter
          }} 
          setters={{
            breadths: setBreathFilters,
            genReqs: setGenReqFilters,
            openSeats: setOpenSeatsFilter
          }} />
        </Col>
        
        <Col lg={10} xs={11}>
          {classes.length > 0 ? classes.map(item => <ClassItem key={item.id} item={item} />) : <p>{triedSearching}</p>}
          {(classes.length > 0 || triedSearching === 'Go outside lmao') && <Button className="pageChange" onClick={() => handlePageChange(-1)} variant="light"><i className="bi bi-arrow-left arrowIcon"></i></Button>}
          {classes.length > 0 && <p id="pageNum">{pageNum}</p>}
          {classes.length > 0 && <Button className="pageChange" onClick={() => handlePageChange(1)} variant="light"><i className="bi bi-arrow-right arrowIcon"></i></Button>}
        </Col>
      </Row>
      <br></br>
      
      </>
    </Container>
  );
}

export default App;