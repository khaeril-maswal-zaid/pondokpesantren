import { SyaratPendaftaranManager } from '@/components/dashboard/syarat-pendaftaran/manager';

export default function SyaratPendaftaranPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Syarat Pendaftaran</h1>
                <p className="text-muted-foreground">Kelola persyaratan umum dan khusus untuk pendaftaran pesantren</p>
            </div>

            <SyaratPendaftaranManager />
        </div>
    );
}
