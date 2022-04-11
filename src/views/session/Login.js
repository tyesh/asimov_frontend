import BaseTemplate from "src/components/BaseTemplate";

const Login = () => {

    const description =  `Prueba que se realiza sobre la función de inicio de sesión. Para empezar la prueba se debe de ingresar el nombre
    y la contraseña del usuario del sistema. Una vez finalizada se devolverá el token de sesión o en caso de encontrar un error
    se responderà con el estado.`;    
    const endpointToTest = "http://localhost:8000/login/login";
    return (
        <BaseTemplate
            description={description}
            endpointToTest={endpointToTest}
        />
    );
}

export default Login