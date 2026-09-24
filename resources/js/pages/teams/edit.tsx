import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import TeamForm from '@/components/team-form';
import { index, update } from '@/routes/teams';

type Team = { id: number; name: string; label: string; description: string | null };
export default function EditTeam({ team }: { team: Team }) { return <div className="space-y-6 p-4 md:p-8"><Head title={`Edit ${team.name}`} /><Heading title={`Edit ${team.name}`} description="Update the exact team information shown to assigned users." /><TeamForm action={update.form(team)} team={team} /></div>; }
EditTeam.layout = { breadcrumbs: [{ title: 'Edit team', href: index() }] };