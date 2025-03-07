import Image from "next/image";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies()
      const userStr = cookieStore.get('loginUser');
      const userInfo = userStr!=undefined && JSON.parse(userStr?.value as string);
   
     if(userInfo?.Email&&userInfo.Email.length>0){
      if(userInfo.IsAdmin){
        redirect('/dashboard/meetingRoom')  
     }else{
        redirect('/dashboard/meetings')
     }
    }
  return (
    <div className="flex flex-col h-screen">
      <header className="h-20  shrink-0">
        header
      </header>
      <div className="flex flex-row  h-[calc(100vh-5rem)]">
       <div className="w-60 bg-blue-300">
          left
       </div>
      <main className="bg-blue-500 w-full overflow-y-auto">
      {children}
        </main> 
         </div>
      <footer className={styles.footer}>434
      </footer>
    </div>
  );
}
