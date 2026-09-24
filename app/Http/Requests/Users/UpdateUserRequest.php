<?php

namespace App\Http\Requests\Users;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        $user = $this->user();
        $target = $this->route('user');

        return $user instanceof User
            && $target instanceof User
            && $user->can('update', $target)
            && ! ($user->isAdmin() && $this->has('role'))
            && ! ($target->isProtectedSuperAdmin()
                && $this->filled('role')
                && $this->input('role') !== 'Super Admin')
            && ! ($user->isAdmin() && $this->has('team_id'));
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($this->route('user')),
            ],
            'role' => [
                'sometimes',
                Rule::in(['Super Admin', 'Admin', 'User']),
                function (string $attribute, mixed $value, \Closure $fail): void {
                    $target = $this->route('user');

                    if ($value === 'Super Admin' && ! $target?->isProtectedSuperAdmin()) {
                        $fail('The protected Super Admin account cannot be duplicated.');
                    }
                },
            ],
            'team_id' => ['nullable', 'integer', 'exists:teams,id'],
        ];
    }
}
