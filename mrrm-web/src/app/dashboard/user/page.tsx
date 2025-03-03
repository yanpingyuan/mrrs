"use client";

import ConfirmationDialog from "@/app/component/shared/confirmationDialog";
import UserFormDialog from "@/app/component/UserFormDialog";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);

   useEffect(  () => {
       getUsers();
    }, []);

    const getUsers = () => {
        fetch('/api/user').then(res => res.json()).then(data => {
            setUsers(data);
        })
    }

    const handleCreateUser = (user: UserInfo | null) => (e: any) => {
        e.preventDefault();
        setCurrentUser(user);
        setOpenCreate(true);
    }

    const openDeleteModal = (user: UserInfo) =>(e:any) => {
        e.preventDefault();
        setCurrentUser(user);
        setOpenDelete(true);
    }

    const deleteUser = () => {
        fetch(`/api/user/${currentUser?.UserId}`, {
            method: 'DELETE'
        }).then(res => res.json()).then(data => {
            if(data) {
                getUsers();
                setOpenDelete(false);
            }
        })
    }

    return (
        <div className="container p-4">
            <div className="flex justify-between align-items-center border-b-1 border-gray-300">
                <div className="w-[20%] ">
                    用户管理
                    </div>
                <button onClick={handleCreateUser(null)} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">添加用户</button>
             </div>
            <table className="w-full mt-4">
                <thead>
                    <tr>
                        
                        <th className="border-b-2 border-gray-300">Name</th>
                        <th className="border-b-2 border-gray-300">Email</th>
                        <th className="border-b-2 border-gray-300">Phone</th>
                        <th className="border-b-2 border-gray-300">Role</th>
                        <th className="border-b-2 border-gray-300">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => ( 
                        <tr key={user.UserId}>
                            <td className="border-b-2 border-gray-300">{user.Name}</td>
                            <td className="border-b-2 border-gray-300">{user.Email}</td>
                            <td className="border-b-2 border-gray-300">{user.Phone}</td>
                            <td className="border-b-2 border-gray-300">{user.IsAdmin ? 'Admin' : 'User'}</td>
                            <td className="border-b-2 border-gray-300">
                                <div className="flex justify-center">
                                        <IconButton onClick={openDeleteModal(user)}>
                                                <DeleteForeverIcon className="text-red-500 cursor-pointer" />
                                            </IconButton> 
                                    <IconButton onClick={handleCreateUser(user)}>
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
                onOk={deleteUser}
                onCancel={() => setOpenDelete(false)}
            >

            </ConfirmationDialog>
            <UserFormDialog
                openForm={openCreate}   
                onOk={() => { getUsers(); setOpenCreate(false); }}   
                title= {currentUser? "编辑用户" : "添加用户"}
                userInfo={currentUser}
                onCancel={() => setOpenCreate(false)}
            ></UserFormDialog>
        </div>
    );
}