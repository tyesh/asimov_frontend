import BaseTemplate from 'src/components/BaseTemplate';

const PrintNote = () => {
    const description =  `Prueba para confirmar e imprimir un comprobante con el estado borrador listado en la grilla de comprobantes. Al darle imprimir,
    se dejará el número fiscal por defecto y luego se confirma la nota.`;    
    const endpointToTest = "http://localhost:8000/voucher/test-print-voucher";
    return (
        <BaseTemplate
            description={description}
            endpointToTest={endpointToTest}
            allowMultiple={true}
        />
    );
};

export default PrintNote;