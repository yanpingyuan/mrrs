"use client"
import useLocalStorage from "@/app/hooks/useLocalStorage"
import { useRouter } from "next/navigation";



export default function Header() {
    const [userInfo, setUserInfo] = useLocalStorage<UserInfo>("userInfo", {} as UserInfo);
     const router = useRouter();
    if (userInfo) {
        console.log(userInfo)
    }
    const logout = async () => {
        setUserInfo({} as UserInfo);
        var url = `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/api/auth/logout`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
        if (response.ok) {
            router.replace('/login');
        }
    }

return (<>
       
            <div className="flex justify-between items-center p-4 ">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold">Mrrm Dashboard</h1>
                </div>
                <div className="flex items-center">
                    <p className="mr-4">Welcome {userInfo.Name}</p>
                    <button onClick={ logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up</button>
                </div>
            </div>
       
    </>)
}