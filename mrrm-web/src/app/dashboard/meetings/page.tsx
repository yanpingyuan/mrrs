"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Reservations } from "@prisma/client";
import { useState } from "react";
import ReservationFormDialog from "@/app/component/forms/ReservationFormsDialog";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

export default function Home() {

    const [reservations, setReservations] = useState<Reservations[]>([]);
        const [openDelete, setOpenDelete] = useState(false);
        const [openCreate, setOpenCreate] = useState(false);
    const [currentReservation, setCurrentReservation] = useState<Reservations | null>(null);
    const handleCreateMeeting =(room: Reservations | null) => (e: any) => {
            // TODO:
        setCurrentReservation(room);
            setOpenCreate(true);
        }

     const getReservations = () =>   {
         
     }
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
        <div className="flex flex-col h-screen">
            <div className="flex justify-between align-items-center border-b-1 border-gray-300">
                <div className="w-[20%] ">
                    预定管理
                </div>
                <button onClick={handleCreateMeeting(null)} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">添加预定</button>
            </div>
            <ReservationFormDialog
                openForm={openCreate}
                onOk={() => { getReservations(); setOpenCreate(false); }}
                title={currentReservation ? "编辑预定" : "添加预定"}
                reservation={currentReservation}
                onCancel={() => setOpenCreate(false)}
            ></ReservationFormDialog>
        </div>
        </LocalizationProvider>
    );
}