import { fetchCall } from '../endpoints';
import config from '../../constants/config.json';

const populateList = ()=> 
    fetchCall(
        config.requestMethod.GET,
        {},
        {},
        false,
    );

export {
    populateList,
};