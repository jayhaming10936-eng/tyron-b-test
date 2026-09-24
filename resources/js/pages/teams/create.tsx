import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import TeamForm from '@/components/team-form';
import { create, store } from '@/routes/teams';

export default function CreateTeam() { return <div className="space-y-6 p-4 md:p-8"><Head title="Create team" /><Heading title="Create team" description="Enter the team name, label, and description you want to use." /><TeamForm action={store.form()} /></div>; }
CreateTeam.layout = { breadcrumbs: [{ title: 'Create team', href: create() }] };