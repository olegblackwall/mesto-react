function PopupWithForm({ children, title, name, isOpen, onClose, onSubmit }) {

  function closePopupOnOverlayClick (evt) {
    if (evt.target == evt.currentTarget) {
      onClose();
    }
  }

    return (
      <section className={`popup popup_${name} ${isOpen && "popup_opened"}`} onClick={closePopupOnOverlayClick}>
        <div className="popup__container">
          <h2 className="popup__title">{title}</h2>
          <form className="popup__form" name={name} action="#" noValidate onSubmit={onSubmit}>
            {children}
            <button type="submit" className="popup__save-button">Сохранить</button>
          </form>
          <button className="popup__close-button" type="button" onClick={onClose}></button>
        </div>
      </section>
    );
  }
  
  export default PopupWithForm;