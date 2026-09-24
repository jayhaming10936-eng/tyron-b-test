<?php

namespace App\Http\Controllers;

use App\Http\Requests\Teams\StoreTeamRequest;
use App\Http\Requests\Teams\UpdateTeamRequest;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    public function index(): Response
    {
        $this->authorize('viewAny', Team::class);

        return Inertia::render('teams/index', [
            'teams' => Team::query()->withCount('users')->latest()->get()->map(fn (Team $team): array => $this->present($team)),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Team::class);

        return Inertia::render('teams/create');
    }

    public function store(StoreTeamRequest $request): RedirectResponse
    {
        Team::create($request->validated());

        return to_route('teams.index')->with('success', 'Team created successfully.');
    }

    public function show(Team $team): Response
    {
        $this->authorize('view', $team);

        if (auth()->user()->isSuperAdmin()) {
            $team->load('users:id,name,email,team_id');
        }

        return Inertia::render('teams/show', [
            'team' => $this->present($team),
            'canManage' => auth()->user()->isSuperAdmin(),
        ]);
    }

    public function edit(Team $team): Response
    {
        $this->authorize('update', $team);

        return Inertia::render('teams/edit', ['team' => $this->present($team)]);
    }

    public function update(UpdateTeamRequest $request, Team $team): RedirectResponse
    {
        $team->update($request->validated());

        return to_route('teams.show', $team)->with('success', 'Team updated successfully.');
    }

    public function destroy(Team $team): RedirectResponse
    {
        $this->authorize('delete', $team);
        $team->delete();

        return to_route('teams.index')->with('success', 'Team deleted successfully.');
    }

    private function present(Team $team): array
    {
        return [
            'id' => $team->id,
            'name' => $team->name,
            'label' => $team->label,
            'description' => $team->description,
            'users_count' => $team->users_count ?? $team->users->count(),
            'users' => $team->relationLoaded('users') ? $team->users->map(fn ($user): array => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ])->values() : [],
        ];
    }
}
