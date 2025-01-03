
import axios from "axios";
import * as actions from './index'

export const getAllBrands = ()=> {
    return async(dispatch) => {
        try {
            const brands = await axios.get(`https://waves-theta.vercel.app/api/brands/all`)
            dispatch(actions.getAllBrands(brands.data))
        } catch (error) {
            dispatch(actions.errorGlobal(error.response.data.message))
        }
    }
}