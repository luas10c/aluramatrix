import { createContext, useState, useEffect } from 'react';

import supa from '../../services/supa';

import useAuthentication from '../../hooks/useAuthentication';

type MessageContextData = {
  loadingMessages: boolean;
  messages: any[];
  emoji: string;
  setEmoji: any;
  handleSendMessage: (message: any) => Promise<void>;
}

export const MessageContext = createContext({} as MessageContextData);

export default function MessageProvider({ children }) {
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [emoji, setEmoji] = useState('');
  const { loadingAuthentication, authenticated, loadingProfile, profile } = useAuthentication();

  useEffect(() => {
    async function fetchMessages() {
      const { data: users } = await supa.from('users')
        .select('id, name, username, avatar_url');
      const { data: profileMessages } = await supa.from('messages')
        .select('id, content, user_id, created_at')
        .filter('user_id', 'eq', profile.id);
      const { data: anyMessages } = await supa.from('messages')
        .select('id, content, user_id, created_at')
        .filter('user_id', 'not.eq', profile.id);
      const newProfileMessages = !profileMessages ? [] : profileMessages.map((message) => {
        const { name, username, avatar_url } = users.filter((user) => user.id === message.user_id)[0];
        return {
          id: message.id,
          content: message.content,
          name,
          username,
          avatar_url,
          self: true,
          created_at: message.created_at
        }
      });
      const newAnyMessages = !anyMessages ? [] : anyMessages.map((message) => {
        const { name, username, avatar_url } = users.filter((user) => user.id === message.user_id)[0];
        return {
          id: message.id,
          content: message.content,
          name,
          username,
          avatar_url,
          self: false,
          created_at: message.created_at
        }
      })

      const allMessages = [...newProfileMessages, ...newAnyMessages];
      setAllMessages((oldState) => [...oldState, ...allMessages]);
    }

    if (!loadingAuthentication && authenticated && !loadingProfile && profile) {
      try {
        fetchMessages();
      } finally {
        setLoadingMessages(false);
      }
    }
  }, [loadingAuthentication, authenticated, profile, loadingProfile]);

  useEffect(() => {
    supa.from('messages').on('INSERT', async (data) => {
      const { data: user } = await supa.from('users')
      .select('name, avatar_url')
      .filter('id', 'eq', data.new.user_id);
      if (data.new.user_id !== profile.id) {
        setAllMessages((oldState) => [...oldState, {
          ...data.new,
          name: user[0].name,
          username: user[0].username,
          avatar_url: user[0].avatar_url
        }]);
      }
    }).subscribe();
  }, [profile]);

  useEffect(() => {
    const sortedMessages = allMessages.sort((a, b) => {
      if (a.created_at > b.created_at) {
        return 1;
      }
      if (a.created_at < b.created_at) {
        return -1;
      }
      return 0;
    });
    setMessages(sortedMessages);
  }, [allMessages]);

  async function handleSendMessage(message: any) {
    const { data } = await supa.from('messages').insert([message]);
    const { data: user } = await supa.from('users')
      .select('name, avatar_url')
      .filter('id', 'eq', message.user_id);
    setAllMessages((oldState) => [...oldState, { 
      ...data[0],
      name: user[0].name,
      username: user[0].username,
      avatar_url: user[0].avatar_url,
      self: true
    }]);
  }

  return (
    <MessageContext.Provider value={{ loadingMessages, messages, emoji, setEmoji, handleSendMessage }}>
      { children }
    </MessageContext.Provider>
  )
}