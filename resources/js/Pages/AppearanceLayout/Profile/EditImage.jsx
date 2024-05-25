import CancelButton from '@/Components/CancelButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

export default function EditImage({isImageModalOpen, setIsImageModalOpen, base64Image, setViewImage, setData}) {

    const [crop, onCropChange] = useState({ x: 0, y: 0 });
    const [zoom, onZoomChange] = useState(1);
    const [croppedArea, setCroppedArea] = useState("");
    const onCropComplete = (croppedArea, croppedAreaPixels) => setCroppedArea(croppedAreaPixels);

    const onClickImage = useCallback(async () => {
        const croppedImage = await getCroppedImg(base64Image, croppedArea)
        setViewImage(croppedImage)
        setIsImageModalOpen(false);
    })

    const createImage = url =>
        new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", (error) => reject(error));
            image.setAttribute("crossOrigin", "anonymous");
            image.src = url;
        })

    async function getCroppedImg(imageSrc, pixelCrop) {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");


        if (!ctx) {
            return "";
        }

        // canvasサイズを設定
        canvas.width = image.width;
        canvas.height = image.height;

        // canvas上に画像を描画
        ctx.drawImage(image, 0, 0);

        // トリミング後の画像を抽出
        const data = ctx.getImageData(
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height
        );


        // canvasのサイズ指定(切り取り後の画像サイズに更新)
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        // 抽出した画像データをcanvasの左隅に貼り付け
        ctx.putImageData(data, 0, 0);

        if (canvas !== "") {
            const base64 = canvas.toDataURL('image/png')
            const bin = atob(base64.split(",")[1])
            const buffer = new Uint8Array(bin.length)
            for (var i = 0; i < bin.length; i++) {
                buffer[i] = bin.charCodeAt(i);
            }
            // Blobを作成
            var blob = new Blob([buffer.buffer], {
                type: 'image/png'
            });
        }
        const reader = new FileReader()
        reader.onload = e => setData('image', e.target.result)
        reader.readAsDataURL(blob)



        // canvasを画像に変換
        return new Promise((resolve, reject) => {
            canvas.toBlob((file) => {
                if (file !== null) resolve(URL.createObjectURL(file));
            }, "image/jpeg");

        });
    }

    return (
        <Modal
            show={isImageModalOpen}
        >
            <div style={{ height: '100%' }}>

                <div style={{ height: 500, position: 'relative' }}>
                    <Cropper
                        image={base64Image}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={onCropChange}
                        onZoomChange={onZoomChange}
                        onCropComplete={onCropComplete}
                    />
                </div>
                <div className='flex justify-between mt-4'>
                    <CancelButton children={'キャンセル'} onClick={() => setIsImageModalOpen(false)} />
                    <SecondaryButton onClick={onClickImage}>変更を保存</SecondaryButton>
                </div>
            </div>
        </Modal>
    )
}