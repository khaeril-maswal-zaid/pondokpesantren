import { FaqManager } from '@/components/dashboard/faq/manager';

export default function FaqPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Pertanyaan Umum (FAQ)</h1>
                <p className="text-muted-foreground">Kelola pertanyaan dan jawaban yang sering ditanyakan</p>
            </div>

            <FaqManager />
        </div>
    );
}
