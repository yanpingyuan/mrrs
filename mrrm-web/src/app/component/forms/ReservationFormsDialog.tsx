import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, MenuItem, Modal, Select, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
import RoomFormDialog from "./RoomFormsDialog";



function ReservationFormDialog(props: ReservationFormParams) {
    const [errors, setErrors] = useState({ name: '' });
    const [isFormValid, setIsFormValid] = useState(false);
    const [rooms, setRooms] = useState([]);
    
    const [formData, setFormData] = useState({ id: 0, roomId: 0, name:'', startTime: moment(), endTime: moment(), note: '' });
    useEffect(() => {
        setFormData({
            roomId: props.reservation?.RoomId ?? 0,
            startTime: props.reservation?.startTime ?? null,
            endTime: props.reservation?.endTime ?? null,
            id: props.reservation?.ReservationId ?? 0,
            note: props.reservation?.Note ?? '',
            name: props.reservation?.Name ?? ''
        });

    }, [props]);

    useEffect(() => {
        getRooms();

    }, []);

    const getRooms = async () => {
        const res = await fetch('/api/room');
        const data = await res.json();
        setRooms(data);
    }

    const handleChange = (e: any) => {
      

        setFormData({
            ...formData,

            [e.target.name]: e.target.value,
        });

    }

    const saveReservation = async () => {
        if (formData.id === 0) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
                ,
                body: JSON.stringify(formData),
            });
        } else {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reservations`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
                ,
                body: JSON.stringify(formData),
            })
        }

        console.log(formData);
        props.onOk();
    };


    return (
        <Dialog
            open={props.openForm}
            onClose={props.onCancel}
        >
            <DialogTitle >{props.title}</DialogTitle>
            <DialogContent>
                <form className="mt-8 w-full ">
                    <TextField
                        name="name"
                        label="Name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                    />
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={formData.roomId}
                        name="roomId"
                        label="Age"
                        className="w-full mb-2"
                        onChange={handleChange}
                    >
                        <MenuItem value="0">
                           select
                        </MenuItem>
                        {rooms.map((room) => (
                             <MenuItem value={room.RoomId} key={room.RoomId}>
                           {room.Name}
                        </MenuItem>
                           
                        ))}
                       
                       
                    </Select>
                    <DateTimePicker
                        label="Start Date"
                        name="startTime"
                        value={formData.startTime}
                        className="w-full mb-2"
                        minDateTime={moment()}
                        onChange={(newValue) => {
                            setFormData({
                                ...formData,
                                startTime: newValue,
                            });
                        }}
                    />
                    <DateTimePicker
                        label="End Date"
                        name="endTime"
                        value={formData.endTime}
                        className="w-full mb-2"
                        minDateTime={moment()}
                        onChange={(newValue) => {
                            setFormData({
                                ...formData,
                                endTime: newValue,
                            });
                        }}
                    />

                    <TextField
                        name="note"
                        label="Description"
                        value={formData.note}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        rows="4"
                        multiline
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={saveReservation} color="primary">
                    保存
                </Button>
                <Button onClick={props.onCancel} color="primary">
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ReservationFormDialog;