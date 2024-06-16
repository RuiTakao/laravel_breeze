import React, { useEffect, useState } from 'react';
import Edit from './Edit';

function Profile({ profile, layout }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const perseText = () => {
        const array = JSON.parse(profile.profile_text)
        console.log(array)


        return array.map((elm, i) => {
            const children = elm['children']
            if (children.length <= 1) {
                if (children[0]['text']) {
                    return <p key={i}>{children[0]['text']}</p>
                } else {
                    return <br key={i} />
                }
            } else {
                if (children[1]['type'] === 'link') {
                    const url = children[1]['url']
                    const linkText = children[1]['children'][0]['text']
                    return <p key={i}><a href={url} target='_blank'>{linkText !== "" ? linkText : url}</a></p>
                } else {
                    return null
                }
            }
        });
    }



    const layoutPreview = () => {

        const defaultLayout = () => (
            <>
                <div className='w-40 bg-neutral-300 h-40'><img src={`../storage/${profile.image_path}`} alt="" /></div>
                <p className='font-semibold text-3xl mt-5'>{profile.name}</p>
                <p className='font-semibold text-xl mt-4'>{profile.work}</p>
                {perseText()}
            </>
        )

        switch (layout.layout_pattern) {
            case 1: return defaultLayout()
            case 2:
                return (
                    <div className="pt-10">
                        {perseText()}
                        <div className="flex gap-8 mt-8 items-center">
                            <div className='w-40 bg-neutral-300 h-40 rounded-full'><img src={`../storage/${profile.image_path}`} className='rounded-full' alt="" /></div>
                            <div className="">
                                <p className='font-semibold text-3xl mt-5'>{profile.name}</p>
                                <p className='font-semibold text-xl mt-2'>{profile.work}</p>
                            </div>
                        </div>
                    </div>
                )
            default: return defaultLayout()
        }

    }

    return (
        <div className='bg-sky-50 p-4 rounded-lg mx-auto mt-14 relative' style={{ width: 768 }}>
            {layoutPreview()}
            <button
                className='absolute top-4 right-4 bg-teal-600 font-semibold text-white rounded py-1 px-2'
                onClick={() => setIsModalOpen(true)}
            >
                プロフィール編集
            </button>
            <Edit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} profile={profile} />
        </div>
    )
}

export default React.memo(Profile)