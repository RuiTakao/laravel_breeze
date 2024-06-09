import React, { useEffect, useState } from 'react';
import Edit from './Edit';

function Profile({ data }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const perseText = () => {
        const array = JSON.parse(data.profile_text)
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


    return (
        <div className='bg-sky-50 p-4 rounded-lg mx-auto mt-14 relative' style={{ width: 768 }}>
            <div className='w-40 bg-neutral-300 h-40'><img src={`storage/${data.image_path}`} alt="" /></div>
            <p className='font-semibold text-3xl mt-5'>{data.name}</p>
            <p className='font-semibold text-xl mt-4'>{data.work}</p>
            {perseText()}
            <button
                className='absolute top-4 right-4 bg-teal-600 font-semibold text-white rounded py-1 px-2'
                onClick={() => setIsModalOpen(true)}
            >
                プロフィール編集
            </button>
            <Edit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} profile={data} />
        </div>
    )
}

export default React.memo(Profile)