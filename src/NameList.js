import { Link } from 'react-router-dom';
import logo from '../src/Images/International_Pokémon_logo.png';
import pokeball from '../src/Images/4889-pokeball.png'

export default function NameList({pokeList}){

    const ball = <img id="poke-pokeball" src={pokeball} alt="pokemon_ball"/>;


    return(
        <>
            
            <img id="poke-logo" src={logo} alt="pokemon_logo"/>
            
            <h1>Choose a pokemon from the list!</h1>
            {pokeList.map(poke => 
            <Link className="poke-list-item" to={"/pokemon/" + poke.id}>
                <li>
                    <div id='bulletBall'>
                        {ball}
                        {poke.name.english}
                    </div>
                </li>
            </Link>)} 
            
        </>
    );

}









