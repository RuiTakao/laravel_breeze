import CancelButton from "@/Components/CancelButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react";

function FV({ layout }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState("");

    const { data, setData, patch } = useForm({
        fv_image: layout.fv_image
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('FVEdit'));
        setIsModalOpen(false)
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
        setIsModalOpen(true);
    }

    return (
        <div className="bg-neutral-300 bg-center bg-cover relative" style={{ height: 329, backgroundImage: `url(storage/${layout.fv_image})` }} >
            <form id='FVEdit' onSubmit={submit} encType="multipart/form-data">
                <input type={'file'} accept="image/jpeg, image/png" onChange={onInputImage} onClick={e => e.target.value = ""} className='opacity-0 absolute top-0 left-0 w-full h-full' />
            </form>
            <Modal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div className='p-4'>
                    <img src={image} />
                    <div className='flex justify-between mt-4'>
                        <CancelButton children={'キャンセル'} onClick={() => setIsModalOpen(false)} />
                        <SecondaryButton form='FVEdit'>変更を保存</SecondaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default React.memo(FV)