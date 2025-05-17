<?php

namespace App\Http\Requests;

use App\Rules\ValidBase64Image;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBlogRequest extends FormRequest
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
            [
                'title' => 'required|string|min:5|max:200',
                'description' => 'required|string|min:10|max:255',
                'body1' => 'required|string|min:20',
                'body2' => 'nullable|string',
                'mainImage' => ['required', 'string', new ValidBase64Image], // Maks 2MB
                'subImage1' => ['string', new ValidBase64Image],
                'subImage2' => ['string', new ValidBase64Image],
                'tags' => 'required|array|min:1|max:5',
                'tags.*' => 'string'
            ],
            [
                'title.required' => 'Judul wajib diisi',
                'title.min' => 'Judul harus terdiri dari minimal 5 karakter',
                'title.max' => 'Judul tidak boleh lebih dari 200 karakter',

                'description.required' => 'Deskripsi wajib diisi',
                'description.min' => 'Deskripsi harus terdiri dari minimal 10 karakter',
                'description.max' => 'Deskripsi tidak boleh lebih dari 255 karakter',

                'body1.required' => 'Konten utama wajib diisi',
                'body1.min' => 'Konten utama harus minimal 20 karakter',

                'mainImage.required' => 'Wajib unggah gambar utama',
                'mainImage.image' => 'Gambar utama harus berupa file gambar',
                'mainImage.mimes' => 'Gambar utama harus berformat JPG atau PNG',
                'mainImage.max' => 'Ukuran gambar utama maksimal 500kb',

                'subImage1.image' => 'Sub gambar 1 harus berupa file gambar',
                'subImage1.mimes' => 'Sub gambar 1 harus berformat JPG atau PNG',
                'subImage1.max' => 'Ukuran sub gambar 1 maksimal 500kb',

                'subImage2.image' => 'Sub gambar 2 harus berupa file gambar',
                'subImage2.mimes' => 'Sub gambar 2 harus berformat JPG atau PNG',
                'subImage2.max' => 'Ukuran sub gambar 2 maksimal 500kb',

                'tags.required' => 'Minimal satu tag harus dipilih',
                'tags.array' => 'Tag harus dalam bentuk array',
                'tags.min' => 'Minimal satu tag harus dipilih',
                'tags.max' => 'Maksimal 5 tag yang diperbolehkan',
                'tags.*.string' => 'Setiap tag harus berupa teks',
            ]
        ];
    }
}
