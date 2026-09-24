import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#07152f] p-6 text-white md:p-10">
            <div className="pointer-events-none absolute -left-40 -top-48 size-[34rem] rounded-full bg-blue-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 bottom-[-16rem] size-[32rem] rounded-full bg-violet-500/20 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:72px_72px]" />
            <div className="relative w-full max-w-md">
                <div className="flex flex-col gap-7 rounded-[2rem] border border-white/15 bg-white/[0.09] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex size-12 items-center justify-center rounded-2xl bg-cyan-300 text-[#07152f] shadow-lg shadow-cyan-400/20">
                                <AppLogoIcon className="size-7 fill-current" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
                            <p className="text-center text-sm text-slate-300">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
