
import { useEffect, useState } from 'react';
import Notification from '../notification/Notification';
import Navbar from '../essentials/Navbar';

const NotificationPage = () => {
    const [data, setData] = useState([]);
    const backapi = 'http://localhost:5000';
    const [notify, setNotify]=useState(false)
    const [shopid, setShopid] = useState(localStorage.getItem("shopid"))

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${backapi}/api/auth/notifications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({shopid: `${shopid}`})
            });

            if (response.ok) {
                const result = await response.json();
                console.log("result", result)
                if(result.notificationFound)
                {
                    setData(result.data);
                    setNotify(true)
                }
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            {notify ? <Notification notification={data}/>: <Navbar></Navbar> }
        </div>
    );
};

export default NotificationPage;
