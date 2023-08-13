/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

export default function Timer() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const formatTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds();

        useEffect(() => {
            const color = setInterval(() => {
                var r = Math.round(Math.random() * 255);
                var g = Math.round(Math.random() * 255);
                var b = Math.round(Math.random() * 255);
                document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
            }, 5000);

            return () => {
                clearInterval(color);
            };
        }, []);
        return `${hours}:${minutes}:${seconds.toString().padStart(2, '0')}`;
    };


    return (

        <div>
            <p className="font">Current Time: {formatTime(time)}</p>
        </div>
    )
}