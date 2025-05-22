import { DokumenPendaftaranManager } from '@/components/dashboard/dokumen-pendaftaran/manager';

export default function DokumenPendaftaranPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dokumen Pendaftaran</h1>
                <p className="text-muted-foreground">Kelola dokumen wajib dan tambahan untuk pendaftaran pesantren</p>
            </div>

            <DokumenPendaftaranManager />
        </div>
    );
}
