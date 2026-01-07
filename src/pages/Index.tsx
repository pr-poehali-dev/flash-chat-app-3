import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatWindow from '@/components/ChatWindow';
import SectionContent from '@/components/SectionContent';

type Message = {
  id: number;
  text: string;
  time: string;
  isOwn: boolean;
  status: 'sent' | 'delivered' | 'read';
};

type Chat = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
};

const Index = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeSection, setActiveSection] = useState<'profile' | 'contacts' | 'chats' | 'channels' | 'favorites' | 'settings' | 'help'>('chats');
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [messageText, setMessageText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  const mockChats: Chat[] = [
    { id: 1, name: 'Алексей', avatar: '👨‍💻', lastMessage: 'Привет! Как дела?', time: '12:34', unread: 2, online: true },
    { id: 2, name: 'Мария', avatar: '👩‍🎨', lastMessage: 'Отправила файлы', time: '11:20', unread: 0, online: false },
    { id: 3, name: 'Команда Flash', avatar: '⚡', lastMessage: 'Новое обновление готово', time: 'Вчера', unread: 5, online: true },
  ];

  const mockMessages: Message[] = [
    { id: 1, text: 'Привет! Как проект?', time: '12:30', isOwn: false, status: 'read' },
    { id: 2, text: 'Всё отлично! Работаю над новой функцией 🚀', time: '12:32', isOwn: true, status: 'read' },
    { id: 3, text: 'Супер! Жду результаты', time: '12:34', isOwn: false, status: 'read' },
    { id: 4, text: 'Скоро покажу демо', time: '12:35', isOwn: true, status: 'delivered' },
  ];

  const emojis = ['😊', '👍', '❤️', '😂', '🎉', '🔥', '✨', '💯', '🚀', '⚡', '💪', '👏'];

  const sendMessage = () => {
    if (messageText.trim()) {
      console.log('Отправка:', messageText);
      setMessageText('');
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessageText(messageText + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="h-screen flex">
      <Sidebar
        theme={theme}
        activeSection={activeSection}
        onThemeToggle={toggleTheme}
        onSectionChange={setActiveSection}
      />

      {activeSection === 'chats' ? (
        <ChatWindow
          mockChats={mockChats}
          mockMessages={mockMessages}
          selectedChat={selectedChat}
          messageText={messageText}
          showEmojiPicker={showEmojiPicker}
          emojis={emojis}
          onChatSelect={setSelectedChat}
          onMessageChange={setMessageText}
          onSendMessage={sendMessage}
          onEmojiPickerToggle={() => setShowEmojiPicker(!showEmojiPicker)}
          onEmojiSelect={handleEmojiSelect}
        />
      ) : (
        <SectionContent activeSection={activeSection} mockChats={mockChats} />
      )}
    </div>
  );
};

export default Index;
