import { Head, Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { edit, index } from '@/routes/users';

type User = { id: number; name: string; email: string; role: string; created_at: string | null; team?: { name: string; label: string } | null };
export default function ShowUser({ user }: { user: User }) {
    return <><Head title={user.name} /><div className="space-y-6 p-4 md:p-8"><div className="flex items-center justify-between"><div><p className="text-muted-foreground text-sm">User details</p><h1 className="text-3xl font-semibold">{user.name}</h1></div><Button asChild><Link href={edit(user)}><Pencil /> Edit</Link></Button></div><Card className="max-w-2xl"><CardHeader><CardTitle>Account information</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2"><div><p className="text-muted-foreground text-sm">Email</p><p>{user.email}</p></div><div><p className="text-muted-foreground text-sm">Role</p><Badge variant="outline">{user.role}</Badge></div><div><p className="text-muted-foreground text-sm">Team</p>{user.team ? <div><p className="font-medium">{user.team.name}</p><Badge variant="outline" className="mt-1 border-blue-200 bg-blue-50 text-blue-700">{user.team.label}</Badge></div> : <p className="text-muted-foreground">No team assigned</p>}</div><div><p className="text-muted-foreground text-sm">Created</p><p>{user.created_at ? new Date(user.created_at).toLocaleString() : '—'}</p></div></CardContent></Card></div></>;
}

ShowUser.layout = { breadcrumbs: [{ title: 'User Management', href: index() }] };