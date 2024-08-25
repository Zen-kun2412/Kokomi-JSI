import React from 'react';
import { GoogleOutlined, LockOutlined, MailOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import '../style/Login.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import { Button, Checkbox, Form, Input } from 'antd';
import Link from 'antd/es/typography/Link';

const handleGoogleLogin = async () => {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
    } catch (error) {
        console.log(error.message);
    }
}

const handleEmailLogin = async (values) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(values.email, values.password);
    } catch (error) {
        console.log(error.message);
    }
}

const Login = () => (
  <div className="login-container">
    <Form
      className='container-from'
      name="basic"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleEmailLogin}
      autoComplete="off"
    >
      <div className="login-header">
        <h2>Login</h2>
      </div>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input 
          placeholder="Email"
          prefix={<MailOutlined />}
          className="input-no-border"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password 
          placeholder="Password"
          prefix={<LockOutlined />}
          className="input-no-border"
        />
      </Form.Item>

      <Form.Item
        className="remember-forgot-wrapper"
      >
        <Checkbox className='remember'>Remember me</Checkbox>
        <a href="#forgot-password" className="forgot-password">Forgot my password?</a>
      </Form.Item>

      <Form.Item
        className="form-buttons"
        wrapperCol={{
          span: 24,
        }}
      >
        <Button type="primary" htmlType="submit" className="submit-button">
          Submit
        </Button>
      </Form.Item>

      <Form.Item className="register-link">
        <span>
          I don't have an account? <Link href="register">Register</Link>
        </span>
      </Form.Item>

      <Form.Item
        className="form-buttons"
        wrapperCol={{
          span: 24,
        }}
      >
        <Button type="primary" onClick={handleGoogleLogin} className="social-button">
          <GoogleOutlined />
        </Button>
        <Button type="primary" className="social-button">
          <FacebookOutlined />
        </Button>
        <Button type="primary" className="social-button">
          <TwitterOutlined />
        </Button>
      </Form.Item>
    </Form>
  </div>
);

export default Login;
