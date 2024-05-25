import { useState } from 'react';
import Edit from './Edit';

export default function Profile({ data }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='mr-64'>
            <div className="bg-neutral-300" style={{ height: 329 }}></div>

            <div className='bg-sky-50 p-4 rounded-lg mx-auto mt-14 relative' style={{ width: 768 }}>
                <div className='w-40 bg-neutral-300 h-40'>
                </div>
                <p className='font-semibold text-3xl mt-5'>{data.name}</p>
                <p className='font-semibold text-xl mt-4'>{data.work}</p>
                <p className='mt-4'>{data.profile_text}</p>
                <button
                    className='absolute top-4 right-4 bg-teal-600 font-semibold text-white rounded py-1 px-2'
                    onClick={() => setIsModalOpen(true)}
                >
                    プロフィール編集
                </button>
            </div>
            <Edit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} profile={data} />
        </div>
    )
}