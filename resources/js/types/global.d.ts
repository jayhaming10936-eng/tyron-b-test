import type { Auth } from '@/types/auth';

declare module 'react' {
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: { user: Auth['user'] | null };
            sidebarOpen: boolean;
            flash: { success?: string };
            [key: string]: unknown;
        };
    }
}
