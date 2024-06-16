import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Profile from './Profile/Profile';
import FV from './FV';
import Sidebar from './Sidebar/Sidebar';

function AppearanceLayout({ auth, profile, layout }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="レイアウト設定｜Smart Profile" />
            <div className='mr-64 pt-16'>
                <FV layout={layout} />
                <Profile profile={profile} layout={layout} />
            </div>
            <Sidebar layout={layout} />
        </AuthenticatedLayout>
    );
}

export default React.memo(AppearanceLayout);