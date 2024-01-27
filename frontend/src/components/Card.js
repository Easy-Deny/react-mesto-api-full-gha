import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
let cardLiked = undefined;

function Card(props) {
    const currentUser = useContext(CurrentUserContext)
    const isOwn = props.newCard.owner._id === currentUser._id;
    const isLiked = props.newCard.likes.some(i => i._id === currentUser._id);
   /*  function isLiked(card) {
        return cardLiked = card.likes.some(element => { return (element._id === currentUser._id) })
    } */

    function handleClick() {
        props.onCardClick(props.newCard);
      }  
      function handleLikeClick(){
        props.onCardLike(props.newCard);
      }
      function handleDeleteClick(){
        props.onCardDelete(props.newCard);
      }

    return (
            <article className="element">
            {isOwn && <button className="element__delete-button" type="button" onClick={handleDeleteClick}></button>}
                <img className="element__img" src={props.newCard.link} onClick={handleClick} alt={props.newCard.name}/>
                <div className="element__description">
                    <h2 className="element__name">{props.newCard.name}</h2>
                    <div className="element__like-box">
                        <button className={isLiked ? 'element__like-button element__like-button_is-liked' : 'element__like-button'} type="button" onClick={handleLikeClick}></button>
                        <p className="element__like-counter">{props.newCard.likes.length}</p>
                    </div>
                </div>
            </article>
    );
}
export default Card