import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";
import { api } from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup";



function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);

  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    handleImagePopupOpen();
  }

  function handleImagePopupOpen() {
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsImagePopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.setLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((result) => {
        const filteredCards = cards.filter((item) => {
          return card._id !== item._id
        })
        setCards(filteredCards);
      })
  }

  function handleUpdateUser(userInfo) {
    api.editProfile(userInfo)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
  }

  function handleUpdateAvatar(userAvatar) {
    api.editAvatar(userAvatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
  }

  function handleAddPlaceSubmit(newCard) {
    api.postCard(newCard)
      .then((result) => {
        setCards([result, ...cards]);
        closeAllPopups();
        // 
        console.log([result, ...cards])
        console.log([result, cards])
        // 
      })
  }


  const isAnyPopupOpened = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen;

  useEffect(() => {
    function handleCloseByEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isAnyPopupOpened) {
      document.addEventListener("keydown", handleCloseByEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleCloseByEsc);
    };
  }, [isAnyPopupOpened]);

  useEffect(() => {
    api.getUserInfo()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {

    api.getInitialCards()
      .then((result) => {
        setCards(result);
      })
      .catch((err) =>
        console.log(err))
  }, []);

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="page" >

        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          cards={cards}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm title={"Вы уверены?"} name={"_save-button"}>
          {<button className="popup__save-button" type="button">Да</button>}
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;