import { cilBell } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CToast, CToastBody, CToastHeader } from '@coreui/react';
import React, { useState } from 'react';
import BaseTemplateForm from './BaseTemplateForm';
import BaseTemplateLog from './BaseTemplateLog';

const baseToast = (
    <CToast title="Prueba finalizada" autohide={true}>
      <CToastHeader closeButton>
          <CIcon icon={cilBell} />
          <strong className="me-auto">Prueba finalizada</strong>
          <small>{new Date().toLocaleString()}</small>
      </CToastHeader>
      <CToastBody>Se han terminado todas las actividades.</CToastBody>
    </CToast>
);
const STAGE_INIT = "init";
const STAGE_STAND_BY = "stand_by"
const STAGE_IN_PROGRESS = "in_progress";
const STAGE_FINISHED = "finished";
const STATUS_SUCCeSS = "sucess";
const STATUS_ERROR = "error";
const MAX_OUTPUT_MESSAGES = 20;

const BaseTemplateTest = props => {
    const [log, setLog] = useState([]);
    const { addActivity, addToast, allowMultiple, baseStage, description, endpointToTest, setBaseStage, updateActivities } = props;

    const addLog = node => {  
        setLog((prevState) => {
            let tempLog =  [...prevState];
            if(tempLog.length > MAX_OUTPUT_MESSAGES) {
                tempLog.shift();
            }
            return [{id: Math.floor(Math.random() * 10001), stage: node.stage, message: node.message, date: node.datetime.toLocaleString()}, ...tempLog];
        });
    }

    const userFormSubmitHandler = async (event) => {
        event.preventDefault();
        setBaseStage(STAGE_STAND_BY);
        const formData = new FormData(event.currentTarget);
        var params = {};
        for (let [key, value] of formData.entries()) {
            params[key] = value;
        }
        let qty = (params.qty === undefined || params.qty === null || params.qty > 5)  ? 1 : params.qty;
        for(let count = 0; count < qty; count++) {
            await fetchAPi(params);
        }
        addToast(baseToast);
        setBaseStage(STAGE_FINISHED);
    };

    const fetchAPi = async (params) => {
        try {
            addActivity();
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params)
            };
            const resp = await fetch(endpointToTest, requestOptions);
            const reader= resp.body.getReader();
            setBaseStage(STAGE_IN_PROGRESS);
            while(true){
                const {value, done} = await reader.read();
                var string = new TextDecoder().decode(value);
                if(string.length > 0 && string !== "") {
                    addLog(JSON.parse(string));
                }
                if(done) {
                    updateActivities(STATUS_SUCCeSS);
                    break;
                }
            }
        } catch (error) {
            updateActivities(STATUS_ERROR);
        }
    };

    return (
        <>
            {baseStage === STAGE_INIT && (
                <BaseTemplateForm allowMultiple={allowMultiple} description={description} onSubmit={userFormSubmitHandler} />
            )}
            {(baseStage === STAGE_IN_PROGRESS || baseStage === STAGE_FINISHED) && (
                <BaseTemplateLog log={log} />
            )}
        </>
    )
};

export default BaseTemplateTest;