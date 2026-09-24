import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
    action: { action: string; method: 'post' };
    user?: { id: number; name: string; email: string; role: string; team?: { id: number; name: string; label: string } | null };
    canChangeRole?: boolean;
    canAssignTeam?: boolean;
    teams?: { id: number; name: string; label: string }[];
};

export default function UserForm({ action, user, canChangeRole = true, canAssignTeam = true, teams = [] }: Props) {
    return (
        <Form {...action} className="max-w-2xl space-y-6 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur md:p-8 dark:border-white/10 dark:bg-slate-900/70">
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full name</Label>
                        <Input id="name" name="name" className="bg-white/70 dark:bg-white/5" defaultValue={user?.name} required />
                        <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input id="email" name="email" type="email" className="bg-white/70 dark:bg-white/5" defaultValue={user?.email} required />
                        <InputError message={errors.email} />
                    </div>
                    {!user && (
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <PasswordInput id="password" name="password" autoComplete="new-password" required />
                            <InputError message={errors.password} />
                        </div>
                    )}
                    {!user && (
                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>
                            <PasswordInput id="password_confirmation" name="password_confirmation" autoComplete="new-password" required />
                        </div>
                    )}
                    {canChangeRole && (
                        <div className="grid gap-2">
                            <Label htmlFor="role">Role</Label>
                            <select id="role" name="role" defaultValue={user?.role ?? 'User'} className="border-input bg-background h-10 rounded-md border px-3 text-sm shadow-xs outline-none focus:ring-2 focus:ring-blue-500/30">
                                <option value="Super Admin">Super Admin</option>
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                            <InputError message={errors.role} />
                        </div>
                    )}
                    {canAssignTeam && (
                        <div className="grid gap-2">
                            <Label htmlFor="team_id">Team</Label>
                            <select id="team_id" name="team_id" defaultValue={user?.team?.id ?? ''} className="border-input bg-background h-10 rounded-md border px-3 text-sm shadow-xs outline-none focus:ring-2 focus:ring-blue-500/30">
                                {teams.length === 0 ? <option value="" disabled>No teams available</option> : <option value="">No team assigned</option>}
                                {teams.map((team) => <option key={team.id} value={team.id}>{team.name} · {team.label}</option>)}
                            </select>
                            <InputError message={errors.team_id} />
                        </div>
                    )}
                    <Button type="submit" disabled={processing}>
                        {user ? 'Save changes' : 'Create user'}
                    </Button>
                </>
            )}
        </Form>
    );
}