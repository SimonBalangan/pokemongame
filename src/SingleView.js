import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../src/Images/International_Pokémon_logo.png';
import pokeball from '../src/Images/4889-pokeball.png'



// import { Button } from 'react-bootstrap';

export default function SingleView({pokeList, setPokeUser, setPokeComp}){

    const [ chosen, setChosen ] = useState(false); //does this need to be state variable?

    const {id} = useParams();
    
    //get pokemon with id:
    const [pokeObj] = pokeList.filter((poke) => poke.id === parseInt(id));      //destructuring to get object from returned array
    //console.log(pokeObj);

    //PROBLEM: WHEN SITE IS REFRESHED, pokeObj becomes undefined


    //function: upon clicking, the user sets statevar "pokemonUser" in parent component "App" which is passed down to component "FightPage"
    function handleClick(){
        setPokeUser(pokeObj);
        //randomly setPokeComp:
        const randomIndex = Math.floor(Math.random() * 809);
        const randomPoke = pokeList[randomIndex];
        console.log("test aus handleClick(), randomPoke is: ", randomPoke);
        setPokeComp(randomPoke);
        //set boolean state var to true so that "Join the Fight"-Link appears...
        setChosen(true);
    }

    const ball = <img id="poke-pokeball" src={pokeball} alt="pokemon_ball"/>;

    return(
        <>
            <img id="poke-logo" src={logo} alt="pokemon_logo"/>
            <div>
            
            <h1>{ball}{pokeObj.name.english}{ball}</h1>
            
            </div>
            <div>
                {/* <p>Japanese name: {pokeObj.name.japanese}</p>
                <p>Chinese name: {pokeObj.name.chinese}</p> */}
                <p>Type: {pokeObj.type}</p>
                <p>Attack: {pokeObj.base.Attack}</p>
                <p>Defense: {pokeObj.base.Defense}</p>
                <p>HP: {pokeObj.base.HP}</p>
                <p>Speed Attack: {pokeObj.base["Sp. Attack"]}</p>
                <p>Speed Defense: {pokeObj.base["Sp. Defense"]}</p>
                <p>Speed: {pokeObj.base.Speed}</p>

                <div class="container">

                <button onClick={handleClick} href="#" class="button button--piyo">
                    <div class="button__wrapper">
                    <span class="button__text">Select: {pokeObj.name.english} </span>
                    
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
                <div class='joinFight'>
                {chosen && <Link id="fight-invite" to="/pokemon/fight">JOIN THE FIGHT!</Link>}</div>
            </div>
        </>
    );
}