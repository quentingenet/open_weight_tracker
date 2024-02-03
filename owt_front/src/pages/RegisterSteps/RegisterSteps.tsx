import InitialData from '../../components/InitialData/InitialData';
import Register from '../../components/Register/Register';
import { useUserContext } from '../../contexts/UserContext';

export const RegisterSteps = () => {
    const userContext = useUserContext();

    return (
        console.log(
            'FIRST CONNECTION from registersSteps?',
            userContext.isFirstConnection
        ),
        (<>{userContext.isFirstConnection ? <InitialData /> : <Register />}</>)
    );
};

export default RegisterSteps;
