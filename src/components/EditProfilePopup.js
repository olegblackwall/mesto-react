import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleName(evt) {
        setName(evt.target.value);
    }

    function handleDescription(evt) {
        setDescription(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }


    return (
        <PopupWithForm
            title={"Редактировать профиль"}
            name={"edit-profile"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <div className="popup__input-field">
                <input
                    type="text"
                    className="popup__input"
                    placeholder="Имя"
                    name="name"
                    id="input-name"
                    minLength="2"
                    maxLength="40"
                    required
                    onChange={handleName}
                    value={name || ''}
                />
                <span className="popup__input-error input-name-error"></span>
            </div>
            <div className="popup__input-field">
                <input
                    type="text"
                    className="popup__input"
                    placeholder="О себе"
                    name="about"
                    id="input-about"
                    minLength="2"
                    maxLength="200"
                    required
                    onChange={handleDescription}
                    value={description || ''}
                />
                <span className="popup__input-error input-about-error"></span>
            </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup;