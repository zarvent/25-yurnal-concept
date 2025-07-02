'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Crown, Zap, Search, FileDown, QrCode, User, Settings } from 'lucide-react';
import { Badge } from './ui/badge';

export function UserNav() {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const pathname = usePathname();
  
  const getBasePath = () => {
    if (pathname.startsWith('/patient')) return '/patient';
    if (pathname.startsWith('/therapist')) return '/therapist';
    if (pathname.startsWith('/student')) return '/student';
    return '/';
  }
  
  const basePath = getBasePath();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://placehold.co/100x100" alt="@usuario" data-ai-hint="user avatar" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Usuario</p>
              <p className="text-xs leading-none text-muted-foreground">
                usuario@ejemplo.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowPremiumModal(true)}>
              <Crown className="mr-2 h-4 w-4 text-yellow-500" />
              <span>Yurnal+</span>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                 <Link href={`${basePath}/settings`}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Ajustes</span>
                 </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <PremiumModal isOpen={showPremiumModal} onOpenChange={setShowPremiumModal} />
    </>
  );
}

function PremiumModal({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: (open: boolean) => void }) {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center justify-center mb-4">
                       <Crown className="h-10 w-10 text-yellow-500" />
                    </div>
                    <DialogTitle className="text-center text-2xl">Desbloquea tu Potencial con Yurnal+</DialogTitle>
                    <DialogDescription className="text-center pt-2">
                        Accede a herramientas avanzadas diseñadas para profundizar tu viaje de autoconocimiento.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="flex items-start gap-4">
                        <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold">Reflexiones de IA Ilimitadas</h4>
                            <p className="text-sm text-muted-foreground">Analiza tus patrones cuantas veces quieras, sin esperas semanales.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary flex-shrink-0 mt-1"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="m10 14-2 2 2 2"></path><path d="m14 18 2-2-2-2"></path></svg>
                        <div>
                            <h4 className="font-semibold">Biblioteca Completa de Plantillas</h4>
                            <p className="text-sm text-muted-foreground">Accede a todas las plantillas terapéuticas (TCC, TDC, etc.) en cualquier momento.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Search className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold">Búsqueda Avanzada en Diario</h4>
                            <p className="text-sm text-muted-foreground">Encuentra entradas por emoción, tema o palabra clave al instante.</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <FileDown className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold">Exportación a PDF y Markdown</h4>
                            <p className="text-sm text-muted-foreground">Lleva tus reflexiones contigo o compártelas de forma segura.</p>
                        </div>
                    </div>
                </div>
                <DialogFooter className="flex-col items-center sm:flex-col sm:items-center">
                    <p className="text-lg font-bold">35 BOB / mes</p>
                    <p className="text-xs text-muted-foreground mb-4">Menos de lo que cuesta una hora de terapia.</p>
                    <Button className="w-full">
                        <QrCode className="mr-2 h-5 w-5"/> Pagar con QR Simple (Próximamente)
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
