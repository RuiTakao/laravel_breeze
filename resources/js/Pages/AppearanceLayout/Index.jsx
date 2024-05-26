import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Profile from './Profile/Profile';

function AppearanceLayout({ auth, profile }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="レイアウト設定｜Smart Profile" />
            <div className='mr-64 pt-16'>
                <div className="bg-neutral-300" style={{ height: 329 }}>
                    <input type={'file'} accept="image/jpeg, image/png" />
                </div>
                <Profile data={profile} />
            </div>
            <div className='h-screen bg-gray-100 w-64 fixed right-0 top-0 shadow-lg'>

            </div>

        </AuthenticatedLayout>
    );
}

export default React.memo(AppearanceLayout);