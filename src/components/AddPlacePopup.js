import PopupWithForm from "./PopupWithForm"
import { useState, useEffect } from "react"

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    useEffect(() => {
        if (isOpen) {
          setName("");
          setLink("");
        }
      }, [isOpen]);

    function handleCardName(evt) {
        setName(evt.target.value)
    }

    function handleCardImg(evt) {
        setLink(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace({
            name,
            link
        });
    }

    return (
        <PopupWithForm
            title={"Новое место"}
            name={"add-element"}
            isOpen={isOpen}
            onClose={onClose}
            onAddPlace={onAddPlace}
            onSubmit={handleSubmit}
        >
            <div className="popup__input-field">
                <input
                    type="text"
                    className="popup__input"
                    placeholder="Название"
                    name="name"
                    id="input-element-title"
                    minLength="2"
                    maxLength="30"
                    required
                    onChange={handleCardName}
                    value={name}
                />
                <span className="popup__input-error input-element-title-error"></span>
            </div>
            <div className="popup__input-field">
                <input
                    type="url"
                    className="popup__input"
                    placeholder="Ссылка на картинку"
                    name="link" id="input-element-link"
                    required
                    onChange={handleCardImg}
                    value={link}
                />
                <span className="popup__input-error input-element-link-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup