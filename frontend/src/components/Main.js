import Avatar from '../images/test.jpg'
import { api } from '../utils/Api';
import React, { useState } from 'react';
import Card from './Card';

import { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Main(props) {
    const currentUser = useContext(CurrentUserContext)

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar-box">
                    <img className="profile__avatar" src={currentUser.avatar} /* style={{ backgroundImage: `url(${userAvatar})` }} */ alt="Аватар" />
                    <button className="profile__avatar-button" type="button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">

                {props.cards.map((card) => {

                    return <Card
                        key={card._id}
                        newCard={card}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete} />
                })}
            </section>
        </main>
    );
}


