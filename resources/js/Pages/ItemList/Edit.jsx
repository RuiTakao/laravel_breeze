import Modal from "@/Components/Modal";

export default function Edit({ isModalOpen, setIsModalOpen }) {
    return (
        <Modal
            show={isModalOpen}
            onClose={() => setIsModalOpen(false)}
        ></Modal>
    )
}