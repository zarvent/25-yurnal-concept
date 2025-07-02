'use client';

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
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import Image from 'next/image';

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://placehold.co/100x100" alt="@usuario" />
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
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuItem>Ajustes</DropdownMenuItem>
           <SheetTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <span>Premium</span>
                <Badge variant="secondary" className="ml-auto">PRO</Badge>
              </DropdownMenuItem>
            </SheetTrigger>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function PremiumModal() {
    return (
        <Sheet>
            <SheetTrigger asChild>
             <Button>
                <span>Premium</span>
                <Badge variant="secondary" className="ml-2">PRO</Badge>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                <SheetTitle>Yurnal Premium</SheetTitle>
                <SheetDescription>
                    Desbloquea todo el potencial de Yurnal con Premium. Accede a todas las plantillas, insights de IA ilimitados y más.
                </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col items-center justify-center py-10">
                    <h3 className="text-lg font-semibold mb-4">Paga con QR Simple</h3>
                    <p className="text-center text-muted-foreground mb-4">
                        Escanea el código QR con tu app de banca móvil en Bolivia para realizar el pago de 35 BOB/mes.
                    </p>
                    <div className="p-4 bg-white rounded-lg shadow-md">
                         <Image src="https://placehold.co/256x256" data-ai-hint="qr code" alt="Código QR Simple" width={256} height={256} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">La activación es inmediata después de la confirmación del pago.</p>
                </div>
            </SheetContent>
        </Sheet>
    )
}
