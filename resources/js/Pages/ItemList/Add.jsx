import CancelButton from "@/Components/CancelButton";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

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

    const [selected, setSelected] = useState(items.length + 1)

    useEffect(() => setData('item_order', selected), [selected])

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
                    <InputLabel htmlFor='item_name' value='項目名' className={'font-semibold mt-4'} />
                    <TextInput
                        className={'w-full h-8 mt-1'}
                        id="item_name"
                        onChange={(e) => setData('item_name', e.target.value)}
                        autoComplete="item_name"
                    />
                    <InputLabel htmlFor='item_order' value='追加する位置' className={'font-semibold mt-4'} />
                    <select autoComplete="item_order" id="item_order" className="mt-1" defaultValue={selected} onChange={(e) => setSelected(e.target.value)}>
                        {function () {
                            const option = []
                            items.forEach(item => {
                                option.push(<option key={item.item_order} value={item.item_order}>{item.item_order === 1 ? '先頭に追加' : `${item.item_name}の前に追加`}</option>)
                            });
                            return option
                        }()}
                        <option key={items.length + 1} value={items.length + 1}>末尾に追加</option>
                    </select>
                    <div className='flex justify-between mt-4'>
                        <CancelButton children={'キャンセル'} onClick={() => setIsAddModalOpen(false)} />
                        <SecondaryButton>変更を保存</SecondaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    )
}