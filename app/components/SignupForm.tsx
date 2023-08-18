"use client";

import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Link from "next/link";

import InfoInput from "./InfoInput";
import InfoSelect from "./InfoSelect";
import Button from "./Button";

interface SubmitButtonType {
  isVaildForm: boolean;
}

const Container = styled.form`
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

const Description = styled.div`
  margin-top: 8px;
  font-family: "Pretendard";
  font-size: 17px;
  font-weight: 400;
  color: #536878;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  align-items: center;
  justify-content: space-between;
`;

const TextLink = styled(Link)`
  font-family: "Pretendard";
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.015em;
  text-align: left;
  color: #8696ab;
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: #8696ab;
`;

interface props {
  submitSignup: () => void;
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
  role: string;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordConfirm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeRole: (value: string) => void;
  isExistedEmail: boolean;
  isExistedUsername: boolean;
  isInvaildEmail: boolean;
  isInconPassword: boolean;
}

export default function SignupForm({
  submitSignup,
  email,
  password,
  passwordConfirm,
  username,
  role,
  onChangeEmail,
  onChangePassword,
  onChangeUsername,
  onChangeRole,
  onChangePasswordConfirm,
  isExistedEmail,
  isExistedUsername,
  isInvaildEmail,
  isInconPassword,
}: props) {
  const [isVaildForm, setIsVaildForm] = useState(false);

  useEffect(() => {
    if (
      email !== "" &&
      password !== "" &&
      passwordConfirm !== "" &&
      username !== "" &&
      role !== "default"
    )
      setIsVaildForm(true);
    else setIsVaildForm(false);
  }, [email, password, passwordConfirm, username, role]);

  return (
    <Container onSubmit={() => submitSignup()}>
      <Title>Sign up</Title>
      <Description>Make an account fast and simple</Description>
      <InfoInput
        value={email}
        onChangeInput={onChangeEmail}
        isExistedEmail={isExistedEmail}
        isInvaildEmail={isInvaildEmail}
        label={"Email"}
        placeholder={"Please enter your Email"}
      />
      <InfoInput
        type={"password"}
        value={password}
        onChangeInput={onChangePassword}
        label={"Password"}
        placeholder={"Please enter Password"}
      />
      <InfoInput
        type={"password"}
        value={passwordConfirm}
        onChangeInput={onChangePasswordConfirm}
        label={"Confirm Password"}
        placeholder={"Please enter Password again"}
        isInconPassword={isInconPassword}
      />
      <InfoInput
        value={username}
        onChangeInput={onChangeUsername}
        label={"User name"}
        placeholder={"Please enter your user name"}
        isExistedUsername={isExistedUsername}
      />
      <InfoSelect
        value={role}
        onChangeSelect={onChangeRole}
        label={"Role"}
        placeholder={"Please select your Role"}
        options={[
          { id: 1, value: "Business" },
          { id: 2, value: "Creator" },
        ]}
      />
      <Footer>
        <Button
          label={"Sign up"}
          size={"medium"}
          style={"primary"}
          state={isVaildForm ? "default" : "disabled"}
          onClick={submitSignup}
        />
        <div>
          <TextLink href={"/login"}>I already have and account</TextLink>
        </div>
      </Footer>
    </Container>
  );
}
