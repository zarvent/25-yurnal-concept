'use client';

import { useEffect, useState } from 'react';

export function GreetingSection() {
    const [greeting, setGreeting] = useState('');
    const [quote, setQuote] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setGreeting('Buenos días');
        } else if (hour < 19) {
            setGreeting('Buenas tardes');
        } else {
            setGreeting('Buenas noches');
        }

        const motivationalQuotes = [
            "La única persona que estás destinado a ser es la persona que decides ser.",
            "El autoconocimiento es el primer paso hacia la automejora.",
            "Cada día es una nueva oportunidad para cambiar tu vida.",
            "El cuidado personal es cómo recuperas tu poder.",
            "No tienes que ver toda la escalera, solo da el primer paso.",
            "Tu viaje interior es la aventura más importante que emprenderás."
        ];
        setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{greeting && `${greeting}, bienvenido a tu espacio.`}</h1>
            <p className="text-muted-foreground mt-1">{quote || ' '}</p>
        </div>
    );
}
