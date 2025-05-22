import { AlurPendaftaranManager } from '@/components/dashboard/alur-pendaftaran/manager';

export default function AlurPendaftaranPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Alur Pendaftaran</h1>
                <p className="text-muted-foreground">Kelola langkah-langkah alur pendaftaran pesantren</p>
            </div>

            <AlurPendaftaranManager />
        </div>
    );
}
