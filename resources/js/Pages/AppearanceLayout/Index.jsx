import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Profile from './Profile/Profile';
import FV from './FV';

function AppearanceLayout({ auth, profile, layout }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="レイアウト設定｜Smart Profile" />
            <div className='mr-64 pt-16'>
                <FV layout={layout} />
                <Profile data={profile} />
            </div>
            <div className='h-screen bg-gray-100 w-64 fixed right-0 top-0 shadow-lg'>

            </div>

        </AuthenticatedLayout>
    );
}

export default React.memo(AppearanceLayout);