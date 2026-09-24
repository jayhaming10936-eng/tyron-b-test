<?php

namespace Tests\Feature;

use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class TeamManagementTest extends TestCase
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

    public function test_super_admin_can_create_and_update_custom_team_values(): void
    {
        $superAdmin = User::factory()->create();
        $superAdmin->assignRole('Super Admin');

        $this->actingAs($superAdmin)->post(route('teams.store'), [
            'name' => 'Operations North',
            'label' => 'Night Shift',
            'description' => 'Handles overnight operations.',
        ])->assertRedirect(route('teams.index'));

        $team = Team::firstOrFail();
        $this->assertSame('Operations North', $team->name);
        $this->assertSame('Night Shift', $team->label);

        $this->actingAs($superAdmin)->put(route('teams.update', $team), [
            'name' => 'Operations Central',
            'label' => 'Core Team',
            'description' => 'Updated description.',
        ])->assertRedirect(route('teams.show', $team));

        $this->assertDatabaseHas('teams', [
            'id' => $team->id,
            'name' => 'Operations Central',
            'label' => 'Core Team',
        ]);
    }

    public function test_super_admin_can_assign_a_team_without_changing_user_role(): void
    {
        $superAdmin = User::factory()->create();
        $superAdmin->assignRole('Super Admin');
        $team = Team::create(['name' => 'Custom Team', 'label' => 'C-1', 'description' => 'Custom.']);
        $user = User::factory()->create();
        $user->assignRole('User');

        $this->actingAs($superAdmin)->put(route('users.update', $user), [
            'name' => $user->name,
            'email' => $user->email,
            'role' => 'User',
            'team_id' => $team->id,
        ])->assertRedirect(route('users.show', $user));

        $this->assertSame($team->id, $user->refresh()->team_id);
        $this->assertTrue($user->hasRole('User'));
    }

    public function test_assigned_user_can_view_but_cannot_manage_their_team(): void
    {
        $superAdmin = User::factory()->create();
        $superAdmin->assignRole('Super Admin');
        $team = Team::create(['name' => 'Custom Team', 'label' => 'C-1', 'description' => 'Custom.']);
        $user = User::factory()->create(['team_id' => $team->id]);
        $user->assignRole('User');

        $this->actingAs($user)->get(route('teams.show', $team))->assertOk();
        $this->actingAs($user)->get(route('teams.index'))->assertForbidden();
        $this->actingAs($user)->put(route('teams.update', $team), [
            'name' => 'Tampered',
            'label' => 'Tampered',
            'description' => 'Tampered',
        ])->assertForbidden();
        $this->actingAs($user)->delete(route('teams.destroy', $team))->assertForbidden();

        $this->actingAs($user)->put(route('users.update', $user), [
            'name' => $user->name,
            'email' => $user->email,
            'team_id' => null,
        ])->assertForbidden();
    }
}
