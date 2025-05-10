// wilayah.ts

export const getProvinsiName = async (provId: string) => {
    const res = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
    const data = await res.json();
    const provinsi = data.find((prov: any) => prov.id === provId);
    return provinsi?.name || 'Provinsi tidak ditemukan';
};

export const getKabupatenName = async (kabId: string, provId: string) => {
    const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provId}.json`);
    const data = await res.json();
    const kabupaten = data.find((kab: any) => kab.id === kabId);
    return kabupaten?.name || 'Kabupaten tidak ditemukan';
};

export const getKecamatanName = async (kecId: string, kabId: string) => {
    const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kabId}.json`);
    const data = await res.json();
    const kecamatan = data.find((kec: any) => kec.id === kecId);
    return kecamatan?.name || 'Kecamatan tidak ditemukan';
};

export const getDesaName = async (desaId: string, kecId: string) => {
    const res = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecId}.json`);
    const data = await res.json();
    const desa = data.find((d: any) => d.id === desaId);
    return desa?.name || 'Desa tidak ditemukan';
};
