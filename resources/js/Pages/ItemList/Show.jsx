import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import AddSubItem from "./SubItemList/AddSubItem"
import EditSubItem from "./SubItemList/EditSubItem"

export default function Show({ item, sub_items }) {

    return (
        <Authenticated>
            <Head title="項目一覧｜Smart Profile" />

            <div className='pt-16'>
                <div className="mx-auto pt-16" style={{ width: 768 }}>
                    <div className="border-b pb-2 border-neutral-300 flex justify-between items-center">
                        <div className="flex gap-2 items-end">
                            <p className="font-semibold">{item.item_name}一覧</p>
                        </div>
                    </div>
                    <AddSubItem item={item} />
                    <ul className="mt-8 pb-16">
                        {sub_items.map(sub_item =>
                            <li key={sub_item.sub_item_order} className="p-4 shadow-xl rounded mt-8">
                                <div className="border-b pb-2 border-neutral-300 flex justify-between items-center">
                                    <p className="font-semibold">{sub_item.sub_item_name}</p>
                                    <EditSubItem item={item} sub_item={sub_item} />
                                </div>
                                <div className="bg-neutral-300 mt-4" style={{ minHeight: 216 }}>
                                    <img src={`../../../storage/${sub_item.sub_item_image}`} alt="" />
                                </div>
                                <div className="mt-4">
                                    {sub_item.sub_item_text}
                                </div>

                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </Authenticated>
    )
}