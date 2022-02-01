import { useEffect } from 'react';
import { FaCopy, FaPen, FaTrashAlt } from 'react-icons/fa';

import styles from '../styles/components/MessageActionModal.module.scss';

export default function MessageActionModal({ opened, self }) {
  
  function handleCopyMessage() {
    alert('Copy Message')
  }

  function handleEditMessage() {
    alert('Edit Message')
  }

  function handleRemoveMessage() {
    alert('Remove Message')
  }


  return opened ? (
    <div className={styles.container}>
      <ul>
        <li>
        <button type="button" onClick={handleCopyMessage}>
          <FaCopy size={14} color="#FFFFFF" />
          Copiar
        </button>
        </li>
        { self && (
          <>
            <li>
              <button type="button" onClick={handleEditMessage}>
                <FaPen size={14} color="#FFFFFF" />
                Editar
              </button>
            </li>
            <li>
              <button type="button" onClick={handleRemoveMessage}>
                <FaTrashAlt size={14} color="#FFFFFF" />
                Remover
              </button>
            </li>
          </>
      )}
      </ul>
    </div>
  ) : null
}