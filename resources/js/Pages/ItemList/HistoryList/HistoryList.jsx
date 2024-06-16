import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import AddHistory from "./AddHistory";

export default function HistoryList() {


    return (
        <Authenticated>
            <Head title="経歴の設定｜Smart Profile" />

            <div className='pt-16'>
                <div className="mx-auto pt-16" style={{ width: 768 }}>
                    <div className="border-b pb-2 border-neutral-300 flex justify-between items-center">
                        <div className="flex gap-2 items-end">
                            <p className="font-semibold">経歴の設定</p>
                        </div>
                    </div>
                    <AddHistory />
                    
                </div>
            </div>
        </Authenticated>
    )
}