
import { useEffect, useState } from 'react';
import Notification from '../Components/Notification';

const NotificationPage = () => {
    const [data, setData] = useState([]);
    const backapi = 'http://localhost:5000';
    const [notify, setNotify]=useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${backapi}/api/auth/notifications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
              
            });

            if (response.ok) {
                const result = await response.json();
                console.log("result", result)
                setData(result.data);
            }
        };

        fetchData();
    }, []);

    useEffect(()=> {
      setNotify(true)
      console.log(data,"dataaaaaaaaaaaaaaaaa")
    },[data])

    return (
        <div>
            {notify ? <Notification notification={data}/>: <></> }
        </div>
    );
};

export default NotificationPage;
