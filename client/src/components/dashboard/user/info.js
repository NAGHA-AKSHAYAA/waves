import React from "react";
import DashboardLayout from "hoc/dashboard.layout";
import { useFormik } from "formik";
import * as Yup from 'yup'
import {errorHelper} from 'utils/tool'
import { useDispatch } from "react-redux";
import { TextField,Button  } from "@mui/material";
import { userUpdateProfile } from "store/actions/users.actions";
import EmailStepper from "./stepper";



const UserInfo = ({users}) => {

    const dispatch = useDispatch()

    const formik =   useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: users.data.firstname,
            lastname: users.data.lastname,
        },
        validationSchema:Yup.object({
            firstname: Yup.string()
            .min(3,'3 char min')
            .max(30,'30 char max')
            .required('Sorry, you need the first name'),
            lastname: Yup.string()
            .min(3,'3 char min')
            .max(30,'30 char max')
            .required('Sorry, you need the first name')
        }),
        onSubmit: (values)=>{
            dispatch(userUpdateProfile(values))
        }
    })

    
    return (
        <DashboardLayout title = "User Information">
            <form className="mt-3 article_form" style={{maxwidth:'250px'}}
            onSubmit={formik.handleSubmit}
            >

                <div className="form-group">
                    <TextField 
                        style={{width:'100%'}}
                        name='firstname'
                        label="Enter you firstname"
                        variant="outlined"
                        {...formik.getFieldProps('firstname')}
                        {...errorHelper(formik, 'firstname')}
                    />
                </div>
                <div className="form-group">
                    <TextField 
                        style={{width:'100%'}}
                        name='lastname'
                        label="Enter you lastname"
                        variant="outlined"
                        {...formik.getFieldProps('lastname')}
                        {...errorHelper(formik, 'lastname')}
                    />
                </div>
                <Button className="mb-3"
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Edit Profile
                </Button>
            </form>
            <hr/>
            <div>
                
                <EmailStepper users = {users}/>
            </div>
        </DashboardLayout>
    )
}

export default UserInfo;