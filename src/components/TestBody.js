import { CBadge, CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormCheck, CFormInput, CFormLabel, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { CChartBar } from '@coreui/react-chartjs';
import React, { useEffect, useState } from 'react';

import FormDescription from 'src/components/FormDescription';

const TestBody = props => {

    const [activities, setActivities] = useState([]);
    const [messagesLog, setMessagesLog] = useState([]);
    const [responseTimeDataset, setResponseTimeDataset] = useState(null);

    const MAX_OUTPUT_ACTIVITIES = 5;
    const MAX_OUTPUT_MESSAGGES = 20;
    const IN_PROGRESS = "in_progress";
    const SUCCeSS = "sucess";
    const ERROR = "error";
    const COLOR_SUCCESS = "success";
    const COLOR_ERROR = "danger";
    const COLOR_WARNING = "warning";
    //const COLOR_INFO = "info";

    const {description, endpointToTest} = props;

    const allowMultiple = props.allowMultiple === undefined ? false : props.allowMultiple;

    const titleColor = title => {
        if(title === "Inicio" || title === "Fin") {
            return "text-success";
        }
        if(title === "Error") {
            return "text-danger";
        }
        return "text-info";
    };

    const addActivity = () => {
        setActivities((prevState) => {
            let tempAct =  [...prevState];
            if(tempAct.length > MAX_OUTPUT_ACTIVITIES) {
                tempAct.shift();
            }
            return [...tempAct, {id: Math.floor(Math.random() * 10001), status: IN_PROGRESS, color: COLOR_WARNING, initDate: new Date()}];
        });
    }

    const updateActivities = (status) => {
        setActivities((prevStae) => {
            let tempAct = [...prevStae];
            let index = tempAct.length - 1;
            if(index !== -1) {
                tempAct[index] = {...tempAct[index], status: status, color: status === SUCCeSS ? COLOR_SUCCESS: COLOR_ERROR, endDate: new Date()};
            }
            return tempAct;
        });
    };

    const addMessage = node => {  
        setMessagesLog((prevState) => {
            let tempLog =  [...prevState];
            if(tempLog.length > MAX_OUTPUT_MESSAGGES) {
                tempLog.shift();
            }
            return [{id: Math.floor(Math.random() * 10001), stage: node.stage, message: node.message, date: node.datetime.toLocaleString()}, ...tempLog];
        });
    }

    const calculaDatetimeDiff = (initDate, endDate) => {
        if(initDate === undefined || endDate === undefined) {
            return 0;
        }
        return parseInt((endDate - initDate) / 1000);
    };

    useEffect(() => {
        let labels = [];
        let data = [];
        activities.forEach(activity => {
            labels.push(activity.id);
            data.push(calculaDatetimeDiff(activity.initDate, activity.endDate));
        });
        setResponseTimeDataset({
            labels: labels,
            datasets: [
                {
                    label: '(segundos)',
                    backgroundColor: '#2980b9',
                    data: data
                }
            ]
        });
    }, [activities]);

    const fetchMyAPI = async (event) => {
        event.preventDefault()
        addActivity();
        try {
            const formData = new FormData(event.currentTarget);
            var params = {};
            for (let [key, value] of formData.entries()) {
                params[key] = value;
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params)
            };
            const resp = await fetch(endpointToTest, requestOptions);
            const reader= resp.body.getReader();            
            //Respuesta streaming
            while(true){
                const {value, done} = await reader.read();
                var string = new TextDecoder().decode(value);
                if(string.length > 0 && string !== "") {
                    let node = JSON.parse(string);
                    addMessage(node);
                }
                if(done) {
                    updateActivities(SUCCeSS);
                    break;
                }
            }
        } catch (error) {
            updateActivities(ERROR);
        };
    };

    const showEndDate = (item) => {
        if(item.endDate === undefined || item.endDate === null) {
            return (<small>-</small>);
        }
        return (
            <small>{item.endDate.toLocaleString()}</small>
        );
    };

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <FormDescription content={description} _href="https://testing.lincolnsoft.com.py/login"></FormDescription>
                </CCol>
                <CCol sm={6}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Inicio de sesión</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CForm onSubmit={fetchMyAPI}>
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
                                        disabled={allowMultiple}
                                    ></CFormInput>
                                </div>
                                <div className="mb-3">
                                    <CButton type="submit" color="primary">Probar</CButton>
                                </div>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol sm={6}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Actividades</strong>
                        </CCardHeader>
                        <CCardBody>
                            {activities.length > 0 && <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead color="light">
                                    <CTableRow>
                                        <CTableHeaderCell>#</CTableHeaderCell>
                                        <CTableHeaderCell>Estado</CTableHeaderCell>
                                        <CTableHeaderCell>Inicio</CTableHeaderCell>
                                        <CTableHeaderCell>Fin</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {activities.map((item) => (
                                        <CTableRow v-for="item in tableItems" key={item.id}>
                                            <CTableDataCell>
                                                <p>{item.id}</p>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <CBadge color={item.color}>{item.status}</CBadge>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>
                                                    <small>{item.initDate.toLocaleString()}</small>
                                                </div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div>
                                                    {showEndDate(item)}
                                                </div>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>}
                            {activities.length === 0 && <p className="text-center">Sin actividad reciente</p>}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>           
            <CRow>
                <CCol sm={6}>
                    <CCard className="mb-4 live-messages-area">
                        <CCardHeader>
                            <strong>Ultimos mensajes</strong>
                        </CCardHeader>
                        <CCardBody>
                            {messagesLog.length > 0 && <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead color="light">
                                    <CTableRow>
                                        <CTableHeaderCell className="col-1">#</CTableHeaderCell>
                                        <CTableHeaderCell className="col-2">Paso</CTableHeaderCell>
                                        <CTableHeaderCell className="col-7">Mensaje</CTableHeaderCell>
                                        <CTableHeaderCell className="col-2">Fecha</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {messagesLog.map((item) => (
                                        <CTableRow v-for="item in tableItems" key={item.id}>
                                            <CTableDataCell>
                                                <p>{item.id}</p>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <p className={titleColor(item.stage)}>{item.stage}</p>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <p className="text-wrap">{item.message}</p>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <small>{item.date}</small>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>}
                            {messagesLog.length === 0 && <p className="text-center">Sin mensajes registrados</p>}
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs={6}>
                    <CCard className="mb-4">
                        <CCardHeader>Tiempo de respuesta</CCardHeader>
                        <CCardBody>
                            <CChartBar
                                data={responseTimeDataset}
                                labels="Actividades"
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            
        </>
    )
}

export default TestBody