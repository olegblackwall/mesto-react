import Card from "./Card.js";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cards, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">

        <div className="profile__user-info">
          <button type="button" className="profile__avatar-button" onClick={onEditAvatar}>
            <img src={currentUser.avatar} className="profile__avatar" alt="Аватар" />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
            <h2 className="profile__about">{currentUser.about}</h2>
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
              onCardLike={onCardLike}
              handleCardDelete={onCardDelete}
            />
          )
        })}
      </div>
    </main>
  );
}

export default Main;