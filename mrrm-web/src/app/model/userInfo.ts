import { Room, Reservations } from "@prisma/client";

interface UserInfo {
  UserId: number;
  Name: string;
  Email: string;
  Password: string;
  Phone: string;
  IsAdmin: boolean; // 0: user, 1: admin
}

interface ConfirmParams {
  open: boolean;
  title: string;
  description: string;
  onOk: () => void;
  onCancel: () => void;
}

interface UserFormParams {
  openForm: boolean;
  title: string;
  onOk: () => void;
  onCancel: () => void;
  userInfo: UserInfo | null;
}


interface RoomFormParams {
  openForm: boolean;
  title: string;
  onOk: () => void;
  onCancel: () => void;
  room: Room | null;
}

interface ReservationFormParams{
  openForm: boolean;
  title: string;
  onOk: () => void;
  onCancel: () => void;
  reservation: Reservations | null;
}