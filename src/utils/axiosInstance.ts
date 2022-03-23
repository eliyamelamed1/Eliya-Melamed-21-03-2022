import axios from 'axios';
import { setLoading } from '../redux/slices/loadingSlice';
import { toast } from 'react-toastify';

let store: any;

export const injectStore = (_store: any) => {
    store = _store;
};

export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        store.dispatch(setLoading(true));

        return Promise.resolve(config);
    },
    (err) => {
        store.dispatch(setLoading(false));
        console.log(err);

        return Promise.reject(err);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        store.dispatch(setLoading(false));

        return Promise.resolve(response);
    },
    (err) => {
        store.dispatch(setLoading(false));

        try {
            const msg = err.Message;
            toast.error(msg);
        } catch {
            toast.error('Something went wrong please try again later');
        }

        return Promise.reject(err);
    }
);
