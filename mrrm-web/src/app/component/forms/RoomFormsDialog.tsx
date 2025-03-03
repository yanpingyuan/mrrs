import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Modal, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";


function RoomFormDialog(props: RoomFormParams) {
    const [errors, setErrors] = useState({ name: '' });
    const [isFormValid, setIsFormValid] = useState(false);

    const [formData, setFormData] = useState({ id: 0, name: '', description: '', capacity: 10 });
    useEffect(() => {
        setFormData({
            description: props.room?.Description ?? '',
            name: props.room?.Name ?? '',
            id: props.room?.RoomId ?? 0,
            capacity: props.room?.Capacity ?? 10 
        });

    }, [props]);



    const handleChange = (e: any) => {
        e.preventDefault();
     
        setFormData({
            ...formData,
            
            [e.target.name]: e.target.value,
        });

    }

    const saveRoom = async () => {
        if (formData.id === 0) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/room`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
                ,
                body: JSON.stringify(formData),
            });
        } else {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/room`, {
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
                        error={errors.name === "" ? false : true}
                        helperText={errors.name}
                    />
                    <TextField
                        name="capacity"
                        label="Capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                       
                    />
                   

                    <TextField
                        name="description"
                        label="Description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        rows="4"
                        multiline
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={saveRoom} color="primary">
                    保存
                </Button>
                <Button onClick={props.onCancel} color="primary">
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default RoomFormDialog;