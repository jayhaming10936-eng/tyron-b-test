import { Link, usePage } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid, Users, UsersRound } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { index as usersIndex } from '@/routes/users';
import { index as teamsIndex, show as teamShow } from '@/routes/teams';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<{ auth: { user: { can_manage_users: boolean; team?: { id: number } | null } | null } }>().props;
    const mainItems = [
        ...mainNavItems,
        ...(auth.user?.can_manage_users ? [{ title: 'User Management', href: usersIndex(), icon: Users }] : []),
        ...(auth.user?.can_manage_users ? [{ title: 'Teams', href: teamsIndex(), icon: UsersRound }] : []),
        ...(auth.user?.team ? [{ title: 'My Team', href: teamShow(auth.user.team.id), icon: UsersRound }] : []),
    ];

    return (
        <Sidebar collapsible="icon" variant="inset" className="border-sidebar-border/70">
            <SidebarHeader className="border-sidebar-border/70 border-b px-3 py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="hover:bg-sidebar-accent" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="px-2 py-4">
                <NavMain items={mainItems} />
            </SidebarContent>

            <SidebarFooter className="border-sidebar-border/70 gap-3 border-t p-3">
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
