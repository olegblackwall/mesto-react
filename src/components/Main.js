import { api } from "../utils/Api.js";
import Card from "./Card.js";
import { useState, useEffect } from "react";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((result) => {
        setUserName(result.name);
        setUserDescription(result.about);
        setUserAvatar(result.avatar);
      })
      .catch((err) =>
        console.log(err))

    api.getInitialCards()
      .then((result) => {
        setCards(result);
      })
      .catch((err) =>
        console.log(err))
  }, []);

  return (
    <main class="content">
      <section class="profile">

        <div class="profile__user-info">
          <button type="button" class="profile__avatar-button" onClick={onEditAvatar}>
            <img src={userAvatar} class="profile__avatar" alt="Аватар" />
          </button>
          <div class="profile__info">
            <h1 class="profile__name">{userName}</h1>
            <button type="button" class="profile__edit-button" onClick={onEditProfile}></button>
            <h2 class="profile__about">{userDescription}</h2>
          </div>
        </div>
        <button type="button" class="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <div class="elements">
        {cards.map((item) => { return (
          <Card 
          card={item}
          handleCardClick={onCardClick}
          />
        )})}
      </div>
    </main>
  );
}

export default Main;