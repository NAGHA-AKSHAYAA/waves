import axios from "axios";
import * as actions from './index'
import { getAuthHeader } from "utils/tool";
export const productsBySort = ({sortBy,limit,order,where}) => {
    return async(dispatch)=>{
        try {
            const products = await axios.get('https://waves-theta.vercel.app/api/product/all', {
                params: {
                    limit,
                    sortBy,
                    order
                }
            });
            console.log(products);

            switch(where){
                case 'bySold':
                    dispatch(actions.productsBySold(products.data))
                break;
                case 'byDate':
                    dispatch(actions.productsByDate(products.data))
                break
                default:
                    return false
            }
            dispatch(actions.productsBySold(products.data))
            dispatch(actions.productsByDate(products.data))
        } catch (error) {
            console.log("something broke");
            
            dispatch(actions.errorGlobal("Sorry something broke"))
        }
    }
}

export const productsByPaginate = (args) => {
    return async (dispatch) => {
        try {
            console.log(args);
            
            const products = await axios.post(`https://waves-theta.vercel.app/api/product/paginate/all`, args)
            dispatch(actions.productsByPaginate(products.data))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productsRemove = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`https://waves-theta.vercel.app/api/product/product/${id}`, getAuthHeader())
            dispatch(actions.productRemove)
            dispatch(actions.successGlobal())
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productAdd = (data) => {
    return async (dispatch) => {
        try {
            const product = await axios.post(`https://waves-theta.vercel.app/api/product/`, data, getAuthHeader())
            dispatch(actions.productAdd(product))
            dispatch(actions.successGlobal())
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productById = (id) => {
    return async (dispatch) => {
        try {
            const product = await axios.get(`https://waves-theta.vercel.app/api/product/product/${id}`)
            dispatch(actions.productsById(product))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}

export const productEdit = (values, id) => {
    return async (dispatch) => {
        try {
            const product = await axios.patch(`https://waves-theta.vercel.app/api/product/product/${id}`, values, getAuthHeader())
            dispatch(actions.successGlobal('Update Successful'))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}