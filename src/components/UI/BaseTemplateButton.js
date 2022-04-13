import { CButton, CCol, CRow, CSpinner } from '@coreui/react';
import React from 'react';

const ShowButton = props => {
    const { onClick, disabled } = props;

    if(disabled) {
        return (
            <CButton type="button" color="primary" onClick={onClick} disabled={disabled} >
                <CSpinner component="span" size="sm" aria-hidden="true"/>
            </CButton>
        );
    }
    return (
        <CButton type="button" color="primary" onClick={onClick} disabled={disabled} >Volver a realizar prueba</CButton>
    );
};

const BaseTemplateButton = props => {
    const { onClick, disabled } = props;

    return (
        <CRow className="mb-4">
            <CCol xs={12} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <ShowButton onClick={onClick} disabled={disabled} />
            </CCol>
        </CRow>
    )
};

export default BaseTemplateButton;