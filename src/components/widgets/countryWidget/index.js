import React, {useState} from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import { v4 as uuid4 } from "uuid";

// Bootstrap
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup'


function CountryWidget() {
    const location = useLocation();
    const navigate = useNavigate();
    const {data} = location.state;
    const [state, setState]= useState({open: false, data: {}});

    const handleShow= (data)=> {         
        setState({...state, open: true, data: data});
    }

    const handleClose= ()=> {
        setState({...state, open: false, data: {}});
    }

    const handleRedirection = ()=> {
        navigate("/");
    }

    

    return (
        <React.Fragment>
            {/* Modal  */}
            <Modal show={state.open} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {state?.open === true?
                            state?.data?.Brand: 'Nothing to show'
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {state?.open === false?
                        'Nothing to display'
                        :
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Country</Col>
                                    <Col>{state?.data?.Country}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Stars</Col>
                                    <Col>
                                        {Number.isInteger(state?.data?.Stars)=== true?
                                            state?.data?.Stars: 0
                                        }
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Style</Col>
                                    <Col>{state?.data?.Style}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Top Ten</Col>
                                    <Col>{state?.data['Top Ten']}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    }
                    <div className='text-muted d-flex align-items-center justify-content-center mt-2'>
                        {state?.open === true? state?.data?.Variety: 'Nothing to show'}
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="w-100 mb-4">
                <Button 
                    variant='info'
                    onClick={handleRedirection}
                    className='ml-auto'
                >
                    Go back
                </Button>
            </div>
            

            <Alert variant="info">
                <Alert.Heading>{data?.key}</Alert.Heading>                
                <hr />
                <p className="mb-0">
                    Click to view details
                </p>
            </Alert>

            <Container fluid className='mt-4'>
                <Row>
                    {data?.value.map((element)=> {
                        return(
                            <Col
                                key={uuid4()}
                                xs={12}
                                sm={6}
                                md={4}
                                lg={3}
                                className='p-4'
                            >
                                <Card >
                                    <Card.Body>
                                        <Card.Title>
                                            {element?.Brand}
                                        </Card.Title>
                                        <Card.Text>
                                            Stars
                                            <Badge 
                                                bg="info"
                                                pill={true}
                                            > 
                                                {Number.isInteger(element?.Stars)=== true?
                                                    element?.Stars: 0
                                                }
                                            </Badge>
                                        </Card.Text>                                            
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button 
                                            variant="primary" 
                                            onClick={()=>handleShow(element)}
                                        >
                                            View {element?.Brand}
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>                                
                        )
                    })}
                </Row>
            </Container> 
        </React.Fragment>
    )
}

export default CountryWidget;