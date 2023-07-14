import PopupWithForm from "./PopupWithForm"
import { useRef } from "react"

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value
          });
    }

    return (
        <PopupWithForm
            title={"Обновить аватар"}
            name={"avatar"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            {<div className="popup__input-field">
                <input
                    type="url"
                    className="popup__input"
                    placeholder="Ссылка на картинку"
                    name="avatar"
                    id="input-avatar-link"
                    required
                    ref={avatarRef}
                />
                <span className="popup__input-error input-avatar-link-error"></span>
            </div>}
        </PopupWithForm>
    )
}

export default EditAvatarPopup