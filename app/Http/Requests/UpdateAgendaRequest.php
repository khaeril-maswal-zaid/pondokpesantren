<?php

namespace App\Http\Requests;

use App\Rules\ValidBase64Image;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAgendaRequest extends FormRequest
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
            'nama_agenda' => 'required|string|max:255',
            'date' => 'required|date',
            'time1' => 'nullable|string',
            'time2' => 'nullable|string',
            'lokasi' => 'required|string|max:20',
            'lokasi' => 'required|string|max:20',
            'foto' => ['required', 'string', new ValidBase64Image],
        ];
    }
}
