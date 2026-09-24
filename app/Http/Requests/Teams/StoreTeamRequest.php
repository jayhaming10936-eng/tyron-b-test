<?php

namespace App\Http\Requests\Teams;

use App\Models\Team;
use Illuminate\Foundation\Http\FormRequest;

class StoreTeamRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('create', Team::class) ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'label' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:2000'],
        ];
    }
}
