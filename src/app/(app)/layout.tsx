import MainHeader from '@/components/layout/main-header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <MainHeader />
            <main className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}
