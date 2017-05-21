import { notification } from 'antd';

export const openNotification = (type, message, description) => {
    notification[type]({
        message,
        description,
        duration: 3,
    });
};