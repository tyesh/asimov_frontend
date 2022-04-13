import { CCol, CRow } from '@coreui/react';
import React from 'react';
import MessagesTable from './MessagesTable';

const BaseTemplateLog = props => {
    const { log } = props;

    return (
        <CRow>
            <CCol xs={12}>
                <MessagesTable messagesLog={log} />
            </CCol>
        </CRow>
    )
};

export default BaseTemplateLog;