<?php

namespace App\Http\Requests;

use App\Rules\ValidBase64Image;
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
            'nik' => 'required|unique:santri_barus,nik|numeric|digits:16',
            'namaLengkap' => 'required|string|max:255',
            'tempatLahir' => 'required|string|max:255',
            'tanggalLahir' => 'required|date',
            'jenisKelamin' => 'required|in:Laki-laki,Perempuan',
            'provinsi' => 'required',
            'kabupaten' => 'required',
            'kecamatan' => 'required',
            'desa' => 'required',
            'namaAyah' => 'required|string|max:255',
            'namaIbu' => 'required|string|max:255',
            'pekerjaanAyah' => 'required|string|max:255',
            'pekerjaanIbu' => 'required|string|max:255',
            'kontakAyah' => 'required|string|max:255',
            'kontakIbu' => 'required|string|max:255',
            'jenjang' => 'required|string|max:255',
            'namaSekolah' => 'nullable',
            'nisn' => 'nullable',
            'tahunTamat' => 'nullable',
            'foto' => ['required', 'string', new ValidBase64Image],
        ];
    }
}
