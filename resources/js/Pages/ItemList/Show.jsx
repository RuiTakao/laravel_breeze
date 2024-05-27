import CancelButton from "@/Components/CancelButton"
import InputLabel from "@/Components/InputLabel"
import Modal from "@/Components/Modal"
import PrimaryButton from "@/Components/PrimaryButton"
import SecondaryButton from "@/Components/SecondaryButton"
import TextInput from "@/Components/TextInput"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import { useState } from "react"

export default function Show({ item, sub_items }) {

    const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
    const [isEditSubItemModalOpen, setIsEditSubItemModalOpen] = useState(false);

    const AddSubItemSubmit = e => {
        e.preventDefault();

        patch(route('layoutProfleEdit'));
        setIsAddItemModalOpen(false)
    }

    const EditSubItemSubmit = e => {
        e.preventDefault();

        patch(route('layoutProfleEdit'));
        setIsEditSubItemModalOpen(false)
    }

    return (
        <Authenticated>
            <Head title="項目一覧｜Smart Profile" />

            <div className='pt-16'>
                <div className="mx-auto pt-16" style={{ width: 768 }}>
                    <div className="border-b pb-2 border-neutral-300 flex justify-between items-center">
                        <p className="font-semibold">{item.item_name}一覧</p>
                    </div>
                    <PrimaryButton className="mt-4" onClick={() => setIsAddItemModalOpen(true)}>小項目追加</PrimaryButton>
                    <ul className="mt-8 pb-16">
                        {sub_items.map(sub_item =>
                            <li key={sub_item.sub_item_order} className="p-4 shadow-xl rounded mt-8">
                                <div className="border-b pb-2 border-neutral-300 flex justify-between items-center">
                                    <p className="font-semibold">{sub_item.sub_item_name}</p>
                                    <SecondaryButton onClick={() => setIsEditSubItemModalOpen(true)}>編集</SecondaryButton>
                                </div>
                                <div className="bg-neutral-300 mt-4" style={{ height: 216 }}></div>
                                <div className="mt-4">
                                    {sub_item.sub_item_text}
                                </div>
                                <Modal
                                    show={isEditSubItemModalOpen}
                                    onClose={() => setIsEditSubItemModalOpen(false)}
                                >
                                    <div className='p-4'>
                                        <div className="border-b pb-2 border-neutral-300">
                                            <p className="font-semibold">{sub_item.sub_item_name}編集</p>
                                        </div>
                                        <form onSubmit={EditSubItemSubmit}>
                                            <InputLabel htmlFor='item_name' value='小項目名' className={'font-semibold mt-4'} />
                                            <TextInput
                                                className={'w-full h-8 mt-1'}
                                                id="item_name"
                                            // defaultValue={data.name}
                                            // onChange={(e) => setData('name', e.target.value)}
                                            // autoComplete="name"
                                            />
                                            <div className="bg-neutral-300 mt-4" style={{ height: 216 }}></div>
                                            <InputLabel htmlFor='item_name' value='概要' className={'font-semibold mt-4'} />
                                            <TextInput className={'w-full h-8 mt-1'} />
                                            <InputLabel htmlFor='item_order' value='追加する位置' className={'font-semibold mt-4'} />
                                            <select name="item_order" id="item_order" className="mt-1">
                                                <option value={1}>末尾に追加</option>
                                            </select>
                                            <div className='flex justify-between mt-4'>
                                                <CancelButton children={'キャンセル'} onClick={() => setIsEditSubItemModalOpen(false)} />
                                                <SecondaryButton>変更を保存</SecondaryButton>
                                            </div>
                                        </form>
                                    </div>
                                </Modal>
                            </li>
                        )}
                    </ul>
                    
                </div>
            </div>
        </Authenticated>
    )
}