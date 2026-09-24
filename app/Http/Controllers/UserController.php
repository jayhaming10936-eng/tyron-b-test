<?php

namespace App\Http\Controllers;

use App\Http\Requests\Users\StoreUserRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', User::class);

        $users = User::query()
            ->with(['roles:id,name', 'team:id,name,label'])
            ->latest()
            ->paginate(12)
            ->through(fn (User $user): array => $this->present($user));

        return Inertia::render('users/index', ['users' => $users]);
    }

    public function create(): Response
    {
        $this->authorize('create', User::class);

        return Inertia::render('users/create', [
            'teams' => Team::query()->orderBy('name')->get(['id', 'name', 'label']),
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $this->authorize('create', User::class);

        $user = User::create($request->safe()->only(['name', 'email', 'password', 'team_id']));
        $user->assignRole($request->validated('role'));

        return to_route('users.index')->with('success', 'User created successfully.');
    }

    public function show(User $user): Response
    {
        $this->authorize('view', $user);

        return Inertia::render('users/show', ['user' => $this->present($user)]);
    }

    public function edit(User $user): Response
    {
        $this->authorize('update', $user);

        return Inertia::render('users/edit', [
            'user' => $this->present($user),
            'canChangeRole' => auth()->user()->isSuperAdmin() && ! $user->isProtectedSuperAdmin(),
            'canAssignTeam' => auth()->user()->isSuperAdmin(),
            'teams' => Team::query()->orderBy('name')->get(['id', 'name', 'label']),
        ]);
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $this->authorize('update', $user);

        $user->fill($request->safe()->only(['name', 'email']));

        if (auth()->user()->isSuperAdmin() && $request->has('team_id')) {
            $user->team_id = $request->validated('team_id');
        }

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        if (auth()->user()->isSuperAdmin() && $request->filled('role') && ! $user->isProtectedSuperAdmin()) {
            $user->syncRoles([$request->validated('role')]);
        }

        return to_route('users.show', $user)->with('success', 'User updated successfully.');
    }

    public function destroy(User $user): RedirectResponse
    {
        $this->authorize('delete', $user);
        $user->delete();

        return to_route('users.index')->with('success', 'User deleted successfully.');
    }

    /** @return array<string, mixed> */
    private function present(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->roleName(),
            'is_protected' => $user->isProtectedSuperAdmin(),
            'team' => $user->team ? [
                'id' => $user->team->id,
                'name' => $user->team->name,
                'label' => $user->team->label,
            ] : null,
            'created_at' => $user->created_at?->toDateTimeString(),
        ];
    }
}
