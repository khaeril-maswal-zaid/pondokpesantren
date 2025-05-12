import Footer from '@/components/ponpes/footer';
import HeroPage from '@/components/ponpes/hero-page-auth';
import Navbar from '@/components/ponpes/navbar';
import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

export default function AuthLayout({ children, title, description, ...props }: { children: React.ReactNode; title: string; description: string }) {
    return (
        <>
            <HeroPage />
            <Navbar />
            <AuthLayoutTemplate title={title} description={description} {...props}>
                {children}
            </AuthLayoutTemplate>
            <Footer />
        </>
    );
}
