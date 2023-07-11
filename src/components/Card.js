function Card({card, handleCardClick}) {
    
    function handleClick() {
        handleCardClick(card);
      } 

    return (
        <article className="element">
            <img src={card.link} className="element__img" alt={card.name} onClick={handleClick}/>
            <div className="element__info">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__container-like">
                    <button type="button" className="element__like"></button>
                    <div className="element__like-counter">{card.likes.length}</div>
                </div>
            </div>
            <button type="button" className="element__delete"></button>
        </article>
    );
}

export default Card;