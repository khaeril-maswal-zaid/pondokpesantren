import { JadwalPendaftaranManager } from '@/components/dashboard/jadwal-pendaftaran/manager';

export default function JadwalPendaftaranPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Jadwal Pendaftaran</h1>
                <p className="text-muted-foreground">Kelola jadwal kegiatan pendaftaran gelombang 1 dan 2</p>
            </div>

            <JadwalPendaftaranManager />
        </div>
    );
}
