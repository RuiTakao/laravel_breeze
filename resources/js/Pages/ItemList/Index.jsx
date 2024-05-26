import CancelButton from "@/Components/CancelButton";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import NavLink from "@/Components/NavLink";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function ItemList({ items }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        patch(route('layoutProfleEdit'));
        setIsModalOpen(false)
    };

    return (
        <Authenticated>
            <Head title="項目一覧｜Smart Profile" />

            <div className='pt-16'>
                <div className="mx-auto pt-16" style={{ width: 768 }}>
                    <div className="border-b pb-2 border-neutral-300">
                        <p className="font-semibold">項目一覧</p>
                    </div>
                    <PrimaryButton className="mt-4" onClick={() => setIsModalOpen(true)}>項目追加</PrimaryButton>
                    <ul className="mt-8">
                        {items.map(item =>
                            <li key={item.item_order} className="flex justify-between items-center mt-4 bg-gray-200 p-2 font-semibold">
                                {item.item_name}
                                <NavLink href={route('item_list.show', {id: item.id})} active={route().current('item_list.show')}>
                                    編集
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <Modal
                        show={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
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
                                // defaultValue={data.name}
                                // onChange={(e) => setData('name', e.target.value)}
                                // autoComplete="name"
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
                </div>
            </div>
        </Authenticated>
    )
}