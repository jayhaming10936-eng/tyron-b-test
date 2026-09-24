<?php

namespace App\Policies;

use App\Models\Team;
use App\Models\User;

class TeamPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    public function view(User $user, Team $team): bool
    {
        return $user->isSuperAdmin() || $user->team?->is($team) === true;
    }

    public function create(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    public function update(User $user, Team $team): bool
    {
        return $user->isSuperAdmin();
    }

    public function delete(User $user, Team $team): bool
    {
        return $user->isSuperAdmin();
    }
}
