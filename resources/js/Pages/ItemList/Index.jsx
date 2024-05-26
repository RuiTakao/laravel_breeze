import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ItemList() {
    return (
        <Authenticated>
            <Head title="項目一覧｜Smart Profile" />

            <div className='pt-16'>
                <div className="mx-auto pt-16" style={{ width: 768 }}>
                    <div className="border-b pb-2 border-neutral-300">
                        <p className="font-semibold">項目一覧</p>
                    </div>
                    <PrimaryButton className="mt-4">項目追加</PrimaryButton>
                </div>
            </div>
        </Authenticated>
    )
}