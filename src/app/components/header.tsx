"use client";

import { useEffect, useState } from 'react';

export default function Header(){
    const [currentDateTime, setCurrentDateTime] = useState<string>("");

    const formatDateTime = () => {
        const today = new Date();
        if (today) {
          const month = today.getMonth() + 1;
          const year = today.getFullYear();
          const date = today.getDate();
          const minutes = today.getMinutes();
          const seconds = today.getSeconds();
          const hours = today.getHours();
    
          return `${month}/${date}/${year} at ${hours}:${minutes}:${seconds}`;
        }
        return "";
      };
    
    useEffect (() => {
        const interval = setInterval(() => {
        setCurrentDateTime(formatDateTime());
        }, 1000);
      
        return () => clearInterval(interval);
      }, [])

    return(
        <div className="h-full text-center py-2 text-3xl">
            <h1>Welcome to Lolocar</h1>
            <p className="text-xs m-2">
              {currentDateTime.length > 0 ? currentDateTime : "Cargando..."}
            </p>
        </div>
    );
}