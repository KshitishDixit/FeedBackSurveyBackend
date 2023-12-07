import axios from 'axios'
import { FETCH_USER } from './types'

const fetchUser=()=>async(dispatch)=>{
        const res=await axios.get('/api/current_user')
        dispatch({type:FETCH_USER,payload:res?.data})       

}

const handleToken = (token) => async (dispatch) => {
    try {
        const { email, amount, currency, paymentMethodType } = token;
        const res = await axios.post('/api/stripe', { email, amount, currency, paymentMethodType });
        console.log('res', res.data);
        dispatch({ type: FETCH_USER, payload: res.data });
        return res.data;
    } catch (error) {
        console.error('Error in handleToken:', error);
        
        // Handle error appropriately, e.g., dispatch an error action
    }
};



export{
    fetchUser,
    handleToken
}