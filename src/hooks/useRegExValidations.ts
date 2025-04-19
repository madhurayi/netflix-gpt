import { useCallback } from "react";

export const useRegExValidations = () => {
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const checkEmail=useCallback((email:string)=>{
        return emailValidation.test(email);
    },[])
    const checkPassword=useCallback((password:string)=>{        
        return passwordValidation.test(password);
    },[])
    return { checkEmail, checkPassword };
}