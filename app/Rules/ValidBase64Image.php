<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidBase64Image implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        //
    }

    public function passes($attribute, $value): bool
    {
        if (!is_string($value)) return false;

        if (!preg_match('/^data:image\/(jpeg|png|jpg);base64,/', $value)) {
            return false;
        }

        [, $data] = explode(',', $value);
        $decoded = base64_decode($data, true);

        if ($decoded === false) return false;

        $finfo = finfo_open();
        $mime = finfo_buffer($finfo, $decoded, FILEINFO_MIME_TYPE);
        finfo_close($finfo);

        return in_array($mime, ['image/jpeg', 'image/png']);
    }

    public function message(): string
    {
        return 'Gambar base64 tidak valid atau bukan format jpeg/png.';
    }
}
