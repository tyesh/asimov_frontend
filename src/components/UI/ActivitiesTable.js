import { CBadge, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React from 'react';

const ActivitiesTable = props => {    
    const { activities } = props;

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
        </>
    )
};

export default ActivitiesTable;