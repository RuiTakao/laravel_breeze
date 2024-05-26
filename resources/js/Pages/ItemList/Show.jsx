import PrimaryButton from "@/Components/PrimaryButton"
import SecondaryButton from "@/Components/SecondaryButton"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"

export default function Show({ item, sub_items }) {
    return (
        <Authenticated>
            <Head title="項目一覧｜Smart Profile" />

            <div className='pt-16'>
                <div className="mx-auto pt-16" style={{ width: 768 }}>
                    <div className="border-b pb-2 border-neutral-300 flex justify-between items-center">
                        <p className="font-semibold">{item.item_name}</p>
                        <SecondaryButton>項目の編集</SecondaryButton>
                    </div>
                    <PrimaryButton className="mt-4" onClick={() => setIsModalOpen(true)}>項目追加</PrimaryButton>
                    <ul className="mt-8">
                        {sub_items.map(sub_item =>
                            <li key={sub_item.sub_item_order}>{sub_item.sub_item_name}</li>
                        )}
                    </ul>
                </div>
            </div>
        </Authenticated>
    )
}