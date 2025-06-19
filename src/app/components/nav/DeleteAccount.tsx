"use client";
import ConfirmModal from "@/app/dashboard/components/ConfirmModal";
import { Dispatch, SetStateAction, useState } from "react";
import {
  getAuth,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import Toast from "../toast/Toast";
type DeleteAccountProps = {
  onClose: () => void;
  onOpen: boolean;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
};
const DeleteAccount = ({
  onClose,
  onOpen,
  password,
  setPassword,
}: DeleteAccountProps) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [toastMessage, setToastMessage] = useState<string>("");
  const handleDelete = async () => {
    if (!user) return;
    const credential = EmailAuthProvider.credential(user.email!, password);
    try {
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      setPassword("");
      setToastMessage("Account deleted successfully!");
      onClose();
    } catch (error: unknown) {
      console.log("刪除帳號失敗:", error);
      setToastMessage("Something went wrong, please try again.");
    }
  };
  return (
    <>
      {onOpen && (
        <ConfirmModal
          onClose={onClose}
          onConfirm={() => {
            handleDelete();
          }}
          title="Are you sure you want to delete your account?"
          content={
            "Account deletion is permanent and cannot be reversed.\nConfirm your decision by entering your password below to verify your identity.\nPlease be very sure before clicking on the button below."
          }
          yes="Yes, delete my account"
          isAuthenticate={true}
          password={password}
          setPassword={setPassword}
          isRegisterPage={false}
        />
      )}

      {toastMessage && (
        <Toast
          toastMessage={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </>
  );
};
export default DeleteAccount;
