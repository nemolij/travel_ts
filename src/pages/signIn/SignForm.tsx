import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import styles from "./SignForm.module.scss";
import axios from "axios";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../redux/user/slice";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
export const SignForm = () => {
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const jwt = useSelector((state) => state.user.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt !== null) {
      navigate("/");
    }
  }, [jwt]);

  const onFinish = (values) => {
    // dispatch(
    //   signIn({
    //     email: values.username,
    //     password: values.password,
    //   })
    // );
  };

  const onFinishFailed = (errorInfo: any) => {};
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className={styles["register-form"]}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        {...tailLayout}
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
