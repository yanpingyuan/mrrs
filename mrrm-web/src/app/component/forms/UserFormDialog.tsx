import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Modal, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";


function UserFormDialog(props: UserFormParams) {
    const [errors, setErrors] = useState({ name: '', email: '', password: '' });
    const [isFormValid, setIsFormValid] = useState(false);
   
    const [formData, setFormData] = useState({ id: 0, email: '', password: '', isAdmin: false, phone: '', name: ''});
    useEffect(() => {
     
            
            setFormData({ email: props.userInfo?.Email ?? '',
                 password: '',
                  isAdmin: props.userInfo?.IsAdmin ?? false,
                   phone: props.userInfo?.Phone ?? '',
                    name: props.userInfo?.Name ?? '',
                id: props.userInfo?.UserId ?? 0});
        
    }, [props]);

 

    const handleChange = (e: any) => {
        e.preventDefault();
        if(e.target.name === 'isAdmin'){
            setFormData({
                ...formData,
                [e.target.name]: e.target.checked,
            });
            return;
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    }

    const saveUser = async () => {
       if(formData.id === 0){
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
            ,
            body: JSON.stringify(formData),
        });
       }else{   
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
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
                        name="email"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        error={errors.email === "" ? false : true}
                        helperText={errors.email}
                    />
                    {formData.id === 0 &&  <TextField
                        type="password"
                        name="password"
                        label="password"
                        value={formData.password}
                        onChange={handleChange}
                        // error={!!errors.password}
                        // helperText={errors.password}
                        fullWidth
                        margin="normal"
                        error={formData.password === "" ? true : false}
                        helperText={errors.password}
                    />}

                    <TextField
                        name="phone"
                        label="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                      
                    />
                    <FormControlLabel 
                        control={

                    <Switch
                        checked={formData.isAdmin}
                        name="isAdmin"
                        onChange={(handleChange)}
                    />
                        }
                        label="isAdmin"/>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={saveUser} color="primary">
                    保存
                </Button>
                <Button onClick={props.onCancel} color="primary">
                    取消
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UserFormDialog;