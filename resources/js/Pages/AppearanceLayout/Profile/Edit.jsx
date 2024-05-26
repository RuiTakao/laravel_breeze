import CancelButton from '@/Components/CancelButton';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import EditImage from './EditImage';
import RichEditor from '@/Components/RichEditor/RichEditor';

export default function Edit({ isModalOpen, setIsModalOpen, profile }) {

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const { data, setData, patch } = useForm({
        name: profile.name,
        work: profile.work,
        profile_text: profile.profile_text
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('layoutProfleEdit'));
        setIsModalOpen(false)
    };

    const [base64Image, setBase64Image] = useState("")

    // 表示用
    const [viewImage, setViewImage] = useState('')

    const onInputImage = e => {
        const file = e.target.files;
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            setBase64Image(result);
        }
        reader.readAsDataURL(file[0]);
        setIsImageModalOpen(true);
    }

    return (
        <Modal
            show={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        >
            <div className='p-4'>
                <form onSubmit={submit} encType="multipart/form-data">
                    <p className='border-b font-semibold text-xl pb-2'>プロフィール編集</p>
                    <div className='bg-neutral-300 w-36 h-36 mt-4'>
                        <input type={'file'} accept="image/jpeg, image/png" onChange={onInputImage} />
                        <img src={viewImage} />
                    </div>

                    <InputLabel htmlFor='name' value='名前' className={'font-semibold mt-4'} />
                    <TextInput
                        className={'w-full h-8 mt-1'}
                        id="name"
                        defaultValue={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        autoComplete="name"
                    />
                    <InputLabel htmlFor='work' value={'仕事名'} className={'font-semibold mt-4'} />
                    <TextInput className={'w-full h-8 mt-1'} id="work" defaultValue={data.work} />
                    <InputLabel value={'プロフィール文'} className={'font-semibold mt-4'} />
                    <RichEditor data={data.profile_text} setData={setData} />
                    <input type={'hidden'} autoComplete="name" />
                    <div className='flex justify-between mt-4'>
                        <CancelButton children={'キャンセル'} onClick={() => setIsModalOpen(false)} />
                        <SecondaryButton>変更を保存</SecondaryButton>
                    </div>
                </form>
            </div>

            <EditImage isImageModalOpen={isImageModalOpen} setIsImageModalOpen={setIsImageModalOpen} base64Image={base64Image} setViewImage={setViewImage} setData={setData} />
        </Modal>

    )

}