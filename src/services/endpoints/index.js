import { Observable, BehaviorSubject } from 'rxjs';
import config from '../../constants/config.json';

const loaderObservable = new BehaviorSubject(false);

export const fetchCall = (
    method = config.requestMethod.GET,
    data = {}, 
    header = {},
    isFormData = false,
) => {

    // Options
    let options = {
        method: method,
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    };
    // Checking if call is a GET call to add body
    if(method !== config.requestMethod.GET) {
        options = {
            ...options, 
            body: isFormData=== true? data: JSON.stringify(data),
        };
        
    }

    if (isFormData=== true) {
        delete options.headers["Content-Type"];
        console.log(options.body);
    }

    return Observable.create((observer)=> {
        try {
            loaderObservable.next(true);
            const finalUrl = config.server.base_url;
            fetch(finalUrl, options)
                .then((res)=> {
                    if(
                        res.headers.get("Content-Type") &&
                        res.headers.get("Content-Type")?.includes("application/json") 
                    ) {
                        try {
                            return res.json();
                        }catch(samp) {
                            console.log(samp);
                        }
                    }else {
                        return res.blob();
                    }
                })
                .then((body)=> {
                    loaderObservable.next(false);
                    observer.next(body);
                    observer.complete();
                    // TODO status code
                })
                .catch((err)=> {
                    observer.error(err);
                    loaderObservable.next(false);
                });
        } catch(error) {
            loaderObservable.error(false);
            observer.error(error);
        }        
    });
};