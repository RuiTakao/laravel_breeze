import CancelButton from "@/Components/CancelButton";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function Add({ isAddModalOpen, setIsAddModalOpen, items }) {

    const { setData, post } = useForm({
        item_name: '',
        item_order: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('item_list.create_item'));
        setIsAddModalOpen(false)
    };

    return (
        <Modal
            show={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
        >
            <div className='p-4'>
                <div className="border-b pb-2 border-neutral-300">
                    <p className="font-semibold">項目追加</p>
                </div>
                <form onSubmit={submit}>
                    <InputLabel htmlFor='item_name' value='項目名を入力' className={'font-semibold mt-4'} />
                    <TextInput
                        className={'w-full h-8 mt-1'}
                        id="item_name"
                        onChange={(e) => setData('item_name', e.target.value)}
                        autoComplete="item_name"
                    />
                    <div className='flex justify-between mt-4'>
                        <CancelButton children={'キャンセル'} onClick={() => setIsAddModalOpen(false)} />
                        <SecondaryButton>追加</SecondaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    )
}