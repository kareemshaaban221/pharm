<?php

namespace App\Http\Requests\Auth;

use App\Http\Requests\BaseRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class LoginRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::guest();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' =>'required|email',
            'password' => ['required', Password::min(8)->numbers()->letters()->mixedCase()->symbols()],
        ];
    }

    public function messages(): array {
        return [
            'required' => '.هذا الحقل مطلوب',
            'email.email' => 'هذا الحقل يجب ان يكون بريد الكتروني صحيح.',
            'password' => [
                'min' => 'هذا الحقل (كلمة المرور) يجب الا يقل عن 8 حروف.',
                'numbers' => 'هذا الحقل (كلمة المرور) يجب ان يحتوي على ارقام.',
                'letters' => 'هذا الحقل (كلمة المرور) يجب ان يحتوي على حروف.',
                'mixedCase' => 'هذا الحقل (كلمة المرور) يجب ان يحتوي على حرف كبير و حرف صغير.',
                'symbols' => 'هذا الحقل (كلمة المرور) يجب ان يحتوي على رموز.',
            ],
        ];
    }
}
