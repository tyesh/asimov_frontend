import BaseTemplate from 'src/components/BaseTemplate';

const CreateCreditNoteWithInvoice = () => {
    const description =  `Prueba que se realiza sobre las notas de crédito donde se crea una nueva a partir de una factura. Para empezar la prueba se debe de ingresar el nombre
    y la contraseña del usuario del sistema. La prueba intentera seleccionar una factura de entre las posibles opciones y cargar valores para el concepto, local a donde
    pertenece, local de uso, subtotal, descuento y articulos. Una vez terminado se devolvera el número de comprobante.
    se responderà con el estado.`;    
    const endpointToTest = "http://localhost:8000/voucher/test-create-voucher-credit-invoice";
    return (
        <BaseTemplate
            description={description}
            endpointToTest={endpointToTest}
            allowMultiple={true}
        />
    );
};

export default CreateCreditNoteWithInvoice;