import { Form, Head, Link, usePage } from '@inertiajs/react';
import { Eye, Pencil, Plus, Trash2, UsersRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { destroy, edit, index, show, create } from '@/routes/users';

type User = { id: number; name: string; email: string; role: string; created_at: string | null; is_protected: boolean; team?: { name: string; label: string } | null };
type Pagination = { data: User[]; links: { url: string | null; label: string; active: boolean }[] };

export default function UsersIndex({ users }: { users: Pagination }) {
    const { flash } = usePage().props;
    return (
        <>
            <Head title="User Management" />
            <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 py-8 md:px-8 md:py-10">
                <div className="relative mx-auto max-w-7xl space-y-8">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div className="space-y-3"><p className="text-primary text-xs font-semibold tracking-[0.22em] uppercase">Administration</p><h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">User Management</h1><p className="text-muted-foreground text-sm">Manage access, roles, and account details across the workspace.</p></div>
                    <Button asChild size="lg"><Link href={create()}><Plus /> Add user</Link></Button>
                </div>
                {flash.success && <p className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm font-medium text-emerald-700 shadow-sm">{flash.success}</p>}
                <Card className="overflow-hidden border-white/70 bg-white/80 shadow-xl shadow-slate-900/5 backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                    <CardHeader className="border-b border-slate-200/70 px-6 py-5 dark:border-white/10"><div className="flex items-center gap-3"><div className="rounded-xl bg-blue-100 p-2 text-blue-700"><UsersRound className="size-5" /></div><div><CardTitle>Workspace accounts</CardTitle><p className="text-muted-foreground mt-1 text-sm">{users.data.length} accounts shown on this page</p></div></div></CardHeader>
                    <CardContent className="overflow-x-auto p-0">
                        <table className="w-full min-w-[760px] text-left text-sm">
                            <thead className="bg-slate-50/80 text-xs tracking-wide text-muted-foreground uppercase dark:bg-white/5"><tr><th className="px-6 py-4">ID</th><th className="px-6 py-4">Name</th><th className="px-6 py-4">Email</th><th className="px-6 py-4">Role</th><th className="px-6 py-4">Team</th><th className="px-6 py-4">Created</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
                            <tbody>{users.data.map((user) => <tr key={user.id} className="border-t border-slate-200/70 transition-colors hover:bg-blue-50/40 dark:border-white/10 dark:hover:bg-white/5"><td className="px-6 py-4 text-muted-foreground">#{user.id}</td><td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{user.name}</td><td className="px-6 py-4 text-muted-foreground">{user.email}</td><td className="px-6 py-4"><Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">{user.role}{user.is_protected && ' · Protected'}</Badge></td><td className="px-6 py-4">{user.team ? <div><p className="font-medium">{user.team.name}</p><Badge variant="outline" className="mt-1 border-blue-200 bg-blue-50 text-xs text-blue-700">{user.team.label}</Badge></div> : <span className="text-muted-foreground">No team assigned</span>}</td><td className="px-6 py-4 text-muted-foreground">{user.created_at ? new Date(user.created_at).toLocaleDateString() : '—'}</td><td className="px-6 py-4"><div className="flex justify-end gap-1"><Button variant="ghost" size="icon" className="hover:bg-blue-100 hover:text-blue-700" asChild><Link href={show(user)} aria-label={`View ${user.name}`}><Eye /></Link></Button><Button variant="ghost" size="icon" className="hover:bg-blue-100 hover:text-blue-700" asChild><Link href={edit(user)} aria-label={`Edit ${user.name}`}><Pencil /></Link></Button>{!user.is_protected && <Form {...destroy.form(user)} onSubmit={(event) => { if (!window.confirm(`Delete ${user.name}?`)) event.preventDefault(); }}><Button type="submit" variant="ghost" size="icon" className="hover:bg-red-100 hover:text-red-700" aria-label={`Delete ${user.name}`}><Trash2 /></Button></Form>}</div></td></tr>)}</tbody>
                        </table>
                    </CardContent>
                </Card>
                {users.data.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white/50 px-6 py-12 text-center"><p className="font-semibold">No accounts found</p><p className="text-muted-foreground mt-1 text-sm">Create the first account to get started.</p></div>}
                <div className="flex flex-wrap gap-2">{users.links.map((link) => link.url ? <Button key={link.label} variant={link.active ? 'default' : 'outline'} size="sm" asChild><Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} /></Button> : null)}</div>
                </div>
            </div>
        </>
    );
}

UsersIndex.layout = { breadcrumbs: [{ title: 'User Management', href: index() }] };