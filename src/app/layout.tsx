import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Providers } from "./providers";
import MainHeader from "@/components/layout/main-header";

export const metadata = {
  title: "Yurnal: El Futuro del Bienestar Digital",
  description:
    "La plataforma más avanzada del mundo para Yurnal Pacientes, aprendizaje psicológico y transformación terapéutica. Tecnología de vanguardia al servicio del bienestar humano.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-primary/20 selection:text-primary-foreground">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <MainHeader />
            <div className="flex-1">{children}</div>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
