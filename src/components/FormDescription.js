import React from 'react';
import { CCallout, CLink } from '@coreui/react';

const FormDescription = props => {

    const {content, _href} = props;
    
    return (
        <CCallout color="info" className="bg-white">
            {content}
            <br />
            <br />
            Enlace desde donde se realiza la prueba{' '}
            <CLink href={_href} target="_blank">
                {_href}
            </CLink>
            .
        </CCallout>
    )
}

export default FormDescription