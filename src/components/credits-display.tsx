import React from 'react';

export const CreditsDisplay = () => (
  <div className="text-center text-muted-foreground py-8 px-4">
    <p className="text-sm">Un proyecto desarrollado por</p>
    <p className="text-lg font-bold text-foreground">Zarvent Labs</p>
    <div className="my-4 h-[1px] w-20 bg-border mx-auto" />
    <p className="text-sm">Bajo la visión y arquitectura de</p>
    <p className="text-lg font-bold text-foreground">Cesar Sebastian Zambrana Ventura</p>
    <div className="my-6" />
    <p className="text-sm italic">
      "Tecnología y bienestar que se esfuerza en ayudarte"
    </p>
  </div>
);
