"use client";
import { useState } from 'react';

interface BodyProps {
    fetchAge: (nameToQuery: string) => Promise<number>;
  }

export default function Body({fetchAge}: BodyProps){
    const [toQuery, setToQuery] = useState<string>("");
    const [age, setAge] = useState(0);

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentName = event.target.value;
        if(currentName.length > 3) {
            setAge(await fetchAge(currentName));
        } else {
            setAge(0);
        }
    }

    return(
        <div className="text-center">
            <input id="nameInput" onChange={handleInputChange} placeholder='Ingresa tu nombre' className="bg-white rounded-md py-2 px-4 text-neutral-500 placeholder-neutral-300" />
            <p className="m-2">
                {age > 0 ? `Hola, Tu nombre tiene ${age} años` : (age === -1 ? "Error de Conexión" : null)}
            </p>
        </div>);
}