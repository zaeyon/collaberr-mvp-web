"use client";
import styled from "@emotion/styled";
import React, { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/user";

import InfoInput from "./InfoInput";
import FileInput from "./FileInput";
import InfoSelect from "./InfoSelect";
import Button from "./Button";

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 600px;
  margin-top: 48px;
  padding: 0px 40px;
  background-color: white;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const Title = styled.div`
  font-family: "Pretendard";
  font-size: 40px;
  font-weight: 700;
  line-height: 52px;
  letter-spacing: -0.015em;
  text-align: left;
`;
const Header = styled.div`
  margin-top: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Footer = styled.div`
  margin-top: 32px;
`;

interface props {
  disabled: boolean;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageFile: any;
  phoneNumber: string;
  companyName: string;
  role: string;
  channelUrl: string;
  submitEdit: () => void;
  clickEdit: () => void;
  changeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeLastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeProfileImage: (file: any, src: any) => void;
  changePhoneNumber: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeCompanyName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeChannelUrl: (e: React.ChangeEvent<HTMLInputElement>) => void;
  logout: () => void;
  confirmChannelUrl: () => void;
  isAddiDisabled: boolean;
  clickAddiEdit: () => void;
  submitAddiEdit: () => void;
}

export default function SettingForm({
  disabled,
  username,
  firstName,
  lastName,
  email,
  profileImageFile,
  phoneNumber,
  companyName,
  role,
  submitEdit,
  clickEdit,
  changeUsername,
  changeFirstName,
  changeLastName,
  changeEmail,
  changeProfileImage,
  changePhoneNumber,
  changeCompanyName,
  logout,
  isAddiDisabled,
  clickAddiEdit,
  submitAddiEdit,
  channelUrl,
  changeChannelUrl,
  confirmChannelUrl,
}: props) {
  const [user, setUser] = useRecoilState(userState);
  const profileImageInputRef = useRef<HTMLInputElement>();

  const clickProfileImageInput = () => {
    profileImageInputRef.current?.click();
  };

  return (
    <Container>
      <Title>Settings</Title>
      <Header>
        <h3>Basic Information</h3>
      </Header>
      <InfoInput
        value={username}
        label={"User name"}
        onChangeInput={changeUsername}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <InfoInput
          value={firstName}
          label={"First Name"}
          onChangeInput={changeFirstName}
        />
        <InfoInput
          value={lastName}
          label={"Last Name"}
          onChangeInput={changeLastName}
        />
      </div>
      <InfoInput
        disabled={true}
        value={email}
        label={"Email"}
        onChangeInput={changeEmail}
      />

      <InfoSelect
        disabled={true}
        options={[
          { id: 1, value: "Business" },
          { id: 2, value: "Creator" },
        ]}
        value={role}
        label={"Role"}
      />
      <Header>
        <h3>Additional Information</h3>
      </Header>
      {user.role === "CREATOR" && (
        <InfoInput
          value={channelUrl}
          label={"Channel Information"}
          onChangeInput={changeChannelUrl}
          placeholder={"Enter your youtube channel url"}
          button={"Confirm"}
          clickButton={confirmChannelUrl}
        />
      )}
      <InfoInput
        value={phoneNumber}
        label={"Phone number"}
        onChangeInput={changePhoneNumber}
      />
      <InfoInput
        value={companyName}
        label={"Company name"}
        onChangeInput={changeCompanyName}
      />
      <FileInput
        changeFile={changeProfileImage}
        accept={"image/*"}
        value={profileImageFile}
        label={"Profile image"}
        description={"Please upload PNG, JPEG files only"}
      />
      <Footer>
        <Button
          label="Save"
          style="primary"
          size="medium"
          state="default"
          onClick={submitEdit}
        />
      </Footer>
    </Container>
  );
}
