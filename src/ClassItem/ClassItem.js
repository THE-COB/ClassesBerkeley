import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ClassItem.css';

function ClassItem(props) {
    if(typeof props.item === 'undefined'){
        return (<p></p>);
    }
    console.log(props.item.data.meetings);
    return (
        <>
        <Card>
            <Card.Header>{props.item.classDisplayName}</Card.Header>
            <Card.Body>
                <Card.Title>{props.item.classTitle}</Card.Title>
                <Card.Subtitle>{props.item.instructor}</Card.Subtitle>
                <br></br>
                    <ListGroup horizontal>
                        <ListGroup.Item>Days: {props.item.meetsDays}</ListGroup.Item>
                        <ListGroup.Item>Time: {props.item.meetTimes}</ListGroup.Item>
                    </ListGroup>
                    <br></br>
                    <strong>Instruction Mode: </strong>{props.item.instructionMode}
                    <br></br>
                    <Accordion flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header><strong>Open Seats:{'\u00A0'}</strong>{props.item.enrollmentStatus.status.description === 'Open' ? props.item.enrollmentStatus.maxEnroll-props.item.enrollmentStatus.enrolledCount : 'Closed'}</Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                <li>Enrolled Count: {props.item.enrollmentStatus.enrolledCount+' / '+props.item.enrollmentStatus.maxEnroll}</li>
                                <li>Waitlisted: {props.item.enrollmentStatus.waitlistedCount+' / '+props.item.enrollmentStatus.maxWaitlist}</li>
                                <li>Reserved Seats Open: {props.item.enrollmentStatus.openReserved+' / '+props.item.enrollmentStatus.reservedCount}</li>
                                <li>
                                <ul>
                                    {typeof props.item.enrollmentStatus.seatReservations !== 'undefined' && 
                                    props.item.enrollmentStatus.seatReservations.map((reserve, index) => {
                                        let numOpen = reserve.maxEnroll-reserve.enrolledCount+'/'+reserve.maxEnroll;
                                        return <li className="sublist" key={index}><tt>{'\u00A0'.repeat(8-numOpen.length)+numOpen}</tt>{': '+reserve.requirementGroup.description.replace('College of Letters & Sciences', 'L&S')}</li>
                                    })}
                                </ul>
                                </li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                    </Accordion>
                    <div id="showMore">
                        <p id="classDescription">{props.item.description}</p>
                        {window.innerWidth <= 600 && <button id="showMoreP">Show More</button>}
                    </div>

                    <a id="viewDetails" href={props.item.url} target="_blank" rel="noreferrer">View Details</a>
            </Card.Body>
        </Card>
        <br></br>
        </>
    )
}

export default ClassItem