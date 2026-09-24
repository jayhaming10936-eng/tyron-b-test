<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $superAdminEmail = config('auth.super_admin_email');

        foreach (['Super Admin', 'Admin', 'User'] as $role) {
            Role::findOrCreate($role);
        }

        User::role('Super Admin')
            ->where('email', '!=', $superAdminEmail)
            ->get()
            ->each(fn (User $user) => $user->syncRoles(['User']));

        $accounts = [
            ['name' => 'Tyron Bengil', 'email' => $superAdminEmail, 'role' => 'Super Admin', 'password' => 'SEED_SUPER_ADMIN_PASSWORD'],
            ['name' => 'Admin User', 'email' => 'admin@example.com', 'role' => 'Admin', 'password' => 'SEED_ADMIN_PASSWORD'],
            ['name' => 'Regular User', 'email' => 'user@example.com', 'role' => 'User', 'password' => 'SEED_USER_PASSWORD'],
        ];

        foreach ($accounts as $account) {
            $password = env($account['password']);
            $user = User::updateOrCreate(
                ['email' => $account['email']],
                [
                    'name' => $account['name'],
                    'password' => Hash::make($password ?: throw new \RuntimeException("Set {$account['password']} in .env before seeding.")),
                    'email_verified_at' => now(),
                ],
            );

            $user->syncRoles([$account['role']]);
        }
    }
}
