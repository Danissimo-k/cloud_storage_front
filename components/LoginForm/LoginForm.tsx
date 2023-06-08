import React, {FC} from 'react';
import styles from './LoginForm.module.scss'
import {Button, Form, Input, notification} from "antd";
import * as Api from '@/api'
import {setCookie} from "nookies";
import {LoginFormDto} from "@/api/dto/auth.dto";

export const LoginForm: FC = ({}) => {

    const onSubmit = async (values: LoginFormDto) => {
        try {
            const { token } = await Api.auth.login(values)

            notification.success({
                message: 'Успешно!',
                description: 'Переходим в админ панель...',
                duration: 2
            })

            setCookie(null, '_token', token, {
                path: '/',

            })

            location.href = '/dashboard'

        } catch (e) {
            console.log(e)
            notification.warning({
                message: 'Что-то пошло не так',
                description: "Неверные почта или пароль",
                duration: 2
            })
        }
    }

    return (
        <Form
            labelCol={{
                span: 8
            }}
            className={styles.formBlock}
            onFinish={onSubmit}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Укажите почту' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                rules={[{ required: true, message: 'Введите пароль' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

