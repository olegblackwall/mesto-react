function ImagePopup({ card, isOpen, onClose }) {

  function closePopupOnOverlayClick(evt) {
    if (evt.target == evt.currentTarget) {
      onClose();
    }
  }

  return (
    <section className={`popup popup_show-img ${isOpen ? "popup_opened" : ""}`} onClick={closePopupOnOverlayClick}>
      <div className="popup__container-img">
        <img src={card.link} className="popup__img" alt={card.name} />
        <h2 className="popup__title-img">{card.name}</h2>
        <button type="button" className="popup__close-button popup__close-button_show-img" onClick={onClose}></button>
      </div>
    </section>
  );
}

export default ImagePopup;