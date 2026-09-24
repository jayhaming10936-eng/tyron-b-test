import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import UserForm from '@/components/user-form';
import { create, store } from '@/routes/users';

export default function CreateUser({ teams }: { teams: { id: number; name: string; label: string }[] }) {
    return <div className="space-y-6 p-4 md:p-8"><Head title="Add user" /><Heading title="Add user" description="Create an Admin or User account." /><UserForm action={store.form()} teams={teams} /></div>;
}

CreateUser.layout = { breadcrumbs: [{ title: 'Add user', href: create() }] };