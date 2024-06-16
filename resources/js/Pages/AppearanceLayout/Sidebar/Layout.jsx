import CancelButton from "@/Components/CancelButton";
import InputLabel from "@/Components/InputLabel"
import Modal from "@/Components/Modal"
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import React, { useState } from "react"

function Layout({ layout }) {


    const { data, setData, patch } = useForm({ layout_pattern: layout.layout_pattern });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        patch(route('LayoutPatternEdit'));
        setIsModalOpen(false)
    };

    const layoutPreview = () => {
        switch (layout.layout_pattern) {
            case 1:
                return (
                    <>
                        <p>通常のレイアウト</p>
                        <img src={'../template_img/pattern1.jpg'} alt="" />
                    </>
                )
            case 2:
                return (
                    <>
                        <p>Xヘッダー用レイアウト</p>
                        <img src={'../template_img/pattern2.jpg'} alt="" />
                    </>
                )
            default: return null
        }
    }

    return (
        <>
            <InputLabel value={'レイアウト'} className={'font-bold'} />

            <div className="mt-6">
                {layoutPreview()}
            </div>
            <button
                className='bg-teal-600 font-semibold text-white rounded py-1 px-2 mt-2'
                onClick={() => setIsModalOpen(true)}
            >
                編集
            </button>
            <Modal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <div className='p-4'>
                    <form onSubmit={submit} encType="multipart/form-data">
                        <p className='border-b font-semibold text-xl pb-2'>レイアウト編集</p>
                        <div className='flex mt-4 gap-8'>
                            <InputLabel>
                                <p><input type="radio" name="layout_pattern" value={1} onChange={(e) => setData('layout_pattern', e.target.value)} defaultChecked={layout.layout_pattern === 1} />通常のレイアウト</p>
                                <img src={'../template_img/pattern1.jpg'} alt="" />
                            </InputLabel>
                            <InputLabel>
                                <p><input type="radio" name="layout_pattern" value={2} onChange={(e) => setData('layout_pattern', e.target.value)} defaultChecked={layout.layout_pattern === 2} />Xヘッダー用レイアウト</p>
                                <img src={'../template_img/pattern2.jpg'} alt="" />
                            </InputLabel>
                        </div>
                        <div className='flex justify-between mt-4'>
                            <CancelButton children={'キャンセル'} onClick={() => setIsModalOpen(false)} />
                            <SecondaryButton>変更を保存</SecondaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default React.memo(Layout)