<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isSuperAdmin() || $user->isAdmin();
    }

    public function view(User $user, User $target): bool
    {
        return $user->isSuperAdmin() || $user->isAdmin() || $user->is($target);
    }

    public function create(User $user): bool
    {
        return $user->isSuperAdmin();
    }

    public function update(User $user, User $target): bool
    {
        if ($target->isProtectedSuperAdmin()) {
            return $user->isSuperAdmin();
        }

        return $user->isSuperAdmin()
            || ($user->isAdmin() && $target->isRegularUser());
    }

    public function delete(User $user, User $target): bool
    {
        return $user->isSuperAdmin()
            && ! $target->isSuperAdmin()
            && ! $target->isProtectedSuperAdmin();
    }

    public function deleteAccount(User $user, User $target): bool
    {
        return $user->is($target) && ! $target->isSuperAdmin();
    }
}
