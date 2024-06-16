import CancelButton from "@/Components/CancelButton";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import RichEditor from "@/Components/RichEditor/RichEditor";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function EditSubItem({ item, sub_item }) {

    console.log(sub_item)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const [image, setImage] = useState(`../../../storage/${sub_item.sub_item_image}`)

    const { data, setData, patch } = useForm({
        sub_item_name: sub_item.sub_item_name,
        sub_item_text: sub_item.sub_item_text,
        sub_item_image: sub_item.sub_item_image,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('sub_item_list.update_subItem', {id: sub_item.id}));
        setIsModalOpen(false)
    };

    const onInputImage = e => {
        const file = e.target.files;
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            setImage(result);
            setData('sub_item_image', result);
        }
        reader.readAsDataURL(file[0]);
        // setIsImageModalOpen(true)
    }

    return (
        <>
            <PrimaryButton className="mt-4" onClick={() => setIsModalOpen(true)}>編集</PrimaryButton>

            <Modal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div className='p-4'>
                    <div className="border-b pb-2 border-neutral-300">
                        <p className="font-semibold">{sub_item.sub_item_name} 編集</p>
                    </div>
                    <form onSubmit={submit}>
                        <InputLabel htmlFor='item_name' value='小項目名' className={'font-semibold mt-4'} />
                        <TextInput
                            className={'w-full h-8 mt-1'}
                            id="item_name"
                            onChange={(e) => setData('sub_item_name', e.target.value)}
                            autoComplete="item_name"
                            defaultValue={data.sub_item_name}
                        />
                        <InputLabel value={'概要'} className={'font-semibold mt-4'} />
                        <RichEditor data={data.sub_item_text} setData={setData} dataName={'sub_item_text'} />
                        <div className="border-b pb-1 border-neutral-300 mt-8">
                            <p>関連画像</p>
                        </div>
                        <div className="bg-neutral-300 relative mt-4" style={{ minHeight: 192 }} >
                            <input type={'file'} accept="image/jpeg, image/png" onChange={onInputImage} onClick={e => e.target.value = ""} className='opacity-0 absolute top-0 left-0 w-full h-full' />
                            <img src={image} alt="" />
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
        </>
    )
}