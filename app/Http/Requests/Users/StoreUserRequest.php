<?php

namespace App\Http\Requests\Users;

use App\Concerns\PasswordValidationRules;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    use PasswordValidationRules;

    public function authorize(): bool
    {
        return $this->user()?->can('create', User::class) ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => $this->passwordRules(),
            'role' => [
                'required',
                Rule::in(['Super Admin', 'Admin', 'User']),
                function (string $attribute, mixed $value, \Closure $fail): void {
                    if ($value === 'Super Admin') {
                        $fail('The protected Super Admin account already exists.');
                    }
                },
            ],
            'team_id' => ['nullable', 'integer', 'exists:teams,id'],
        ];
    }
}
