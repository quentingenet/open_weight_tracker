/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext, useState } from 'react';

interface IUserContext {
    jwt: string;
    setJwt: (jwt: string) => void;
    isFirstConnection: boolean;
    setIsFirstConnection: (isFirstConnection: boolean) => void;
    isUserLoggedIn: boolean;
    setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
    isEuropeanUnitMeasure: boolean;
    setIsEuropeanUnitMeasure: (isEuropeanUnitMeasure: boolean) => void;
    height: number;
    setHeight: (height: number) => void;
    age: number;
    setAge: (age: number) => void;
}

export const UserContext = createContext<IUserContext>({
    jwt: '',
    setJwt: () => {},
    isFirstConnection: false,
    setIsFirstConnection: () => {},
    isUserLoggedIn: false,
    setIsUserLoggedIn: () => {},
    isEuropeanUnitMeasure: true,
    setIsEuropeanUnitMeasure: () => {},
    height: 150,
    setHeight: () => {},
    age: 18,
    setAge: () => {},
});

export function useUserContext() {
    return useContext(UserContext);
}

export function UserContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [jwt, setJwt] = useState<string>('');
    const [isFirstConnection, setIsFirstConnection] = useState<boolean>(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
    const [isEuropeanUnitMeasure, setIsEuropeanUnitMeasure] =
        useState<boolean>(true);
    const [height, setHeight] = useState<number>(150);
    const [age, setAge] = useState<number>(18);

    const value: IUserContext = {
        jwt: jwt,
        setJwt: setJwt,
        isFirstConnection: isFirstConnection,
        setIsFirstConnection: setIsFirstConnection,
        isUserLoggedIn: isUserLoggedIn,
        setIsUserLoggedIn: setIsUserLoggedIn,
        isEuropeanUnitMeasure: isEuropeanUnitMeasure,
        setIsEuropeanUnitMeasure: setIsEuropeanUnitMeasure,
        height: height,
        setHeight: setHeight,
        age: age,
        setAge: setAge,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}
