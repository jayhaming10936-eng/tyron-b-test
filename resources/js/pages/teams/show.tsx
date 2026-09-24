import { Head, Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { edit, index } from '@/routes/teams';

type Team = { id: number; name: string; label: string; description: string | null; users: { id: number; name: string; email: string }[] };
export default function ShowTeam({ team, canManage }: { team: Team; canManage: boolean }) { return <><Head title={team.name} /><div className="space-y-6 p-4 md:p-8"><div className="flex items-start justify-between gap-4"><div><p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Team details</p><h1 className="mt-3 text-3xl font-semibold">{team.name}</h1><Badge variant="outline" className="mt-3 border-blue-200 bg-blue-50 text-blue-700">{team.label}</Badge></div>{canManage && <Button asChild><Link href={edit(team)}><Pencil /> Edit</Link></Button>}</div><Card className="max-w-3xl"><CardHeader><CardTitle>About this team</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">{team.description || 'No description provided.'}</p>{canManage && <><h2 className="mt-8 text-sm font-semibold">Assigned users</h2><div className="mt-3 divide-y">{team.users.map((user) => <div key={user.id} className="flex justify-between gap-4 py-3 text-sm"><span className="font-medium">{user.name}</span><span className="text-muted-foreground">{user.email}</span></div>)}</div></>}</CardContent></Card></div></>; }
ShowTeam.layout = { breadcrumbs: [{ title: 'Teams', href: index() }] };