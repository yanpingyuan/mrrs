"use client"

import useLocalStorage from "@/app/hooks/useLocalStorage";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Custom hook to use local storage

export default function LoginForm() {
    const [userInfo, setUserInfo] = useLocalStorage("userInfo", {})
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [user, setUser] = useState({});

    const handleChange = (e:  any) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        }); 
    }

    const validate = () => {
        // let tempErrors = {email: '', password: ''};
        // tempErrors.email = formData.email ? '' : 'Name is required';
        // tempErrors.email = formData.email ? '' : 'Email is required';
        // setErrors(tempErrors);
        // return Object.values(tempErrors).every((x) => x === '');
        return true;
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
            router.push('/');
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
                                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
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