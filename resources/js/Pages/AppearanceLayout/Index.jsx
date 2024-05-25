import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Profile from './Profile/Profile';

export default function AppearanceLayout({ auth, profile }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="レイアウト設定｜Smart Profile" />

            <Profile data={profile} />

            <div className='h-screen bg-gray-100 w-64 fixed right-0 top-0 shadow-lg'>

            </div>

        </AuthenticatedLayout>
    );
}
