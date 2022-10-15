import React, { useEffect, useState } from 'react';
import { notifications } from '../../../DummyData/DummyData';

const NotificationComponent = () => {
    const [notifys, setNotifys] = useState([]);

    useEffect(() => {
        setNotifys(notifications)
    }, [])
    return (
        <ul className='flex flex-col gap-3 mt-3'>
            {notifys.map(notiItem => (
                <li key={notiItem.id} className='py-3 cursor-pointer hover:bg-gray-50 px-7'>
                    <span className='font-medium text-lg'>{notiItem.notify_title}:</span>
                    <span className=' text-lg'>{notiItem.message}</span>
                    <p className='text-gray-500 mt-2'>{notiItem.time} ago</p>
                </li>
            ))}
        </ul>
    );
};

export default NotificationComponent;