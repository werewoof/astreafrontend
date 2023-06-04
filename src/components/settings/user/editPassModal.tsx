import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowEditPassModal } from "../../../app/slices/clientSlice";
import Button from "../../buttonComponent";
import Input from "../../inputComponent";
import ModalBottom from "../../modal/modalBottomComponent";
import Modal from "../../modal/modalComponent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { EditUserPasswordForm } from "../../../api/types/user";
import { usePatchUserPasswordMutation } from "../../../api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

type editPassForm = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

const EditPassModal: FC = () => {
  const dispatch = useDispatch();
  const [patchUser, { error: patchUserError, status: patchUserStatus }] =
    usePatchUserPasswordMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<editPassForm>({
    resolver: yupResolver(
      yup.object().shape({
        password: yup.string().required("Password is required"),
        newPassword: yup
          .string()
          .max(32, "Too long")
          .min(8, "Too short")
          .matches(/[A-Z]/, "must contain a uppercase letter")
          .matches(/\d/, "must contain a number")
          .matches(/[a-z]/, "must contain a lowercase letter")
          .required("New Password is required"),
        confirmNewPassword: yup
          .string()
          .oneOf([yup.ref("newPassword"), null], "Passwords must match")
          .required("Confirm New Password is required"),
      })
    ),
  });
  useEffect(() => {
    if (
      patchUserError &&
      (patchUserError as FetchBaseQueryError).status === 401
    ) {
      setError("password", {
        message: "Incorrect password",
      });
    } else if (
      patchUserError &&
      (patchUserError as FetchBaseQueryError).status === 400
    ) {
      setError("password", {
        message: "An error occured in the server",
      });
    } else if (patchUserStatus.valueOf() === "fulfilled") {
      dispatch(setShowEditPassModal(false));
    }
  }, [patchUserStatus, patchUserError]);
  return (
    <Modal
      title={"Edit Password"}
      exitFunc={() => {
        dispatch(setShowEditPassModal(false));
      }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          const body: EditUserPasswordForm = {
            password: data.password,
            newPassword: data.newPassword,
          };
          patchUser(body);
        })}
      >
        <div className="flex flex-col p-4 pt-0">
          <Input
            label="Password"
            type="password"
            dark
            register={register("password")}
            error={errors.password}
          />
          <Input
            label="New Password"
            type="password"
            dark
            register={register("newPassword")}
            error={errors.newPassword}
          />
          <Input
            label="Confirm New Password"
            type="password"
            dark
            register={register("confirmNewPassword")}
            error={errors.confirmNewPassword}
          />
        </div>
        <ModalBottom>
          <Button value="Finish" type="submit" />
        </ModalBottom>
      </form>
    </Modal>
  );
};

export default EditPassModal;
