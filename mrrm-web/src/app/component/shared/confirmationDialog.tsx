import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";


function ConfirmationDialog(props: ConfirmParams) {
    

    return (
        <Dialog
            open={props.open}
            onClose={props.onCancel}
        >
            <DialogTitle >{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText >
                    {props.description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onOk} color="primary">
                    Yes
                </Button>
                <Button onClick={props.onCancel} color="secondary">
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;