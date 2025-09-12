export type CategoryData = {
  name: string;
  value: number;
};

export type DateData = {
  date: string;
  amount: number;
};

export interface LoginFormInputs {
  email: string;
  password: string;
  first_name?: string;
}

export interface ForgotPasswordEmailInputs {
  email: string;
}

export interface ForgotPasswordInputs {
  password: string;
  confirm_password: string;
}

export interface LoginProps {
  isRegister: boolean;
}

export interface ExpenseData {
  _id: string;
  date: string;
  category: string;
  amount: number;
  owner: string;
  __v: number;
}

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface ChatbotUIProps {
  setChatView: (value: boolean) => void;
}
