// JavaScript source code
import {useState} from 'react';
export default function Player({ initialName, symbol, isActive, onChangeName }){

   const[playerName, setPlayerName]=useState(initialName);
   const[isEditing, setIsEditing]= useState(false);
   function handleEditClick(){
       setIsEditing((editing) => !editing);
       if (isEditing)
       onChangeName(symbol, playerName);
   }
   function changeName(event){
       console.log(event);
       setPlayerName(event.target.value);
   }


   let editablePlayerName = <span className="player-name">{playerName}</span>;
   let btnName='Edit';
   if(isEditing)
   {
       editablePlayerName = <input type="text" required defaultValue={initialName} 
       onChange={changeName}/>;
       btnName='Save';
   }
	return ( 
        <li className={isActive ? 'active' : 'undefined'}>
        <span className="player">
           {editablePlayerName}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{btnName}</button>
        </li>
    );
}