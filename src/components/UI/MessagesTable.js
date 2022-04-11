import { CCard, CCardBody, CCardHeader, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React from 'react';

const MessagesTable = props => {
    const { messagesLog } = props;

    const titleColor = title => {
        if(title === "Inicio" || title === "Fin") {
            return "text-success";
        }
        if(title === "Error") {
            return "text-danger";
        }
        return "text-info";
    };

    return (
        <>
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
        </>
    )
};

export default MessagesTable;