import NavLink from "@/Components/NavLink";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import Add from "./Add";
import SecondaryButton from "@/Components/SecondaryButton";
import Edit from "./Edit";

export default function ItemList({ items }) {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [item, setItem] = useState({});

    console.log(items)

    return (
        <Authenticated>
            <Head title="項目一覧｜Smart Profile" />

            <div className='pt-16'>
                <div className="mx-auto pt-16" style={{ width: 768 }}>
                    <div className="border-b pb-2 border-neutral-300">
                        <p className="font-semibold">項目一覧</p>
                    </div>
                    <PrimaryButton onClick={() => setIsAddModalOpen(true)} className="mt-4">項目追加</PrimaryButton>
                    <ul className="mt-8">
                        <li className="flex justify-between items-center mt-4 bg-gray-200 p-2 font-semibold">
                            経歴
                            <div className="flex gap-4">
                                <NavLink
                                    href={route('history')}
                                    active={route().current('history')}
                                >
                                    経歴の設定へ
                                </NavLink>
                            </div>
                        </li>
                        {items.map(item =>
                            <li key={item.item_order} className="flex justify-between items-center mt-4 bg-gray-200 p-2 font-semibold">
                                {item.item_name}
                                <div className="flex gap-4">
                                    <NavLink
                                        href={route('item_list.show', { id: item.id })}
                                        active={route().current('item_list.show')}
                                    >
                                        {item.item_name}の設定へ
                                    </NavLink>
                                    {/* <SecondaryButton onClick={() => {
                                        setIsModalOpen(true)
                                        setItem(item)
                                    }}>編集</SecondaryButton> */}
                                </div>
                            </li>
                        )}
                    </ul>
                    <Add
                        isAddModalOpen={isAddModalOpen}
                        setIsAddModalOpen={setIsAddModalOpen}
                        items={items}
                    />
                    {/* <Edit isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} items={items} item={item} /> */}
                    {/* <Edit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> */}
                </div>
            </div>
        </Authenticated>
    )
}