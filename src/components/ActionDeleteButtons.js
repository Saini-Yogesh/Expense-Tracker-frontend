import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import '../Css/ActionDeleteButtons.css'; // Optional styling

const ActionDeleteButtons = ({ onDelete, id }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = async () => {
        try {
            await onDelete(id);
            toast.success("Expense deleted successfully");
        } catch (err) {
            toast.error("Failed to delete expense");
        } finally {
            setShowConfirm(false);
        }
    };

    return (
        <>
            <FaTrash className="icon delete" onClick={() => setShowConfirm(true)} />

            {showConfirm && (
                <div
                    className="delete-modal__overlay"
                    onClick={(e) => {
                        if (e.target.classList.contains("delete-modal__overlay")) {
                            setShowConfirm(false);
                        }
                    }}
                >
                    <div className="delete-modal__box">
                        <p className="delete-modal__text">Are you sure you want to delete this expense?</p>
                        <div className="delete-modal__actions">
                            <button className="delete-modal__btn delete-modal__btn--cancel" onClick={() => setShowConfirm(false)}>
                                Cancel
                            </button>
                            <button className="delete-modal__btn delete-modal__btn--confirm" onClick={handleDelete}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ActionDeleteButtons;
