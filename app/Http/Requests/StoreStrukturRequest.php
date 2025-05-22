<?php

namespace App\Http\Requests;

use App\Rules\ValidBase64Image;
use Illuminate\Foundation\Http\FormRequest;

class StoreStrukturRequest extends FormRequest
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
            'nama' => 'required|string|max:255',
            'role' => 'required|string|max:100',
            'keterangan' => 'nullable|string|max:255',
            'no_hp' => 'required|string|max:20',
            'gender' => 'required|in:Laki-laki,Perempuan',
            'foto' => ['required', 'string', new ValidBase64Image],
        ];
    }
}
