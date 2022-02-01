import React, { useState, useEffect } from 'react';
import { RiEmotionFill } from 'react-icons/ri';
import { MdSend } from 'react-icons/md'

import useAuthentication from '../hooks/useAuthentication';
import useMessage from '../hooks/useMessage';

import StickerModal from './StickerModal';

import styles from '../styles/components/MessageForm.module.scss';

export default function MessageForm() {
  const [message, setMessage] = useState('');
  const [openedModalStickers, setOpenedModalStickers] = useState(false);
  const { profile } = useAuthentication();
  const { handleSendMessage } = useMessage();
  
  async function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (profile && message.trim().length > 0) {
      setMessage('');
      handleSendMessage({ content: message, user_id: profile.id });
    }
  }

  function handleModalStickers() {
    setOpenedModalStickers((oldState) => !oldState);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmitForm}>
        <button type="button" title="Emoticon">
          <RiEmotionFill size={24} color="#FFFFFF" />
        </button>
        <textarea
          className={styles.textarea}
          onKeyDown={(event) => console.log(event.code)}
          onChange={(event) => setMessage(event.target.value)} value={message}
        />
        <button type="submit" title="Enviar">
          <MdSend size={18} color="#FFFFFF" />
        </button>
      </form>
      {/* <StickerModal opened={openedModalStickers} /> */}
    </div>
  )
}