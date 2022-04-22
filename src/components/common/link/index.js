import React from "react";
import { useNavigate   } from "react-router-dom";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

function LinkComponent(props) {
    console.log(props.data);
    const navigate = useNavigate();
    
    const handleRedirection = ()=> {
        navigate(
            props?.route, 
            { state: {data: props?.data } }
        );
    }

    return (
        <Button 
            onClick = {handleRedirection}
        >
            View {props?.data?.key}
        </Button>
    )
}

LinkComponent.propTypes= {
    route: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired
}

LinkComponent.defaultProps = {
    route: "",
    data: {}
}

export default LinkComponent;