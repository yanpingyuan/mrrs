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
  response: () => void;
}
