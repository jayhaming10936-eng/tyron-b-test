import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = { action: { action: string; method: 'post' }; team?: { name: string; label: string; description: string | null } };

export default function TeamForm({ action, team }: Props) {
    return <Form {...action} className="max-w-2xl space-y-6 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur md:p-8 dark:border-white/10 dark:bg-slate-900/70">{({ processing, errors }) => <><div className="grid gap-2"><Label htmlFor="name">Team name</Label><Input id="name" name="name" defaultValue={team?.name} required /><InputError message={errors.name} /></div><div className="grid gap-2"><Label htmlFor="label">Team label</Label><Input id="label" name="label" defaultValue={team?.label} required /><InputError message={errors.label} /></div><div className="grid gap-2"><Label htmlFor="description">Description</Label><textarea id="description" name="description" defaultValue={team?.description ?? ''} rows={5} className="border-input bg-background rounded-md border px-3 py-2 text-sm shadow-xs outline-none focus:ring-2 focus:ring-blue-500/30" /><InputError message={errors.description} /></div><Button type="submit" disabled={processing}>{team ? 'Save changes' : 'Create team'}</Button></>}</Form>;
}