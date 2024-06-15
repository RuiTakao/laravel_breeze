import CancelButton from "@/Components/CancelButton"
import DangerButton from "@/Components/DangerButton"
import InputLabel from "@/Components/InputLabel"
import Modal from "@/Components/Modal"
import PrimaryButton from "@/Components/PrimaryButton"
import RichEditor from "@/Components/RichEditor/RichEditor"
import SecondaryButton from "@/Components/SecondaryButton"
import TextInput from "@/Components/TextInput"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head, Link, useForm } from "@inertiajs/react"
import { useState } from "react"

export default function Show({ item, sub_items }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const [image, setImage] = useState('')

    const { data, setData, patch } = useForm({
        sub_item_text: null,
    });

    const submit = (e) => {
    };

    const onInputImage = e => {
        const file = e.target.files;
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            setImage(result);
            setData('fv_image', result);
        }
        reader.readAsDataURL(file[0]);
        // setIsImageModalOpen(true);
    }

    return (
        <Authenticated>
            <Head title="項目一覧｜Smart Profile" />

            <div className='pt-16'>
                <div className="mx-auto pt-16" style={{ width: 768 }}>
                    <div className="border-b pb-2 border-neutral-300 flex justify-between items-center">
                        <div className="flex gap-2 items-end">
                            <p className="font-semibold">{item.item_name}一覧</p>
                        </div>
                    </div>
                    <PrimaryButton className="mt-4" onClick={() => setIsModalOpen(true)}>小項目追加</PrimaryButton>


                    <Modal
                        show={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    >
                        <div className='p-4'>
                            <div className="border-b pb-2 border-neutral-300">
                                <p className="font-semibold">小項目追加</p>
                            </div>
                            <form onSubmit={submit}>
                                <InputLabel htmlFor='item_name' value='小項目名' className={'font-semibold mt-4'} />
                                <TextInput
                                    className={'w-full h-8 mt-1'}
                                    id="item_name"
                                    onChange={(e) => setData('item_name', e.target.value)}
                                    autoComplete="item_name"
                                />
                                <InputLabel value={'概要'} className={'font-semibold mt-4'} />
                                <RichEditor data={data.sub_item_text} setData={setData} />
                                <div className="border-b pb-1 border-neutral-300 mt-4">
                                    <p>関連画像</p>
                                </div>
                                <div className="">
                                    <input type={'file'} accept="image/jpeg, image/png" onChange={onInputImage} />
                                    <img src={image} alt="" srcset="" />
                                    <Modal
                                        show={isImageModalOpen}
                                        onClose={() => setIsImageModalOpen(false)}
                                    >

                                    </Modal>
                                </div>
                                <div className='flex justify-between mt-4'>
                                    <CancelButton children={'キャンセル'} onClick={() => setIsModalOpen(false)} />
                                    <SecondaryButton>追加</SecondaryButton>
                                </div>
                            </form>
                        </div>
                    </Modal>


                    <ul className="mt-8 pb-16">
                        {sub_items.map(sub_item =>
                            <li key={sub_item.sub_item_order} className="p-4 shadow-xl rounded mt-8">
                                <div className="border-b pb-2 border-neutral-300 flex justify-between items-center">
                                    {/* <p className="font-semibold">{sub_item.sub_item_name}</p>
                                    <SecondaryButton onClick={() => setIsEditSubItemModalOpen(true)}>編集</SecondaryButton> */}
                                </div>
                                <div className="bg-neutral-300 mt-4" style={{ height: 216 }}></div>
                                <div className="mt-4">
                                    {sub_item.sub_item_text}
                                </div>

                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </Authenticated>
    )
}