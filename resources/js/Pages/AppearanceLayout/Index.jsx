import CancelButton from '@/Components/CancelButton';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AppearanceLayout({ auth, profile }) {
    const user = usePage().props.auth.user;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const { data, setData, patch } = useForm({
        name: profile.name,
        work: profile.work,
        profile_text: profile.profile_text
    })

    const submit = (e) => {
        e.preventDefault();

        patch(route('layoutProfleEdit'));
        setIsModalOpen(false)
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="レイアウト設定｜Smart Profile" />

            <div className='mr-64'>
                <div className="bg-neutral-300" style={{ height: 329 }}></div>

                <div className='bg-sky-50 p-4 rounded-lg mx-auto mt-14 relative' style={{ width: 768 }}>
                    <div className='w-40 bg-neutral-300 h-40'></div>
                    <p className='font-semibold text-3xl mt-5'>{profile.name}</p>
                    <p className='font-semibold text-xl mt-4'>{profile.work}</p>
                    <p className='mt-4'>
                        {profile.profile_text}
                    </p>
                    <button
                        className='absolute top-4 right-4 bg-teal-600 font-semibold text-white rounded py-1 px-2'
                        onClick={() => setIsModalOpen(true)}
                    >
                        プロフィール編集
                    </button>
                </div>
            </div>

            <div className='h-screen bg-gray-100 w-64 fixed right-0 top-0 shadow-lg'>

            </div>

            <Modal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div className='p-4'>
                    <form onSubmit={submit}>
                        <p className='border-b font-semibold text-xl pb-2'>プロフィール編集</p>
                        <div className='bg-neutral-300 w-36 h-36 mt-4'></div>
                        <InputLabel htmlFor='name' value='名前' className={'font-semibold mt-4'} />
                        <TextInput
                            className={'w-full h-8 mt-1'}
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            autoComplete="name"
                        />
                        <InputLabel htmlFor='work' value={'仕事名'} className={'font-semibold mt-4'} />
                        <TextInput className={'w-full h-8 mt-1'} id="work" value={data.work} />
                        <InputLabel value={'プロフィール文'} className={'font-semibold mt-4'} />
                        <TextInput className={'w-full h-8 mt-1'} value={data.profile_text} />
                        <div className='flex justify-between mt-4'>
                            <CancelButton children={'キャンセル'} onClick={() => setIsModalOpen(false)} />
                            <SecondaryButton>変更を保存</SecondaryButton>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal
                show={isImageModalOpen}
                onClose={() => setIsImageModalOpen(false)}
            >

            </Modal>
        </AuthenticatedLayout>
    );
}
