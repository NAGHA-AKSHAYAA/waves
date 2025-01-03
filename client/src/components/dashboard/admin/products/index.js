import React, { useEffect, useReducer, useState } from "react";
import DashboardLayout from "hoc/dashboard.layout";
import { useDispatch, useSelector } from "react-redux";
import { productsByPaginate, productsRemove } from "store/actions/products.actions";
import ProductsTable from "./productTable";
import {  useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { errorHelper } from "utils/tool";
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";

const defaultValue = {keywords:'', brand:[], min: 0, max:5000, frets: [], page:1 }

const AdminProduct = (props) => {
    
    const products = useSelector(state => state.products)
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [searchValues, setSearchValues] = useReducer((state, newState) => {
        return { ...state, ...newState };
      }, defaultValue);

    const formik = useFormik({
        initialValues: {keywords: ''},
        validationSchema: Yup.object({
            keywords: Yup.string().min(3, "Min 3 needed").max(200,"too big to search")
        }),
        onSubmit:(values,{resetForm})=>{
            setSearchValues({keywords:values.keywords, page:1})
            resetForm()
        }
    })

    const goToEdit = (id) => {
        navigate(`/dashboard/admin/edit_product/${id}`);
    };

    const gotoPage = (page) => {
        setSearchValues({page: page})
    }

    const [removeModal, setRemoveModal] = useState(false)
    const [toRemove, setToRemove] = useState(null)

    const handleClose = () => {
        setRemoveModal(false)
    }

    const handleModal =(id)=> {
        setToRemove(id)
        setRemoveModal(true)
    }
    
    const handleRemove = () => {
        dispatch(productsRemove(toRemove))
    }

    const resetSearch = () => {
        setSearchValues(defaultValue)
    }

    useEffect(()=>{
        dispatch(productsByPaginate(searchValues))
    },[dispatch,searchValues])

    useEffect(()=>{
        handleClose()
        setRemoveModal(null)
        if(notifications && notifications.removeArticle){
            dispatch(productsByPaginate(searchValues))
        }
    },[notifications, dispatch])
    
    return (
        <DashboardLayout title="Products">
            <div className="products_table">
                <div>
                    <form className="mt-3" onSubmit={formik.handleSubmit}>
                        <TextField
                            style={{width:'100%'}}
                            name="keywords"
                            label="Enter your search" 
                            variant="outlined"
                            {...formik.getFieldProps('keywords')}
                            {...errorHelper(formik, 'keywords')}
                        />
                    </form>
                    <Button onClick={()=> resetSearch()}>
                        Reset Search
                    </Button>
                </div>
                <hr/>
                <ProductsTable
                    prods = {products.byPaginate}
                    prev={(page)=>gotoPage(page)}
                    next={(page)=>gotoPage(page)}
                    goToEdit={(id)=>goToEdit(id)}
                    removeModal={removeModal}
                    handleClose={()=>handleClose()}
                    handleModal={(id)=>handleModal(id)}
                    handleRemove={()=>handleRemove()}
                >

                </ProductsTable>
            </div>
        </DashboardLayout>
    )
}

export default AdminProduct