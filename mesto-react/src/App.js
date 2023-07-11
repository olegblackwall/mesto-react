import Card from "./components/Card";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ImagePopup from "./components/ImagePopup";
import Main from "./components/Main";
import PopupWithForm from "./components/PopupWithForm";
import {useState} from "react";


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);

  }
  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
    handleImagePopupOpen();
  }

  function handleImagePopupOpen () {
    setIsImagePopupOpen(true);
  }

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsImagePopupOpen(false);
  }

  function escClose (evt) {
    if (evt.key == "Escape") {
      closeAllPopups();
    }
  }

  window.addEventListener("keydown", (evt) => escClose(evt));

  return (
    <div className="page" >

      <Header />
      <Main 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm 
        title={"Обновить аватар"} 
        name={"avatar"} 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        >
        {<div className="popup__input-field">
          <input type="url" className="popup__input" placeholder="Ссылка на картинку" name="avatar" id="input-avatar-link" required />
          <span className="popup__input-error input-avatar-link-error"></span>
        </div>}
      </PopupWithForm>

      <PopupWithForm 
        title={"Редактировать профиль"} 
        name={"edit-profile"} 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        >
        {<>
          <div className="popup__input-field">
            <input type="text" className="popup__input" placeholder="Имя" name="name" id="input-name" minLength="2" maxLength="40" required />
            <span className="popup__input-error input-name-error"></span>
          </div>
          <div className="popup__input-field">
            <input type="text" className="popup__input" placeholder="О себе" name="about" id="input-about" minLength="2" maxLength="200" required />
            <span className="popup__input-error input-about-error"></span>
          </div>
        </>}
      </PopupWithForm>

      <PopupWithForm 
        title={"Новое место"} 
        name={"add-element"}
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        >
        {<>
          <div className="popup__input-field">
            <input type="text" className="popup__input" placeholder="Название" name="name" id="input-element-title" minLength="2" maxLength="30" required />
            <span className="popup__input-error input-element-title-error"></span>
          </div>
          <div className="popup__input-field">
            <input type="url" className="popup__input" placeholder="Ссылка на картинку" name="link" id="input-element-link" required />
            <span className="popup__input-error input-element-link-error"></span>
          </div
          ></>}
      </PopupWithForm>

      <PopupWithForm title={"Вы уверены?"} name={"_save-button"}>
        {<button className="popup__save-button" type="button">Да</button>}
      </PopupWithForm>

      <ImagePopup 
      card={selectedCard}
      onClose={closeAllPopups}
      isOpen={isImagePopupOpen}
      />

    </div>
  );
  }

export default App;