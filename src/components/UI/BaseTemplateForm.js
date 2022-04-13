import { CCol, CRow } from '@coreui/react';
import React from 'react';
import FormDescription from '../FormDescription';
import UserInfoForm from './UserInfoForm';

const BaseTemplateForm = props => {
    
    const { allowMultiple, description, onSubmit } = props;
    
    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <FormDescription content={description} _href="https://testing.lincolnsoft.com.py/login" />
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <UserInfoForm onSubmit={onSubmit} allowMultiple={allowMultiple} />
                </CCol>
            </CRow>
        </>
    )
}

export default BaseTemplateForm;