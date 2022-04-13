import { CCol, CRow, CSpinner } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import BasetemplateActivities from './UI/BasetemplateActivities';
import BaseTemplateButton from './UI/BaseTemplateButton';
import BaseTemplateTest from './UI/BaseTemplateTest';
import BaseTemplateToast from './UI/BaseTemplateToast';

const MAX_OUTPUT_ACTIVITIES = 5;
const STATUS_IN_PROGRESS = "in_progress";
const STATUS_SUCCeSS = "sucess";
const STAGE_INIT = "init";
const STAGE_STAND_BY = "stand_by"
const STAGE_IN_PROGRESS = "in_progress";
const STAGE_FINISHED = "finished";
const COLOR_SUCCESS = "success";
const COLOR_ERROR = "danger";
const COLOR_WARNING = "warning";
//const COLOR_INFO = "info";

const BaseTemplate = props => {
    const [activities, setActivities] = useState([]);
    const [responseTimeDataset, setResponseTimeDataset] = useState(null);
    const [baseStage, setBaseStage] = useState(STAGE_INIT);
    const [toast, addToast] = useState(0);

    const {description, endpointToTest} = props;

    const allowMultiple = props.allowMultiple === undefined ? false : props.allowMultiple;

    const addActivity = () => {
        setActivities((prevState) => {
            let tempAct =  [...prevState];
            if(tempAct.length > MAX_OUTPUT_ACTIVITIES) {
                tempAct.shift();
            }
            return [...tempAct, {id: Math.floor(Math.random() * 10001), status: STATUS_IN_PROGRESS, color: COLOR_WARNING, initDate: new Date()}];
        });
    };

    const updateActivities = (status) => {
        setActivities((prevStae) => {
            let tempAct = [...prevStae];
            let index = tempAct.length - 1;
            if(index !== -1) {
                tempAct[index] = {...tempAct[index], status: status, color: status === STATUS_SUCCeSS ? COLOR_SUCCESS: COLOR_ERROR, endDate: new Date()};
            }
            return tempAct;
        });
    };

    const calculaDatetimeDiff = (initDate, endDate) => {
        if(initDate === undefined || endDate === undefined) {
            return 0;
        }
        return parseInt((endDate - initDate) / 1000);
    };

    const resetForm = () => {
        setBaseStage(STAGE_INIT);
        setActivities([]);
        setResponseTimeDataset(null);
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

    return (
        <>
            {(baseStage === STAGE_IN_PROGRESS || baseStage === STAGE_FINISHED) && (
                <>
                    <BaseTemplateButton onClick={resetForm} disabled={(baseStage === STAGE_IN_PROGRESS)} />
                    <BasetemplateActivities activities={activities} responseTimeDataset={responseTimeDataset} />
                </>
            )}
            <BaseTemplateToast toast={toast} />
            <BaseTemplateTest
                addActivity={addActivity}
                addToast={addToast}
                allowMultiple={allowMultiple}
                baseStage={baseStage}
                description={description}
                endpointToTest={endpointToTest}
                setBaseStage={setBaseStage}
                updateActivities={updateActivities}
            />
            {baseStage === STAGE_STAND_BY && (
                <CRow>
                    <CCol xs={12}>
                        <div style={{height: 300}}>
                            <div style={{display: "flex", alignItems: "center", height: "100%"}}>
                                <CSpinner style={{margin: "0 auto", display: "block"}} variant="grow"/>
                            </div>
                        </div>
                    </CCol>
                </CRow>
            )}
        </>
    )
}

export default BaseTemplate;