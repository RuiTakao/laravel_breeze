import CancelButton from "@/Components/CancelButton";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function Add({ isModalOpen, setIsModalOpen, sub_items }) {

    const { setData, post } = useForm({
        sub_item_name: '',
        sub_item_order: '',
        sub_item_text: '',
        sub_item_image: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('item_list.create_item'));
        setIsModalOpen(false)
    };

    return (
        <Modal
            show={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        >
            <div className='p-4'>
                <div className="border-b pb-2 border-neutral-300">
                    <p className="font-semibold">小項目追加</p>
                </div>
                <form onSubmit={AddSubItemSubmit}>
                    <InputLabel htmlFor='sub_item_name' value='小項目名' className={'font-semibold mt-4'} />
                    <TextInput
                        className={'w-full h-8 mt-1'}
                        id="sub_item_name"
                        onChange={(e) => setData('sub_item_name', e.target.value)}
                        autoComplete="sub_item_name"
                    />
                    <div className="bg-neutral-300 mt-4" style={{ height: 216 }}></div>
                    <InputLabel htmlFor='sub_item_text' value='概要' className={'font-semibold mt-4'} />
                    <TextInput
                        className={'w-full h-8 mt-1'}
                        id="sub_item_text"
                        onChange={(e) => setData('sub_item_text', e.target.value)}
                        autoComplete="sub_item_text"
                    />
                    <InputLabel htmlFor='item_order' value='追加する位置' className={'font-semibold mt-4'} />
                    <select name="item_order" id="item_order" className="mt-1">
                        <option value={1}>末尾に追加</option>
                    </select>
                    <div className='flex justify-between mt-4'>
                        <CancelButton children={'キャンセル'} onClick={() => setIsModalOpen(false)} />
                        <SecondaryButton>変更を保存</SecondaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    )
}