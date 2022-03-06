import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import {useSubscription, useMutation, useQuery} from "@apollo/client";
import { suscribeMessage } from './gql/Suscriptions/ReciveMessage';
import { sendMessageGQL } from './gql/Mutations/SendMessage';
import { getMessageGQL } from './gql/Querys/GetMessages';
import { getUsersGQL } from './gql/Querys/GetUsers';

const App = () => {
  //Hook
  const { data: Suscriptionmessages, error : errorMessages, loading : loadingMessages } = useSubscription(suscribeMessage);
  const [sendMessage, { data, loading, error }] = useMutation(sendMessageGQL);
  const {data: oldMessage, loading: loadingOldMessage, error: errorOldMessage } = useQuery(getMessageGQL);
  const {data: users, loading: loadingUsers, error: errorUsers } = useQuery(getUsersGQL);
  const [messages, setmessages] = useState([]);
  const [userSelect, setuserSelect] = useState(1)
  const [mensaje, setMensage] = useState('');
  const divRref = useRef(null);

  useEffect(() => {
    if(!loadingMessages){
      setmessages(message => [...message, Suscriptionmessages.recibeMessage.messagereceived])
      console.log(Suscriptionmessages)
    }
  }, [Suscriptionmessages])

  useEffect(() => {
    if(oldMessage){
      setmessages(oldMessage.allMessagesBySala)
    }
  }, [oldMessage])
  
  
  useEffect(() => {
    if (divRref) {
      divRref.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [])

  //Funciones
  const sendMessages = () => {
    sendMessage({
      variables: {
        messageData: {
          content:mensaje, sala:1, usuarioEnvia:userSelect, fechaHora:"2017-11-25T23:55:35.116Z"
        }
      }
    }).then(
      setMensage('')
    )
  }

  return (
    <>
      <div className="chat_window">
        <div className="top_menu">
          <select onChange={(e) => setuserSelect(e.target.value)}>
            {!loadingUsers && users.allUser.map(user => 
              <option value={user.id}>{user.nickname}</option>
            )}
          </select>
          <div className="buttons">
            <div className="button close"></div>
            <div className="button minimize"></div>
            <div className="button maximize"></div>
          </div>
          <div className="title">Chat</div>
        </div>
        <ul className="messages" ref={divRref}>
          {
            loadingOldMessage && <h4>Cargango Mensajes...</h4>
          }
          {
            messages.map(category =>
              <li className={category.usuarioEnvia.id == userSelect ? "message right appeared" : "message left appeared"} key={category.id}>
                <div className="avatar">
                </div>
                <div className="text_wrapper">
                  <div className="text">
                     {category.content}
                  </div>
                </div>
              </li>
            )
          }
        </ul>
        <div className="bottom_wrapper clearfix">
          <div className="message_input_wrapper">
            <input className="message_input" placeholder="Ingrese su Mensaje aquí..." value={mensaje} onChange={e => {setMensage(e.target.value)}} />
          </div>
          <div className="send_message">
            <div className="icon"></div>
            <div className="text" onClick={sendMessages}>Enviar</div>
          </div>
        </div>
      </div>
      <div className="message_template">
        <li className="message">
          <div className="avatar"></div>
          <div className="text_wrapper">
            <div className="text"></div>
          </div>
        </li>
      </div>
    </>
  );
}

export default App;
