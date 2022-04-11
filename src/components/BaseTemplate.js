import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner } from '@coreui/react';
import { CChartBar } from '@coreui/react-chartjs';
import React, { useEffect, useState } from 'react';

import FormDescription from 'src/components/FormDescription';
import ActivitiesTable from './UI/ActivitiesTable';
import MessagesTable from './UI/MessagesTable';
import UserInfoForm from './UI/UserInfoForm';

const BaseTemplate = props => {

    const [activities, setActivities] = useState([]);
    const [messagesLog, setMessagesLog] = useState([]);
    const [responseTimeDataset, setResponseTimeDataset] = useState(null);
    const [showUserInfoForm, setShowUserInfoForm] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showResume, setShowResume] = useState(false);

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

    const resetForm = () => {
        setShowResume(false);
        setShowUserInfoForm(true);
    };

    useEffect(() => {
        if(activities !== undefined && activities !== null) {
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
        }
    }, [activities]);

    const fetchAPI = async (event) => {
        event.preventDefault();
        setShowUserInfoForm(false);
        setShowSpinner(true);
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
            //Respuesta streaming
            const reader= resp.body.getReader();
            setShowSpinner(false);
            setShowResume(true);
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

    return (
        <>
            <CRow>
                <CCol xs={12}>
                    <FormDescription content={description} _href="https://testing.lincolnsoft.com.py/login"></FormDescription>
                </CCol>
            </CRow>
            <CRow>
                {showUserInfoForm && <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Inicio de sesión</strong>
                        </CCardHeader>
                        <CCardBody>
                            <UserInfoForm fetchAPI={fetchAPI} allowMultiple={allowMultiple} />
                        </CCardBody>
                    </CCard>
                </CCol>}
                {showSpinner && <CCol xs={12}>
                    <div style={{height: 300}}>
                        <div style={{display: "flex", alignItems: "center", height: "100%"}}>
                            <CSpinner style={{margin: "0 auto", display: "block"}} variant="grow"/>
                        </div>
                    </div>
                </CCol>}
            </CRow>
            {showResume &&<CRow>
                <CCol xs={6}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Actividades</strong>
                        </CCardHeader>
                        <CCardBody>
                            <ActivitiesTable activities={activities} />
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
                <CCol xs={12}>
                    <CCard className="mb-4 live-messages-area">
                        <CCardHeader>
                            <strong>Ultimos mensajes</strong>
                        </CCardHeader>
                        <CCardBody>
                            <MessagesTable messagesLog={messagesLog} />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol xs={12}>
                    <CButton type="button" color="primary" onClick={resetForm} >Volver</CButton>
                </CCol>
            </CRow>}
        </>
    )
}

export default BaseTemplate;