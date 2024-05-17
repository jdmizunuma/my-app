"use client";
import { useState, useEffect } from 'react';

const Body = () => {
    const [resp, setResp] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [age, setAge] = useState<number>(-1);
    const [dateTime, setDateTime] = useState<string | null>(null); // Inicializa como null
    const [inputValue, setInputValue] = useState<string>(''); // Estado para almacenar el valor del input


    async function getData(name: string): Promise<any> {
        const url = `https://api.agify.io/?name=${name}`;
        const res = await fetch(url);
        console.log(`res ok: ${res.ok}`)
        if (!res.ok) {
          throw new Error(`Failed to fetch data (${res.status} ${res.statusText})`);
        }
    
        return res.json()
    }
    
       
    async function Api(name: string): Promise<any> {
        try {
            const data = await getData(name);
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch data: ${error}`);
        }
    }

    useEffect(() => {
        if (typeof window !== "undefined") { // Asegura que se ejecute solo en el cliente
            const intervalId = setInterval(() => {
                setDateTime(new Date().toLocaleString());
            }, 1000);
        
            // Cleanup the interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, []);

    useEffect(() => {
        // Solo realizamos la solicitud a la API si inputValue tiene más de 3 caracteres
        if (inputValue.length > 3) {
            setResp(Api(inputValue));
        }
    }, [inputValue]); // Ejecutamos este efecto cada vez que inputValue cambie

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value); // Actualizamos el estado de inputValue cuando el usuario escribe en el input
    };

    return (
        <div>
            <div>
                <h3>Welcome to Lolocar</h3>
                {dateTime ?  <p>{dateTime}</p>: <p>Loading dateTime</p>}
            </div>
            <div>
                <label htmlFor="textInput">Introduce un nombre:</label>
                <input
                    className="b-"
                    type="text"
                    id="textInput"
                    value={inputValue}
                    onChange={handleInputChange}
                />
            </div>
            {resp && <p>{`Hola, ${inputValue}. Tu nombre tiene ${age} años`}</p>}
        </div>
    );
}

export default Body;
