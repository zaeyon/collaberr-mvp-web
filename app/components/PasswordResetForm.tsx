"use client";

import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Link from "next/link";

import Button from "./Button";
import InfoInput from "./InfoInput";
import { loginType } from "../type";

interface SubmitButtonType {
  isVaildForm: boolean;
}

const Form = styled.form`
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

const SubmitButton = styled.button<SubmitButtonType>`
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  font-family: "Pretendard";
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.015em;
  text-align: left;
  background-color: ${(props) => (props.isVaildForm ? "#F25476" : "#F1F4F7")};
  color: ${(props) => (props.isVaildForm ? "#F7F9FB" : "#242D35")};
  cursor: ${(props) => (props.isVaildForm ? "pointer" : "default")};
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

const Divider = styled.span`
  margin-left: 12px;
  margin-right: 12px;
  font-family: "Pretendard";
  font-size: 15px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: -0.015em;
  text-align: left;
  color: #d1d7df;
`;

interface props {
  submitEmailVerify: () => void;
  email: string;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LoginForm({
  submitEmailVerify,
  email,
  onChangeEmail,
}: props) {
  const [isVaildForm, setIsVaildForm] = useState(false);

  useEffect(() => {
    if (email !== "") setIsVaildForm(true);
    else setIsVaildForm(false);
  }, [email]);

  return (
    <Form onSubmit={() => submitEmailVerify()}>
      <Title>Reset Password</Title>
      <Description>Please verify your Email to reset password</Description>
      <InfoInput
        value={email}
        onChangeInput={onChangeEmail}
        label={"Email"}
        placeholder={"Please enter your Email"}
      />
      <Footer>
        <Button
          label={"Verify"}
          size={"medium"}
          style={"primary"}
          state={isVaildForm ? "default" : "disabled"}
          onClick={submitEmailVerify}
        />
      </Footer>
    </Form>
  );
}
