import { ArrowRight, LockKeyhole, ShieldCheck, UsersRound } from 'lucide-react';
import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen overflow-hidden bg-[#07152f] text-white selection:bg-cyan-300/30">
                <div className="pointer-events-none absolute -left-40 -top-48 size-[34rem] rounded-full bg-blue-500/20 blur-3xl" />
                <div className="pointer-events-none absolute right-[-12rem] top-[-8rem] size-[38rem] rounded-full bg-violet-500/15 blur-3xl" />
                <div className="pointer-events-none absolute bottom-[-20rem] left-1/3 size-[36rem] rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />

                <header className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
                    <Link href={auth.user ? dashboard() : login()} className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-2xl bg-cyan-300 text-[#07152f] shadow-lg shadow-cyan-400/20"><ShieldCheck className="size-5" /></span>
                        <span className="text-sm font-semibold tracking-[0.18em] uppercase">AccessHQ</span>
                    </Link>
                    <nav className="flex items-center gap-3 text-sm">
                        {auth.user ? <Link href={dashboard()} className="rounded-full border border-white/20 px-5 py-2.5 font-medium transition hover:border-cyan-200/60 hover:bg-white/10">Dashboard</Link> : <><Link href={login()} className="rounded-full px-4 py-2.5 text-slate-200 transition hover:text-white">Log in</Link><Link href={register()} className="rounded-full border border-white/20 px-5 py-2.5 font-medium transition hover:border-cyan-200/60 hover:bg-white/10">Register</Link></>}
                    </nav>
                </header>

                <main className="relative mx-auto grid min-h-[calc(100vh-5.5rem)] w-full max-w-7xl items-center gap-14 px-6 pb-16 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-24">
                    <section className="max-w-3xl">
                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3.5 py-2 text-xs font-semibold tracking-[0.16em] text-cyan-100 uppercase"><span className="size-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" /> Secure workspace access</div>
                        <h1 className="max-w-2xl text-5xl leading-[1.04] font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">One calm place to manage every account.</h1>
                        <p className="mt-7 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">A clear, secure control center for teams, roles, and the people who keep your organization moving.</p>
                        <div className="mt-9 flex flex-wrap items-center gap-4">
                            <Link href={auth.user ? dashboard() : login()} className="group inline-flex items-center gap-2 rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-semibold text-[#07152f] shadow-xl shadow-cyan-950/30 transition hover:-translate-y-0.5 hover:bg-cyan-200">Open your workspace <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" /></Link>
                            {!auth.user && <Link href={register()} className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10">Create an account</Link>}
                        </div>
                    </section>

                    <section className="relative mx-auto w-full max-w-md lg:justify-self-end">
                        <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-cyan-300/20 via-blue-500/10 to-violet-400/20 blur-2xl" />
                        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.08] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-8">
                            <div className="mb-12 flex items-center justify-between"><span className="text-sm font-medium text-slate-300">Workspace overview</span><span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">Protected</span></div>
                            <div className="space-y-5"><div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4"><span className="rounded-xl bg-cyan-300/15 p-3 text-cyan-200"><UsersRound className="size-5" /></span><div><p className="font-medium">People & roles</p><p className="mt-1 text-xs text-slate-400">Simple, visible access control</p></div></div><div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4"><span className="rounded-xl bg-violet-300/15 p-3 text-violet-200"><LockKeyhole className="size-5" /></span><div><p className="font-medium">Secure by default</p><p className="mt-1 text-xs text-slate-400">Every action respects your role</p></div></div></div>
                            <div className="mt-10 flex items-end justify-between border-t border-white/10 pt-5"><div><p className="text-3xl font-semibold">24/7</p><p className="mt-1 text-xs text-slate-400">Ready when your team is</p></div><div className="flex -space-x-2"><span className="size-8 rounded-full border-2 border-[#14264a] bg-cyan-200" /><span className="size-8 rounded-full border-2 border-[#14264a] bg-violet-200" /><span className="size-8 rounded-full border-2 border-[#14264a] bg-amber-200" /></div></div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}
