const Notification = ({ message, onClose }) => {
  return (
    <div>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Notification;