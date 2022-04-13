import { CToaster } from '@coreui/react';
import React, { useRef } from 'react';

const ToastContainter = props => {
    const { toast, toaster } = props;

    return (
        <CToaster ref={toaster} push={toast} placement="top-end" />
    )
}

const BaseTemplateToast = props => {
    const { toast } = props;
    const toaster = useRef();

    return (
        <ToastContainter toast={toast} toaster={toaster} />
    )
}

export default BaseTemplateToast;