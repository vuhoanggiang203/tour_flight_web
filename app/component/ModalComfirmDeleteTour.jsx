const ModalComfirmDeleteTour = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded shadow-lg p-6 max-w-md w-full">
                {children}
                
            </div>
        </div>
    );
};


export default ModalComfirmDeleteTour;
