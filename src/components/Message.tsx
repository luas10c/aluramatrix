import { useState, useEffect } from 'react';
import { IoEllipsisVerticalSharp as Ellipsis } from 'react-icons/io5';
import dayjs from 'dayjs';

import Avatar from './Avatar';
import MessageActionModal from './MessageActionModal';
import Sticker from './Sticker';

import styles from '../styles/components/Message.module.scss';

export default function Message({ self, author, message }) {
  const [openedMessageActionModal, setOpenedMessageActionModal] = useState(false);
  
  useEffect(() => {
    function handleOutsideClick(event: any) {
      console.log(
        event.target.classList['value'].toString().startsWith('Messages_messages')
      )
    }
    window.addEventListener('click', handleOutsideClick);

    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);


  function handleOpenMessageActionModal() {
    setOpenedMessageActionModal((oldState) => !oldState);
  }

  return (
    <div className={`${styles.container}${self ? ` ${styles.end}` : ` ${styles.start}`}`}>
      <div className={styles['profile']}>
        <Avatar loading={false} avatar_url={author.avatar_url} width={64} height={64} />
        <div className={styles['profile-info']}>
          <h4>{author.name}</h4>
          <small>{dayjs(message.created_at).format('DD/MM/YYYY h:mm:ss A')}</small>
        </div>
        <div className={styles.actions} onClick={handleOpenMessageActionModal}>
          <button type="button">
            <Ellipsis size={16} color="#FFFFFF" />
          </button>
        </div>
      </div>
      <div className={styles.content}>
        {message.content.startsWith(':sticker:') ? (
            <Sticker sticker_url={message.content.replace(/:sticker:/, '')} />
        ) : 
          message.content
        }
      </div>
      <MessageActionModal opened={openedMessageActionModal} self={self} />
    </div>
  );
}