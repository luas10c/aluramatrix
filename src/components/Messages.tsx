import { useEffect, useRef } from 'react';
import { IoEllipsisVerticalSharp as Ellipsis } from 'react-icons/io5';


import useMessage from '../hooks/useMessage';

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

/*

return (
              <div key={message.id} className={`${styles.message}${message.self ? ` ${styles.self}` : ` ${styles.you}`}`}>
                <div className={styles['message-header']}>
                  <Avatar loading={false} avatar_url={message.avatar_url} width={36} height={36} />
                  <div className={styles['profile-info']}>
                    <h4>{message.name}</h4>
                    <small className={styles.date}>{new Date(message.created_at).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit'})}</small>
                  </div>
                  <div className={styles.actions}>
                      <button type="button" className={styles['button-transparent']} onClick={handleModalMessageActions}>
                        <Ellipsis size={14} color="#FFFFFF" />
                      </button>
                  </div>
                </div>
                <div className={styles['message-content']}>
                  {message.content.startsWith(':sticker:') ? (
                    <Sticker sticker_url={message.content.replace(/:sticker:/, '')} />
                  ) : 
                    message.content
                  }
                </div>  
                <MessageActionModal self={message.self} />
              </div>
            )

*/