import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:52086/';
//axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';//headers for POST reqs only.
//axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
//axios.defaults.headers['Access-Control-Request-Headers'] = '*';
axios.interceptors.request.use( request => {
    //edit req : add auth headers, etc, log errors
	return request;//ALWAYS return req, otherwise req gets stopped.
}, error => {
	//handle error logic
	return Promise.reject(error);
});

class Repository {

    GetProductsList = (callbackFcn) => {
        axios.get('/api/Products').then( res => {
            callbackFcn(res.data);
        });
    }

    // GetOrderProducts = (callbackFcn) => {
    //     axios.get('/api/Orders').then( res => {            
    //         callbackFcn(res.data);
    //     });
    // }

    GetOrders = (callbackFcn) => {
        axios.get('/api/Orders').then( res => {
            callbackFcn(res.data);
        });
    }

    GetDeliveredOrders = (callbackFcn) => {        
        axios.get('/api/GetDeliveredOrders').then( res => {
            callbackFcn(res.data);
        });
    }

    GetProductsOrderedReport = (callbackFcn) => {
        axios.get('/api/GetProductsOrderedReport').then( res => {
            callbackFcn(res.data);
        });
    }

    PlaceAnOrder = (order) => {
        axios.post('/api/PlaceAnOrder', order).then( res => {
            
        }, error => console.log(error));
    }

    ChangeState = (orderId, setNext, callbackFcn) => {
        const data = {
            orderID: orderId,
            setNext: setNext
        };
        axios.post('/api/ChangeState', data).then( res => {            
            callbackFcn(orderId, res.data);
        });
    }
}

export default Repository;