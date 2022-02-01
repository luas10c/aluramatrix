import { useContext } from 'react';

import { MessageContext } from '../contexts/Message';

export default function useMessage() {
  const context = useContext(MessageContext);
  return context;
}