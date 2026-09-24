import { Form, Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
/* @chisel-email-verification */
import { Link } from '@inertiajs/react';
/* @end-chisel-email-verification */
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/profile';
import { update } from '@/routes/profile';
import type { Auth } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
/* @chisel-email-verification */
import { send } from '@/routes/verification';
/* @end-chisel-email-verification */

type PageProps = {
    auth: Auth;
};

export default function Profile(
    /* @chisel-email-verification */
    {
        mustVerifyEmail,
        status,
    }: {
        mustVerifyEmail: boolean;
        status?: string;
    },
    /* @end-chisel-email-verification */
) {
    const { auth } = usePage<PageProps>().props;
    const getInitials = useInitials();
    const [preview, setPreview] = useState<string | null>(null);

    const displayedAvatar = preview ?? auth.user.avatar;
    const handleAvatarChange = (file: File | undefined) => {
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeAvatar = () => {
        setPreview(null);
        router.patch(update.url(), { remove_avatar: true }, { preserveScroll: true });
    };

    return (
        <>
            <Head title="Profile settings" />

            <h1 className="sr-only">Profile settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Profile"
                    description="Update your name and email address"
                />

                <Form
                    {...ProfileController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                    className="space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="border-border/70 bg-card/75 flex flex-col gap-5 rounded-2xl border p-5 shadow-sm backdrop-blur sm:flex-row sm:items-center">
                                <Avatar className="size-24 shrink-0 border-4 border-background shadow-lg ring-1 ring-blue-200 dark:ring-blue-900">
                                    <AvatarImage src={displayedAvatar ?? undefined} alt={`${auth.user.name} profile picture`} className="object-cover" />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">{getInitials(auth.user.name)}</AvatarFallback>
                                </Avatar>
                                <div className="min-w-0 flex-1 space-y-1">
                                    <p className="text-lg font-semibold">{auth.user.name}</p>
                                    <p className="text-muted-foreground text-sm">{auth.user.role}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <Button type="button" variant="outline" asChild>
                                            <label htmlFor="avatar" className="cursor-pointer">{auth.user.avatar ? 'Change picture' : 'Upload picture'}</label>
                                        </Button>
                                        {auth.user.avatar && <Button type="button" variant="ghost" onClick={removeAvatar}>Remove picture</Button>}
                                        <input id="avatar" name="avatar" type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => handleAvatarChange(event.currentTarget.files?.[0])} />
                                    </div>
                                    <p className="text-muted-foreground text-xs">JPG, PNG, or WEBP up to 5 MB.</p>
                                </div>
                            </div>
                            <InputError message={errors.avatar} />
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>

                                <Input
                                    id="name"
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.name}
                                    name="name"
                                    required
                                    autoComplete="name"
                                    placeholder="Full name"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>

                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    defaultValue={auth.user.email}
                                    name="email"
                                    required
                                    autoComplete="username"
                                    placeholder="Email address"
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>

                            {/* @chisel-email-verification */}
                            {mustVerifyEmail &&
                                auth.user.email_verified_at === null && (
                                    <div>
                                        <p className="text-muted-foreground -mt-4 text-sm">
                                            Your email address is unverified.{' '}
                                            <Link
                                                href={send()}
                                                as="button"
                                                className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                            >
                                                Click here to re-send the
                                                verification email.
                                            </Link>
                                        </p>

                                        {status ===
                                            'verification-link-sent' && (
                                            <div className="mt-2 text-sm font-medium text-green-600">
                                                A new verification link has been
                                                sent to your email address.
                                            </div>
                                        )}
                                    </div>
                                )}
                            {/* @end-chisel-email-verification */}

                            <div className="flex items-center gap-4">
                                <Button
                                    disabled={processing}
                                    data-test="update-profile-button"
                                >
                                    Save
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </div>

            <DeleteUser />
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Profile settings',
            href: edit(),
        },
    ],
};
