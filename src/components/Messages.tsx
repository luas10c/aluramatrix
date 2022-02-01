import { useEffect, useRef } from 'react';
import { IoEllipsisVerticalSharp as Ellipsis } from 'react-icons/io5';


import useMessage from '../hooks/useMessage';
import useAuthentication from '../hooks/useAuthentication';

import Avatar from '../components/Avatar';
import MessageActionModal from './MessageActionModal';
import Sticker from './Sticker';

import Message from './Message';
import Loading from './Loading';

import styles from '../styles/components/Messages.module.scss';

export default function Messages() {
  const { loadingMessages, messages } = useMessage();
  const messagesRef = useRef<any>();

  useEffect(() => {
    if (messagesRef && messagesRef.current && messagesRef.current.lastChild) {
      messagesRef.current.scrollTo({
        behavior: 'smooth',
        top: messagesRef.current.lastChild.offsetTop,
      })
    }
  }, [loadingMessages, messages]);

  return (
    <div className={styles.container}>
      <h3>Mensagens</h3>
     { loadingMessages && <Loading />}
      <div className={styles.messages} ref={messagesRef}>
        { messages.map((message) => 
          <Message
            key={message.id}
            message={{ content: message.content, created_at: message.created_at }}
            author={{
              name: message.name,
              username: message.username,
              avatar_url: message.avatar_url
            }}
            self={message.self} 
          />
        )}
      </div>
    </div>
  )
}