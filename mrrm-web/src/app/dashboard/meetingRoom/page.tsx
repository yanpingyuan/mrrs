"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Room } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {

    const [rooms, setRooms] = useState<Room[]>([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
    const handleCreateRoom =(room: Room | null) => (e: any) => {
        // TODO:
    }

    useEffect(  () => {
       getRooms();
    }, []);


    const getRooms = async () => {
        const res = await fetch('/api/room');
        const data = await res.json();
        setRooms(data);
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
                                <button onClick={handleCreateRoom(room)} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">编辑</button>
                                <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">删除</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
    )
}