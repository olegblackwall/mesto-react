import { api } from "../utils/Api.js";
import Card from "./Card.js";
import { useState, useEffect } from "react";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

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
    <main className="content">
      <section className="profile">

        <div className="profile__user-info">
          <button type="button" className="profile__avatar-button" onClick={onEditAvatar}>
            <img src={userAvatar} className="profile__avatar" alt="Аватар" />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
            <h2 className="profile__about">{userDescription}</h2>
          </div>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <div className="elements">
        {cards.map((item) => {
          return (
            <Card
              key={item._id}
              card={item}
              handleCardClick={onCardClick}
            />
          )
        })}
      </div>
    </main>
  );
}

export default Main;