import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function AppearanceLayout({ auth }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="レイアウト設定｜Smart Profile" />

            <div className='mr-64'>
                <div className="bg-neutral-300" style={{ height: 329 }}></div>

                <div className='bg-sky-50 p-4 rounded-lg mx-auto mt-14 relative' style={{ width: 768 }}>
                    <div className='w-40 bg-neutral-300 h-40'></div>
                    <p className='font-semibold text-3xl mt-5'>たかお</p>
                    <p className='font-semibold text-xl mt-4'>Webエンジニア</p>
                    <p className='mt-4'>
                        現役でシステムエンジニアをしているたかおです。<br />
                        Smart Profileの開発者、現在は保守運用しています。<br />
                        プロフィールサイトとして利用できます。<br /><br />
                        本業はプログラマで不動産関係のサイトの保守運用をしています。
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
                <TextInput />
            </Modal>
        </AuthenticatedLayout>
    );
}
