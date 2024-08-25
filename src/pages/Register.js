import React from 'react';
import { GoogleOutlined, TwitterOutlined, UserOutlined, FacebookOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Button, Checkbox, Form, Input } from 'antd';
import '../style/Login.css';
import { Link } from 'react-router-dom';

const onFinish = async (values) => {
    const { username, email, password, confirmPassword } = values;
    if (password.length < 6) {
        return alert('Password phải trên 6 ký tự');
    }
    if (password !== confirmPassword) {
        return alert('Confirm password và password không giống nhau');
    }
    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await result.user.updateProfile({
            displayName: username,
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
};

const Register = () => (
    <div className="login-container">
        <Form
            className='container-from'
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <div className="login-header">
                <h2>Register</h2>
            </div>
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input 
                    placeholder="Username"
                    prefix={<UserOutlined />}
                    className="input-no-border"
                />
            </Form.Item>
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input 
                    placeholder="Email"
                    prefix={<MailOutlined />}
                    className="input-no-border"
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password 
                    placeholder="Password"
                    prefix={<LockOutlined />}
                    className="input-no-border"
                />
            </Form.Item>
            <Form.Item
                name="confirmPassword"
                rules={[{ required: true, message: 'Please input your confirm password!' }]}
            >
                <Input.Password 
                    placeholder="Confirm Password"
                    prefix={<LockOutlined />}
                    className="input-no-border"
                />
            </Form.Item>
            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 0, span: 24 }}
            >
                <Checkbox className='remember'>Remember me</Checkbox>
            </Form.Item>
            <Form.Item
                className="form-buttons"
                wrapperCol={{ span: 24 }}
            >
                <Button type="primary" htmlType="submit" className="submit-button">
                    Submit
                </Button>
            </Form.Item>
            <Form.Item className="register-link">
        <span>
          I have an account <Link to="/login">Login</Link>
        </span>
      </Form.Item>
            <Form.Item
                className="form-buttons"
                wrapperCol={{ span: 24 }}
            >
                <Button type="primary" className="social-button">
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

export default Register;
