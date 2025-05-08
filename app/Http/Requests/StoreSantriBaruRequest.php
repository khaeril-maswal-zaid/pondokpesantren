<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSantriBaruRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nik' => 'required|unique:santri_barus,nik',
            'namaLengkap' => 'required',
            'tempatLahir' => 'required',
            'tanggalLahir' => 'required|date',
            'jenisKelamin' => 'required|in:Laki-laki,Perempuan',
            'provinsi' => 'required',
            'kabupaten' => 'required',
            'kecamatan' => 'required',
            'desa' => 'required',
            'namaAyah' => 'required',
            'namaIbu' => 'required',
            'pekerjaanAyah' => 'required',
            'pekerjaanIbu' => 'required',
            'kontakAyah' => 'required',
            'kontakIbu' => 'required',
            'namaSekolah' => 'required',
            'nisn' => 'nullable',
            'tahunTamat' => 'required',
            'foto' => '',
        ];
    }
}
