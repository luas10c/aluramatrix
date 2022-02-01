import React, { useState, useEffect } from 'react';
import { RiEmotionFill } from 'react-icons/ri';
import { MdSend } from 'react-icons/md'

import useAuthentication from '../hooks/useAuthentication';
import useMessage from '../hooks/useMessage';

import StickerModal from './StickerModal';

import styles from '../styles/components/MessageForm.module.scss';
import SentimentModal from './SentimentModal';

export default function MessageForm() {
  const [message, setMessage] = useState('');
  const [openedModalSentiment, setOpenedModalSentiment] = useState(false);
  const { profile } = useAuthentication();
  const { handleSendMessage, emoji, setEmoji } = useMessage();

  useEffect(() => {
    if (emoji) {
      setMessage((oldState) => `${message}${emoji}`);
      setEmoji('');
    }
  }, [emoji, message, setEmoji])
  
  async function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (profile && message.trim().length > 0) {
      setMessage('');
      handleSendMessage({ content: message, user_id: profile.id });
    } else {
      alert('Você deve digitar alguma coisa para enviar!');
    }
  }

  function handleModalStickers() {
    setOpenedModalSentiment((oldState) => !oldState);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmitForm}>
        <button type="button" onClick={handleModalStickers} title="Emoticon">
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
      <SentimentModal opened={openedModalSentiment}/>
    </div>
  )
}