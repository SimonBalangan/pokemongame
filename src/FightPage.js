import logo from '../src/Images/International_Pokémon_logo.png';
import pokeball from '../src/Images/4889-pokeball.png'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import PokeBall from '../src/Images/pokeball.png';
import { useEffect, useState } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';

export default function FightPage({pokeUser, pokeComp}){

    const [ altUserPoke, setAltUserPoke ] = useState();              //same pokemon as pokeUser but with enhanced data structure (from external API)
    const [ altCompPoke, setAltCompPoke ] = useState();              //same pokemon as pokeComp but with enhanced data structure (from external API)
    const [ userPokeImage, setUserPokeImage ] = useState(PokeBall);  //default setting: image of pokeUser is set to PokeBall + reset if image can be fetched from external (second) API
    const [ compPokeImage, setCompPokeImage ] = useState(PokeBall);  //default setting: image of pokeComp is set to PokeBall + reset if image can be fetched from external (second) API

    //for pokeUser:
    useEffect(() => {
        const name = pokeUser.name.english.toLowerCase();
        const URL = `https://pokeapi.co/api/v2/pokemon/${name}`;  
        axios.get(URL)
        .then(res => {
            //altUserPoke is fetched from external API and if there is an image it is set as "userPokeImage" (otherwise default image is used)
            setAltUserPoke(res.data);
            if(res.data.sprites.other["official-artwork"].front_default){
                setUserPokeImage(res.data.sprites.other["official-artwork"].front_default);
            }
            })
        .catch(err => console.log(err))
    }, []);

    //for pokeComp:
    useEffect(() => {
        const name = pokeComp.name.english.toLowerCase();
        const URL = `https://pokeapi.co/api/v2/pokemon/${name}`;  
        axios.get(URL)
        .then(res => {
            //altCompPoke is fetched from external API and if there is an image it is set as "compPokeImage" (otherwise default image is used)
            setAltCompPoke(res.data);
            if(res.data.sprites.other["official-artwork"].front_default){
                setCompPokeImage(res.data.sprites.other["official-artwork"].front_default);
            }
            })
        .catch(err => console.log(err))
    }, []);

    //console.log("test from fightpage, altUserPoke is: ", altUserPoke);
    //console.log("test from fightpage, altCompPoke is: ", altCompPoke);








    function evaluate(){
        let userCounter = 0;
        let compCounter = 0;
        //compare categories of pokemon-Objs and increment user or comp accordingly:
        pokeUser.base.Attack > pokeComp.base.Attack ? userCounter++ : compCounter++;
        pokeUser.base.Defense > pokeComp.base.Defense ?  userCounter++ : compCounter++;
        pokeUser.base.HP > pokeComp.base.HP ?  userCounter++ : compCounter++;
        pokeUser.base["Sp. Attack"] > pokeComp.base["Sp. Attack"] ?  userCounter++ : compCounter++;
        pokeUser.base["Sp. Defense"] > pokeComp.base["Sp. Defense"] ?  userCounter++ : compCounter++;
        pokeUser.base.Speed > pokeComp.base.Speed ?  userCounter++ : compCounter++;
        const winner = userCounter >= compCounter ? "user" : "computer";
        return winner;
    }

    function handleClick(){
        const winner = evaluate();
        if(winner === "user"){
            toast(`Congratulations! 
            🦄 Your pokemon ${pokeUser.name.english} has beaten ${pokeComp.name.english} - you win!`);
        } else {
            toast.error(`Sorry, ${pokeComp.name.english} has beaten your pokemon ${pokeUser.name.english}! Try again!`);
        }
    }

    const ball = <img id="poke-pokeball" src={pokeball} alt="pokemon_ball"/>;
    return(
    <>
        <img id="poke-logo" src={logo} alt="pokemon_logo"/>
        <div id="rival-container">
            <div id="user-choice">
                <h2>Your chosen pokemon is: </h2>
                <div className='userNpcName'>
                <p>{ball}<strong>{pokeUser.name.english}</strong>{ball}</p>
                </div>
                <div className='pokemonImage'>
                    <img className="fight-image" src={userPokeImage} alt="user_poke"/>
                </div>
                <p>Type: {pokeUser.type}</p>
                <p>Attack: {pokeUser.base.Attack}</p>
                <p>Defense: {pokeUser.base.Defense}</p>
                <p>HP: {pokeUser.base.HP}</p>
                <p>Speed Attack: {pokeUser.base["Sp. Attack"]}</p>
                <p>Speed Defense: {pokeUser.base["Sp. Defense"]}</p>
                <p>Speed: {pokeUser.base.Speed}</p>
            </div>
            <div id="computer-choice">
                <h2>Your enemy's chosen pokemon is: </h2>
                <div className='userNpcName'>
                <p>{ball}<strong>{pokeComp.name.english}</strong>{ball}</p>
                </div>
                <img className="fight-image" src={compPokeImage} alt="comp_poke"/>
                <p>Type: {pokeComp.type}</p>
                <p>Attack: {pokeComp.base.Attack}</p>
                <p>Defense: {pokeComp.base.Defense}</p>
                <p>HP: {pokeComp.base.HP}</p>
                <p>Speed Attack: {pokeComp.base["Sp. Attack"]}</p>
                <p>Speed Defense: {pokeComp.base["Sp. Defense"]}</p>
                <p>Speed: {pokeComp.base.Speed}</p>
            </div>
        </div>
       
<div class="container">

<button onClick={handleClick} href="#" class="button button--hoo">
    <div class="button__wrapper">
        <span class="button__text">FIGHT </span>
        </div>
         <div class="characterBox">
         <div class="character wakeup">
        <div class="character__face"></div>
        </div>
        <div class="character wakeup">
        <div class="character__face"></div>
        </div>
        <div class="character">
        <div class="character__face"></div>
        </div>
        </div>
</button>

</div>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
    </>
    );
}









