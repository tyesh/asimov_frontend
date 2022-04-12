import { cilBell } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CSpinner, CToast, CToastBody, CToaster, CToastHeader } from '@coreui/react';
import { CChartBar } from '@coreui/react-chartjs';
import React, { useEffect, useRef, useState } from 'react';

import FormDescription from 'src/components/FormDescription';
import ActivitiesTable from './UI/ActivitiesTable';
import MessagesTable from './UI/MessagesTable';
import UserInfoForm from './UI/UserInfoForm';

const resumeToast = (
    <CToast title="Prueba finalizada" autohide={true}>
      <CToastHeader closeButton>
          <CIcon icon={cilBell} />
          <strong className="me-auto">Prueba finalizada</strong>
          <small>{new Date().toLocaleString()}</small>
      </CToastHeader>
      <CToastBody>Se han terminado todas las actividades..</CToastBody>
    </CToast>
)

const ToastContainter = props => {
    const { toast, toaster } = props;

    return (
        <CToaster ref={toaster} push={toast} placement="top-end" />
    )
}

const BaseTemplate = props => {
    const [activities, setActivities] = useState([]);
    const [messagesLog, setMessagesLog] = useState([]);
    const [responseTimeDataset, setResponseTimeDataset] = useState(null);
    const [showUserInfoForm, setShowUserInfoForm] = useState(true);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showResume, setShowResume] = useState(false);
    const [showRestart, setShowrestart] = useState(false);
    const [toast, addToast] = useState(0)
    const toaster = useRef()  

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
    }

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
    }

    const resetForm = () => {
        setShowrestart(false);
        setShowResume(false);
        setShowUserInfoForm(true);
    }

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

    const userFormSubmitHandler = async (event) => {
        event.preventDefault();
        setShowUserInfoForm(false);
        setShowSpinner(true);
        const formData = new FormData(event.currentTarget);
        var params = {};
        for (let [key, value] of formData.entries()) {
            params[key] = value;
        }
        let qty = (params.qty === undefined || params.qty === null || params.qty > 5)  ? 1 : params.qty;
        for(let count = 0; count < qty; count++) {
            await fetchAPi(params);
        }
        setShowrestart(true);
        addToast(resumeToast);
    }

    const fetchAPi = async (params) => {
        try {
            addActivity();
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
        }
    }

    return (
        <>
            <ToastContainter toast={toast} toaster={toaster} />
            <CRow>
                <CCol xs={12}>
                    <FormDescription content={description} _href="https://testing.lincolnsoft.com.py/login"></FormDescription>
                </CCol>
            </CRow>
            <CRow>
                {showUserInfoForm && <CCol xs={12}>
                    <UserInfoForm onSubmit={userFormSubmitHandler} allowMultiple={allowMultiple} />
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
                <CCol xs={12} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <CButton type="button" color="primary" onClick={resetForm} disabled={!showRestart} >Volver a realizar prueba</CButton>
                </CCol>
                <CCol xs={6}>
                    <ActivitiesTable activities={activities} />
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
            </CRow>}
            {showResume && <CRow>
                <CCol xs={12}>
                    <MessagesTable messagesLog={messagesLog} />
                </CCol>
            </CRow>}
        </>
    )
}

export default BaseTemplate;