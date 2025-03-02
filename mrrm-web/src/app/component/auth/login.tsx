"use client"

import useLocalStorage from "@/app/hooks/useLocalStorage";
import TextField from "@mui/material/TextField";
import { error } from "console";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import validator from "validator";

// Custom hook to use local storage

export default function LoginForm() {
    const [userInfo, setUserInfo] = useLocalStorage("userInfo", {})
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e:  any) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        }); 
       
    }

    useEffect(() => {
        validate();
    }, [formData]);

    useEffect(() => {
        setIsFormValid(errors.email === '' && errors.password === '');
    }, [errors]);

    const validate = () => {
        let tempErrors = {email: '', password: ''};
        tempErrors.email = formData.email&& validator.isEmail(formData.email) ? '' : 'email is required';
        tempErrors.password = formData.password && formData.password.length>0 ? '' : 'password is required';
        setErrors(tempErrors);
        console.log(errors);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var url = `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/api/auth/login`;
        console.log(url);
        const response = await fetch(url,  {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        if(response.status !== 200) {
            console.log(response.statusText);
            return;
        }else{
            console.log(response.statusText);
            const result = await response.json();
            setUserInfo(result);
            if(result.IsAdmin){
                router.push('/dashboard/meetingRoom');
            } else{
                router.push('/dashboard/meetings');   
            }
        }
    };

    return(
        <div className="bg-gray-50 w-full font-[sans-serif]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="max-w-md w-full">
                    
                    <div className="p-8 rounded-2xl bg-white shadow">
                        <h2 className="text-gray-800 text-center text-2xl font-bold">Sign in</h2>
                        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                            
                            <TextField
                                name="email"
                                label="Email"
                                value={formData.email}
                                onChange={handleChange}
                                // error={!!errors.email}
                                // helperText={errors.email}
                                fullWidth
                                margin="normal"
                                error={errors.email === "" ? false : true}
                                helperText={errors.email}
                            />
                            <TextField
                            type="password"
                                name="password"
                                label="password"
                                value={formData.password}
                                 onChange={handleChange}
                                // error={!!errors.password}
                                // helperText={errors.password}
                                fullWidth
                                margin="normal"
                                error={formData.password === "" ? true : false}
                                helperText={errors.password }
                            />

                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center">
                                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                                        Remember me
                                    </label>
                                </div>
                            </div>

                            <div className="!mt-8">
                                <button type="submit"
                                    className={`w-full py-3 px-4 text-sm  rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ${isFormValid ? "bg-blue-600" : "bg-gray-300"}`}
                                   
                                   disabled={!isFormValid}
                                >
                                    Sign in
                                </button>
                            </div>
                          
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}