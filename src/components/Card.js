import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";



function Card({card, handleCardClick, onCardLike, handleCardDelete}) {
    
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `element__like ${isLiked && 'element__like_active'}` 
      );; 


    function handleClick() {
        handleCardClick(card);
      } 

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        handleCardDelete(card);
    }

    return (
        <article className="element">
            <img src={card.link} className="element__img" alt={card.name} onClick={handleClick}/>
            <div className="element__info">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__container-like">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <div className="element__like-counter">{card.likes.length}</div>
                </div>
            </div>
            {isOwn && <button type="button" className="element__delete" onClick={handleDeleteClick}></button> } 
        </article>
    );
}

export default Card;