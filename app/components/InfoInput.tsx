import styled from "@emotion/styled";
import Image from "next/image";

import Button from "./Button";
import icon_clip from "../assets/icons/icon_clip.png";

interface ContainerProps {
  label: string;
  marginTop: number;
}

interface InputProps {
  isExistedEmail?: boolean | undefined;
  isExistedUsername?: boolean | undefined;
  isInvaildEmail?: boolean | undefined;
  isInconPassword?: boolean | undefined;
  disabled?: boolean | undefined;
  height: number;
}

interface FileInputProps {
  disabled: boolean | undefined;
}

const Container = styled.div<ContainerProps>((props) => ({
  position: "relative",
  marginTop:
    props.label === "Email"
      ? 32
      : props.label === "Brand Name"
      ? 20
      : props.marginTop,
  display: "flex",
  flexDirection: "column",
  width:
    props.label === "First Name" || props.label === "Last Name"
      ? "48.2%"
      : "100%",
}));

const LabelDiv = styled.div``;

const Label = styled.span`
  position: relative;
  font-family: "Pretendard";
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.015em;
  text-align: left;
  color: #35424c;
`;

const InputDiv = styled.div`
  margin-top: 6px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Input = styled.input<InputProps>`
  width: 100%;
  height: ${(props) => `${props.height}px`};
  position: ${(props) => (props.type === "file" ? "absolute" : "static")};
  display: ${(props) => (props.type === "file" ? "none" : "block")};
  background-color: white;
  padding-left: 18px;
  padding-right: 18px;
  border-radius: 8px;
  color: ${(props) => (props.disabled ? "#D1D7DF" : "#35424C")};
  font-family: "Pretendard";
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.015em;
  text-align: left;

  ::placeholder {
    color: #8696ab;
    font-family: "Pretendard";
    font-size: 15px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.015em;
    text-align: left;
  }

  :hover {
    border: ${(props) =>
      props.isExistedEmail ||
      props.isExistedUsername ||
      props.isInvaildEmail ||
      props.isInconPassword
        ? "1px solid #EE204E"
        : props.disabled
        ? "1px solid #E6EAEF"
        : "1px solid #ACB8C8"};
  }

  :focus {
    outline: none;
    border: ${(props) =>
      props.isExistedEmail ||
      props.isExistedUsername ||
      props.isInvaildEmail ||
      props.isInconPassword
        ? "1px solid #EE204E"
        : "1px solid #536878"};
  }

  border: ${(props) =>
    props.isExistedEmail ||
    props.isExistedUsername ||
    props.isInvaildEmail ||
    props.isInconPassword
      ? "1px solid #EE204E"
      : "1px solid #E6EAEF"};
`;

const Error = styled.div`
  position: absolute;
  bottom: -22px;
  left: 0px;
  font-family: "Pretendard";
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.015em;
  color: #f04d3e;
`;

const Description = styled.div`
  margin-top: 6px;
  font-family: "Pretendard";
  font-size: 15px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: -0.015em;
  text-align: left;
  color: #acb8c8;
`;

const RequiredMark = styled.span`
  position: absolute;
  right: -6px;
  top: -3px;
  width: 4px;
  height: 4px;
  border-radius: 10px;
  background-color: #f25476;
`;

interface props {
  inputRef?: any;
  height?: number;
  type?: string;
  accept?: string;
  disabled?: boolean;
  value?: any;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  isExistedEmail?: boolean;
  isExistedUsername?: boolean;
  isInvaildEmail?: boolean;
  isInconPassword?: boolean;
  description?: string;
  button?: string;
  clickButton?: any;
  marginTop?: number;
  required?: boolean;
}

export default function InfoInput({
  type = "text",
  height = 52,
  accept = "",
  disabled = false,
  value,
  onChangeInput,
  label,
  placeholder,
  isExistedEmail,
  isExistedUsername,
  isInvaildEmail,
  description,
  isInconPassword,
  button = "",
  clickButton,
  marginTop = 24,
  required = false,
}: props) {
  return (
    <Container marginTop={marginTop} label={label}>
      <LabelDiv>
        <Label>
          {required && <RequiredMark />}
          {label}
        </Label>
      </LabelDiv>
      <InputDiv>
        <Input
          height={height}
          accept={accept}
          disabled={disabled}
          type={type}
          value={value}
          onChange={(e) => (onChangeInput ? onChangeInput(e) : "")}
          placeholder={placeholder}
          isExistedUsername={isExistedUsername}
          isExistedEmail={isExistedEmail}
          isInvaildEmail={isInvaildEmail}
          isInconPassword={isInconPassword}
        />
        {button && (
          <span style={{ marginLeft: 16 }}>
            <Button
              label={button}
              size={
                button === "Confirm"
                  ? "medium"
                  : button === "채널 인증"
                  ? "small"
                  : "medium"
              }
              style={"tertiery"}
              state={disabled ? "disabled" : "default"}
              onClick={clickButton}
            />
          </span>
        )}
      </InputDiv>
      {isExistedEmail && <Error>Account with this email already exists.</Error>}
      {isExistedUsername && (
        <Error>Account with this username already exists.</Error>
      )}
      {isInvaildEmail && <Error>Enter a valid email address.</Error>}
      {isInconPassword && <Error>Passwords do not match</Error>}
      {description && <Description>{description}</Description>}
      {label === "Campaign Bid" && String(value).length >= 10 && (
        <Error>Campaign rewards must be less than $1 billion</Error>
      )}
    </Container>
  );
}
