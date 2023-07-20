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
import { Route, Routes, useNavigate } from "react-router-dom"
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { auth } from "../utils/Auth";



function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isOk, setIsOk] = useState(true);
  const [user, setUser] = useState({});

  const navigate = useNavigate();

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
    setIsInfoTooltip(false);
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
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userInfo) {
    api.editProfile(userInfo)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userAvatar) {
    api.editAvatar(userAvatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api.postCard(newCard)
      .then((result) => {
        setCards([result, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegistration({ email, password }) {
    auth.register({ email, password })
      .then((result) => {
        navigate("/sign-in");
        setIsInfoTooltip(true);
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltip(true);
        setIsOk(false);
      });
  }

  function handleLogin({ email, password }) {
    auth.login({ email, password })
      .then((result) => {
        localStorage.setItem("token", result.token)
        setIsLogin(true)
        navigate("/")
      })
      .catch((err) => {
        console.log(err);
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

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      auth.getUser(jwt)
        .then((result) => {
          setIsLogin(true)
          navigate("/")
          setUser(result.data);
        })
        .catch((err) =>
          console.log(err))
    }
  }, []);

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="page" >

        <Header
        isLogin={isLogin}
        email={user.email}
        setIsLogin={setIsLogin}
        />

        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              redirectTo="/sign-in"
              isLogin={isLogin}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onCardDelete={handleCardDelete}
              />
            </ProtectedRoute>
          } />
          <Route path="/sign-up" element={
            <Register
              onRegistration={handleRegistration}
            />
          } />
          <Route path="/sign-in" element={
            <Login
              onLogin={handleLogin}
            />
          } />

          <Route path="/ok" element={
            <InfoTooltip />
          }
          />

        </Routes>

        {isLogin && <Footer />}

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

        <PopupWithForm title={"Вы уверены?"} name={"_save-button"} />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />

        <InfoTooltip
          isOpen={isInfoTooltip}
          ok={isOk}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;