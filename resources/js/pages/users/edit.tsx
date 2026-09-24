import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import UserForm from '@/components/user-form';
import { index, update } from '@/routes/users';

type User = { id: number; name: string; email: string; role: string; team?: { id: number; name: string; label: string } | null };
export default function EditUser({ user, canChangeRole, canAssignTeam, teams }: { user: User; canChangeRole: boolean; canAssignTeam: boolean; teams: { id: number; name: string; label: string }[] }) {
    return <div className="space-y-6 p-4 md:p-8"><Head title={`Edit ${user.name}`} /><Heading title={`Edit ${user.name}`} description="Update account information without changing the password." /><UserForm action={update.form(user)} user={user} canChangeRole={canChangeRole} canAssignTeam={canAssignTeam} teams={teams} /></div>;
}

EditUser.layout = { breadcrumbs: [{ title: 'Edit user', href: index() }] };