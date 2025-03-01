import Image from "next/image";
import styles from "./page.module.css";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
