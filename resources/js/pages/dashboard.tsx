import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, Building2, ShieldCheck, UserRound, UsersRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useInitials } from '@/hooks/use-initials';
import { dashboard } from '@/routes';
import { index as usersIndex } from '@/routes/users';

type Stats = Record<'total_users' | 'total_admins' | 'total_super_admins' | 'total_accounts', number>;

export default function Dashboard({ stats, team }: { stats: Stats | null; team: { name: string; label: string; description: string | null } | null }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const getInitials = useInitials();
    const statisticCards: [string, number, string, LucideIcon, string][] = [
        ['Total users', stats?.total_users ?? 0, 'People with standard access', UsersRound, 'bg-sky-100 text-sky-700'],
        ['Total admins', stats?.total_admins ?? 0, 'Operational administrators', ShieldCheck, 'bg-violet-100 text-violet-700'],
        ['Super admins', stats?.total_super_admins ?? 0, 'Full platform access', UserRound, 'bg-amber-100 text-amber-700'],
        ['Registered accounts', stats?.total_accounts ?? 0, 'All workspace accounts', Building2, 'bg-emerald-100 text-emerald-700'],
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 py-8 md:px-8 md:py-10">
                <div className="pointer-events-none absolute -top-24 right-8 size-72 rounded-full bg-blue-400/10 blur-3xl" />
                <div className="relative mx-auto max-w-7xl space-y-10">
                    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                        <div className="flex items-center gap-4">
                            <Avatar className="size-16 border-4 border-white/80 shadow-lg ring-1 ring-blue-200 dark:border-slate-900 dark:ring-blue-900">
                                <AvatarImage src={user?.avatar ?? undefined} alt={`${user?.name ?? 'User'} profile picture`} className="object-cover" />
                                <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">{getInitials(user?.name ?? '')}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-3">
                                <p className="text-primary text-xs font-semibold tracking-[0.22em] uppercase">Overview</p>
                                <h1 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl dark:text-white">Good to see you, {user?.name?.split(' ')[0]}.</h1>
                                <p className="text-muted-foreground max-w-xl text-sm md:text-base">Here is what is happening across your account workspace today.</p>
                            </div>
                        </div>
                        {user?.can_manage_users && <Button asChild size="lg" className="shadow-lg shadow-blue-900/15"><Link href={usersIndex()}>User Management <ArrowUpRight /></Link></Button>}
                    </div>
                {stats ? (
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {statisticCards.map(([label, value, detail, Icon, tone]) => (
                            <Card key={label as string} className="group border-white/70 bg-white/75 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 dark:border-white/10 dark:bg-slate-900/70">
                                <CardContent className="flex items-start justify-between gap-4 p-6">
                                    <div className="space-y-5"><p className="text-muted-foreground text-sm font-medium">{label}</p><p className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{value}</p><p className="text-muted-foreground text-xs">{detail}</p></div>
                                    <div className={`rounded-2xl p-3 ${tone}`}><Icon className="size-5" /></div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="max-w-2xl border-white/70 bg-white/75 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70">
                        <CardContent className="p-7"><p className="mb-2 text-lg font-semibold">Your workspace</p><p className="text-muted-foreground text-sm">Manage your profile and security settings from the sidebar.</p></CardContent>
                    </Card>
                )}
                {team && <Card className="border-white/70 bg-white/75 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-900/70"><CardContent className="p-7"><div className="flex items-start justify-between gap-4"><div><p className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">Your team</p><p className="mt-2 text-xl font-semibold">{team.name}</p><p className="text-primary mt-1 text-sm font-medium">{team.label}</p><p className="text-muted-foreground mt-3 text-sm">{team.description}</p></div></div></CardContent></Card>}
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
