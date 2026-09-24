<?php

namespace App\Http\Requests\Teams;

use App\Models\Team;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTeamRequest extends FormRequest
{
    public function authorize(): bool
    {
        $team = $this->route('team');

        return $team instanceof Team && $this->user()?->can('update', $team) === true;
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
