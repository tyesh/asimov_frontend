import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { CChartBar } from '@coreui/react-chartjs';
import React from 'react';
import ActivitiesTable from './ActivitiesTable';

const BasetemplateActivities = props => {
    const { activities, responseTimeDataset } = props;

    return (
        <CRow>
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
        </CRow>
    )
};

export default BasetemplateActivities;