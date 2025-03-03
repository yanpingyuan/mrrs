"use client";

import { Room } from "@prisma/client";
import { useEffect, useState } from "react";
import ConfirmationDialog from "@/app/component/shared/confirmationDialog";
import RoomFormDialog from "@/app/component/forms/RoomFormsDialog";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

export default function Home() {

    const [rooms, setRooms] = useState<Room[]>([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
    const handleCreateRoom =(room: Room | null) => (e: any) => {
        // TODO:
        setCurrentRoom(room);
        setOpenCreate(true);
    }

    useEffect(  () => {
       getRooms();
    }, []);


    const getRooms = async () => {
        const res = await fetch('/api/room');
        const data = await res.json();
        setRooms(data);
    }

    const openDeleteModal = (room: Room) => (e: any) => {
        setCurrentRoom(room);
        setOpenDelete(true);
    }

    const deleteRoom = async () => {
        if(currentRoom) {
            const res = await fetch(`/api/room/${currentRoom.RoomId}`, { method: 'DELETE' });
            const data = await res.json();
            if(data) {
                getRooms();
                setOpenDelete(false);
            }
        }
    }

    return (
        <div className="container p-4">
            <div className="flex justify-between align-items-center border-b-1 border-gray-300">
                <div className="w-[20%] ">
                    会议室管理
                </div>
                <button onClick={handleCreateRoom(null)} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">添加会议室</button>
            </div>
            <table className="w-full mt-4">
                <thead>
                    <tr className="border-b-1 border-gray-300">
                        <th className="w-[20%]">会议室名称</th>
                        <th className="w-[20%]">会议室容量</th>
                        <th className="w-[20%]">会议室描述</th>
                        <th className="w-[20%]">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr className="border-b-1 border-gray-300" key={room.RoomId}>
                            <td className="w-[20%]">{room.Name}</td>
                            <td className="w-[20%]">{room.Capacity}</td>
                            <td className="w-[20%]">{room.Description}</td>
                            <td className="w-[20%]">
                                <div className="flex justify-center">
                                    <IconButton onClick={openDeleteModal(room)}>
                                        <DeleteForeverIcon className="text-red-500 cursor-pointer" />
                                    </IconButton>
                                    <IconButton onClick={handleCreateRoom(room)}>
                                        <EditIcon className="text-blue-500 cursor-pointer" />
                                    </IconButton>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ConfirmationDialog
                title="确认删除"
                description="你确定要删除这条记录?"
                open={openDelete}
                onOk={deleteRoom}
                onCancel={() => setOpenDelete(false)}
            >

            </ConfirmationDialog>
            <RoomFormDialog
                openForm={openCreate}
                onOk={() => { getRooms(); setOpenCreate(false); }}
                title={currentRoom ? "编辑会议室" : "添加会议室"}
                room={currentRoom}
                onCancel={() => setOpenCreate(false)}
            ></RoomFormDialog>
            </div>
    )
}