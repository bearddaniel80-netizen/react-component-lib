import './Modal.css'; 

export default function Modal({ isOpen, onClose, title, children }) {
  // If the modal isn't open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* stopPropagation prevents the modal from closing when clicking inside the content box */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}