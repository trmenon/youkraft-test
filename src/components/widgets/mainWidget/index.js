import React, { Component} from "react";
// import { Thumbnail, DynamicNavigator } from '../../../common';
// import config from '../../../../constants/config.json';

// Bootstrap
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';

// Services imports
import { populateList } from '../../../services';

// component Importrs
import { LinkComponent} from '../../common';

class MainWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
          list: [],
          selectedCountry: {}
        };
    }

    componentDidMount() {        
        this.runPrelims();
    }

    componentDidUpdate() {
        console.log("Component updated");
        console.log(this.state);
    }

    runPrelims = ()=> {
        try {
            populateList().subscribe({
                next: (response)=> {
                    if(response &&  Array.isArray(response)) {
                        let sortedByCountry = [];
                        response.forEach((element)=> {
                            let index = sortedByCountry.findIndex((item)=> item.key === element.Country);
                            if(index < 0) {
                                sortedByCountry.push({
                                    key: element.Country,
                                    value: [element]
                                })
                            }else {
                                sortedByCountry.splice(
                                    index,
                                    1,
                                    {
                                        ...sortedByCountry[index],
                                        value: [
                                            ...sortedByCountry[index].value,
                                            element
                                        ]
                                    }
                                )
                            }
                        })
                        this.setState({...this.state, list: sortedByCountry});
                    }
                },
                error: (error)=> {
                    console.log(error);
                }
            })
        }catch(error){
            console.log(error);
        }
    }

    handleButtonClick= (data) => {
        this.setState({...this.state, selectedCountry: data});
    }

    render() {
        return(
            <React.Fragment>  
                <Alert variant="info">
                    <Alert.Heading>Welcome to Noodles UI</Alert.Heading>                
                    <hr />
                    <p className="mb-0">
                        Click on the country to view products
                    </p>
                </Alert>
                <Container fluid className='mt-4'>
                    <Row>
                        {this.state.list.map((element)=> {
                            return(
                                <Col
                                    key={element.key}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    className='p-4'
                                >
                                    <Card >
                                        <Card.Body>
                                            <Card.Title>
                                                {element?.key}
                                            </Card.Title>
                                            <Card.Text>
                                                Products
                                                <Badge 
                                                    bg="info"
                                                    pill={true}
                                                > 
                                                    {element?.value.length}
                                                </Badge>
                                            </Card.Text>                                            
                                        </Card.Body>
                                        <Card.Footer>
                                            <LinkComponent 
                                                route={element?.key}
                                                data={element}
                                            />
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
}

export default MainWidget;