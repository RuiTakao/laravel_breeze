import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function AddHistory() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, post } = useForm({
        title: '',
        history_text: '',
        start: '',
        end: '',
        to_now: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('sub_item_list.create_subItem'));
        setIsModalOpen(false)
    };

    return (
        <>
            <PrimaryButton className="mt-4" onClick={() => setIsModalOpen(true)}>経歴の追加</PrimaryButton>
            <Modal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div className='p-4'>
                    <div className="border-b pb-2 border-neutral-300">
                        <p className="font-semibold">経歴の追加</p>
                    </div>
                    <form onSubmit={submit}>
                        <InputLabel htmlFor='title' value='タイトル' className={'font-semibold mt-4'} />
                        <TextInput
                            className={'w-full h-8 mt-1'}
                            id="title"
                            onChange={(e) => setData('title', e.target.value)}
                            autoComplete="title"
                        />
                        <InputLabel htmlFor='history_text' value='概要' className={'font-semibold mt-4'} />
                        <TextInput
                            type='textarea'
                            className={'w-full mt-1'}
                            id="history_text"
                            onChange={(e) => setData('history_text', e.target.value)}
                            autoComplete="history_text"
                        />
                        <InputLabel value='期間' className={'font-semibold mt-4'} />
                        <TextInput
                            type='month'
                            className={'h-8 mt-1'}
                            id="start"
                            onChange={(e) => setData('start', e.target.value)}
                            autoComplete="start"
                        />
                        ～
                        <TextInput
                            type='month'
                            className={'h-8'}
                            id="end"
                            onChange={(e) => setData('end', e.target.value)}
                            autoComplete="end"
                        />
                    </form>
                </div>
            </Modal>
        </>
    )
}