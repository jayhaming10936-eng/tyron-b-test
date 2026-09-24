<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutVite();

        foreach (['Super Admin', 'Admin', 'User'] as $role) {
            Role::create(['name' => $role, 'guard_name' => 'web']);
        }
    }

    public function test_registration_assigns_the_default_user_role(): void
    {
        $response = $this->post(route('register'), [
            'name' => 'New User',
            'email' => 'new@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertRedirect();
        $this->assertTrue(User::where('email', 'new@example.com')->firstOrFail()->hasRole('User'));
    }

    public function test_regular_users_cannot_access_user_management(): void
    {
        $user = User::factory()->create();
        $user->assignRole('User');

        $this->actingAs($user)->get(route('users.index'))->assertForbidden();
    }

    public function test_admins_can_manage_regular_users_but_not_roles_or_admins(): void
    {
        $admin = User::factory()->create();
        $admin->assignRole('Admin');
        $regularUser = User::factory()->create();
        $regularUser->assignRole('User');
        $otherAdmin = User::factory()->create();
        $otherAdmin->assignRole('Admin');

        $this->actingAs($admin)->get(route('users.index'))->assertOk();
        $this->actingAs($admin)->put(route('users.update', $regularUser), [
            'name' => 'Updated User',
            'email' => $regularUser->email,
            'role' => 'Admin',
        ])->assertForbidden();
        $this->actingAs($admin)->get(route('users.edit', $otherAdmin))->assertForbidden();
    }

    public function test_super_admin_can_create_and_change_roles_but_cannot_be_deleted(): void
    {
        $superAdmin = User::factory()->create();
        $superAdmin->assignRole('Super Admin');

        $this->actingAs($superAdmin)->post(route('users.store'), [
            'name' => 'Managed Admin',
            'email' => 'managed@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'role' => 'Admin',
        ])->assertRedirect(route('users.index'));

        $managedUser = User::where('email', 'managed@example.com')->firstOrFail();
        $this->assertTrue($managedUser->hasRole('Admin'));

        $this->actingAs($superAdmin)->delete(route('users.destroy', $superAdmin))
            ->assertForbidden();
        $this->assertDatabaseHas('users', ['id' => $superAdmin->id]);
    }

    public function test_designated_super_admin_cannot_be_demoted_or_deleted(): void
    {
        $actor = User::factory()->create();
        $actor->assignRole('Super Admin');
        $protected = User::factory()->create([
            'name' => 'Tyron Bengil',
            'email' => config('auth.super_admin_email'),
        ]);
        $protected->assignRole('Super Admin');

        $this->actingAs($actor)->put(route('users.update', $protected), [
            'name' => $protected->name,
            'email' => $protected->email,
            'role' => 'Admin',
        ])->assertForbidden();

        $this->actingAs($actor)->delete(route('users.destroy', $protected))
            ->assertForbidden();

        $this->assertTrue($protected->refresh()->hasRole('Super Admin'));
        $this->assertDatabaseHas('users', ['id' => $protected->id]);
    }
}
