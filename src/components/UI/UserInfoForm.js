import { CCard, CCardBody, CCardHeader, CButton, CForm, CFormCheck, CFormInput, CFormLabel } from '@coreui/react';
import React from 'react';

const UserInfoForm = props => {
    const { fetchAPI, allowMultiple } = props;

    return (
        <CCard className="mb-4">
            <CCardHeader>
                <strong>Inicio de sesión</strong>
            </CCardHeader>
            <CCardBody>
                <CForm onSubmit={fetchAPI}>
                    <div className="mb-3">
                        <CFormCheck type="radio" name="enviroment" id="env-local" label="Probar en entorno local" value="local" defaultChecked/>
                        <CFormCheck type="radio" name="enviroment" id="env-testing" label="Probar en entorno de testing" value="testing"/>
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="input-user">Nombre de usuario</CFormLabel>
                        <CFormInput
                            type="text"
                            id="input-user"
                            placeholder="Nombre de usuario"
                            name="user"
                        ></CFormInput>
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="input-password">Contraseña</CFormLabel>
                        <CFormInput
                            type="password"
                            id="input-password"
                            placeholder="Contraseña"
                            name="password"
                        ></CFormInput>
                    </div>
                    <div className="mb-3">
                        <CFormLabel htmlFor="input-qty">Cantidad de pruebas</CFormLabel>
                        <CFormInput
                            type="number"
                            id="input-qty"
                            placeholder="1"
                            name="qty"
                            defaultValue={1}
                            disabled={!allowMultiple}
                        ></CFormInput>
                    </div>
                    <div className="mb-3">
                        <CButton type="submit" color="primary">Probar</CButton>
                    </div>
                </CForm>
            </CCardBody>
        </CCard>
    )
};

export default UserInfoForm;