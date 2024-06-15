import CancelButton from "@/Components/CancelButton";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Edit({ isModalOpen, setIsModalOpen, items, item }) {
    
    const { data, setData, patch } = useForm({
        // console.log(data)
        item_name: item.item_name,
        item_order: item.item_order
    });
    
    const submit = (e) => {
        e.preventDefault();

        patch(route('item_list.update_item', {id: item.id}));
        setIsModalOpen(false)
    };

    const [selected, setSelected] = useState(0)

    useEffect(() => setData('item_order', selected), [selected])
    // useEffect(() => {
    //     setData(data => ({...data, item_order: selected}))
    // }, [item])
    

    return (
        <Modal
            show={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        >
            <div className='p-4'>
                <div className="border-b pb-2 border-neutral-300">
                    <p className="font-semibold">{item.item_name}編集</p>
                </div>
                <form onSubmit={submit}>
                    <InputLabel htmlFor='item_name' value='項目名' className={'font-semibold mt-4'} />
                    <TextInput
                        className={'w-full h-8 mt-1'}
                        id="item_name"
                        defaultValue={item.item_name}
                        onChange={(e) => setData('item_name', e.target.value)}
                        autoComplete="item_name"
                    />
                    <InputLabel htmlFor='item_order' value='位置変更' className={'font-semibold mt-4'} />
                    <select name="item_order" id="item_order" className="mt-1" defaultValue={selected} onChange={(e) => setSelected(e.target.value)}>
                        <option value={0}>変更しない</option>
                        {function () {
                            const option = []
                            const skip_order = item.item_order
                            items.forEach(item => {
                                if (skip_order !== item.item_order) {
                                    option.push(<option key={item.item_order} value={item.item_order}>{`${item.item_name}の前に移動`}</option>)
                                }
                            });
                            return option
                        }()}
                        <option key={items.length + 1} value={items.length + 1}>末尾に移動</option>
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