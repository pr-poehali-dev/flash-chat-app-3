import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

  const currentChat = mockChats.find(c => c.id === selectedChat);

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-6 max-w-md">
              <Avatar className="w-32 h-32 mx-auto border-4 border-primary">
                <AvatarFallback className="text-5xl">👤</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold">Мой профиль</h2>
                <p className="text-muted-foreground mt-2">@username</p>
              </div>
              <div className="space-y-3">
                <Input placeholder="О себе..." defaultValue="Пользователь Flash Chat" />
                <Button className="w-full">Сохранить изменения</Button>
              </div>
            </div>
          </div>
        );

      case 'contacts':
        return (
          <div className="flex-1 p-6">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Контакты</h2>
                <Button size="sm">
                  <Icon name="UserPlus" size={16} className="mr-2" />
                  Добавить
                </Button>
              </div>
              {mockChats.map(chat => (
                <div key={chat.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <Avatar>
                    <AvatarFallback>{chat.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">{chat.name}</div>
                    <div className="text-sm text-muted-foreground">В сети</div>
                  </div>
                  {chat.online && <div className="w-3 h-3 bg-green-500 rounded-full" />}
                </div>
              ))}
            </div>
          </div>
        );

      case 'channels':
        return (
          <div className="flex-1 p-6">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Каналы</h2>
                <Button size="sm">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать канал
                </Button>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                <Avatar className="w-14 h-14">
                  <AvatarFallback>📢</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold">Flash News</div>
                  <div className="text-sm text-muted-foreground">Официальный канал</div>
                  <div className="text-xs text-muted-foreground mt-1">1.2K подписчиков</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <Icon name="Star" size={64} className="mx-auto text-yellow-500" />
              <h2 className="text-2xl font-semibold">Избранное</h2>
              <p className="text-muted-foreground">Сохраняйте важные сообщения здесь</p>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="flex-1 p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Параметры</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Icon name="Bell" size={20} />
                    <div>
                      <div className="font-medium">Уведомления</div>
                      <div className="text-sm text-muted-foreground">Звуки и оповещения</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon name="ChevronRight" size={16} />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Icon name="Timer" size={20} />
                    <div>
                      <div className="font-medium">Самоудаление</div>
                      <div className="text-sm text-muted-foreground">Автоматическое удаление через 24ч</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon name="ChevronRight" size={16} />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Icon name="Lock" size={20} />
                    <div>
                      <div className="font-medium">Шифрование</div>
                      <div className="text-sm text-muted-foreground">End-to-End включено</div>
                    </div>
                  </div>
                  <Badge variant="secondary">ON</Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Icon name="Languages" size={20} />
                    <div>
                      <div className="font-medium">Язык</div>
                      <div className="text-sm text-muted-foreground">Українська</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon name="ChevronRight" size={16} />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Icon name="UserX" size={20} />
                    <div>
                      <div className="font-medium">Заблокированные</div>
                      <div className="text-sm text-muted-foreground">Список заблокированных</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon name="ChevronRight" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'help':
        return (
          <div className="flex-1 p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl font-semibold mb-6">Справка Flash Chat</h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg border">
                  <h3 className="font-semibold mb-2">Как отправить сообщение?</h3>
                  <p className="text-sm text-muted-foreground">Выберите чат, введите текст и нажмите Enter или кнопку отправки.</p>
                </div>

                <div className="p-4 rounded-lg border">
                  <h3 className="font-semibold mb-2">Как добавить друга?</h3>
                  <p className="text-sm text-muted-foreground">Перейдите в раздел Контакты и нажмите "Добавить", введите username.</p>
                </div>

                <div className="p-4 rounded-lg border">
                  <h3 className="font-semibold mb-2">Что такое самоудаление?</h3>
                  <p className="text-sm text-muted-foreground">Сообщения автоматически удаляются через заданное время для безопасности.</p>
                </div>

                <div className="p-4 rounded-lg border">
                  <h3 className="font-semibold mb-2">Безопасность данных</h3>
                  <p className="text-sm text-muted-foreground">Все сообщения защищены End-to-End шифрованием.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'chats':
      default:
        return (
          <div className="flex-1 flex">
            <div className="w-80 border-r flex flex-col">
              <div className="p-4 border-b">
                <Input placeholder="Поиск..." className="w-full" />
              </div>
              <ScrollArea className="flex-1">
                {mockChats.map(chat => (
                  <div
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
                      selectedChat === chat.id ? 'bg-accent' : 'hover:bg-accent/50'
                    }`}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>{chat.avatar}</AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{chat.name}</span>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground truncate">{chat.lastMessage}</span>
                        {chat.unread > 0 && (
                          <Badge className="ml-2 bg-primary text-primary-foreground">{chat.unread}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>

            {selectedChat ? (
              <div className="flex-1 flex flex-col">
                <div className="h-16 border-b flex items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{currentChat?.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{currentChat?.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {currentChat?.online ? 'в сети' : 'был(а) недавно'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Icon name="Phone" size={20} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="Video" size={20} />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Icon name="MoreVertical" size={20} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Icon name="Star" size={16} className="mr-2" />
                          В избранное
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Icon name="Archive" size={16} className="mr-2" />
                          Архивировать
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Icon name="Trash2" size={16} className="mr-2" />
                          Удалить чат
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4 max-w-4xl mx-auto">
                    {mockMessages.map(msg => (
                      <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                        <div
                          className={`max-w-md rounded-2xl px-4 py-2 ${
                            msg.isOwn
                              ? 'bg-[hsl(var(--message-out))] text-foreground rounded-br-sm'
                              : 'bg-[hsl(var(--message-in))] border rounded-bl-sm'
                          }`}
                        >
                          <div className="text-sm">{msg.text}</div>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-xs text-muted-foreground">{msg.time}</span>
                            {msg.isOwn && (
                              <Icon
                                name={msg.status === 'read' ? 'CheckCheck' : 'Check'}
                                size={14}
                                className={msg.status === 'read' ? 'text-primary' : 'text-muted-foreground'}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="border-t p-4">
                  <div className="flex items-center gap-2 max-w-4xl mx-auto">
                    <Button variant="ghost" size="icon">
                      <Icon name="Paperclip" size={20} />
                    </Button>
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Сообщение..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        className="pr-10"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      >
                        <Icon name="Smile" size={20} />
                      </Button>
                      {showEmojiPicker && (
                        <div className="absolute bottom-full right-0 mb-2 p-3 bg-popover border rounded-lg shadow-lg grid grid-cols-6 gap-2">
                          {emojis.map((emoji, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                setMessageText(messageText + emoji);
                                setShowEmojiPicker(false);
                              }}
                              className="text-2xl hover:scale-125 transition-transform"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button onClick={sendMessage} size="icon" className="rounded-full">
                      <Icon name="Send" size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Выберите чат для начала общения
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-64 bg-sidebar border-r flex flex-col">
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <div className="flex items-center gap-2">
            <div className="text-2xl">⚡</div>
            <span className="font-bold text-lg">Flash Chat</span>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <Icon name={theme === 'light' ? 'Moon' : 'Sun'} size={20} />
          </Button>
        </div>

        <nav className="flex-1 p-2">
          <div className="space-y-1">
            <Button
              variant={activeSection === 'profile' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('profile')}
            >
              <Icon name="User" size={20} className="mr-3" />
              Профиль
            </Button>
            <Button
              variant={activeSection === 'contacts' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('contacts')}
            >
              <Icon name="Users" size={20} className="mr-3" />
              Контакты
            </Button>
            <Button
              variant={activeSection === 'chats' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('chats')}
            >
              <Icon name="MessageCircle" size={20} className="mr-3" />
              Чаты
              <Badge className="ml-auto">7</Badge>
            </Button>
            <Button
              variant={activeSection === 'channels' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('channels')}
            >
              <Icon name="Radio" size={20} className="mr-3" />
              Каналы
            </Button>
            <Button
              variant={activeSection === 'favorites' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('favorites')}
            >
              <Icon name="Star" size={20} className="mr-3" />
              Избранное
            </Button>
            <Separator className="my-2" />
            <Button
              variant={activeSection === 'settings' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('settings')}
            >
              <Icon name="Settings" size={20} className="mr-3" />
              Параметры
            </Button>
            <Button
              variant={activeSection === 'help' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('help')}
            >
              <Icon name="HelpCircle" size={20} className="mr-3" />
              Справка
            </Button>
          </div>
        </nav>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback>👤</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">Вы</div>
              <div className="text-xs text-muted-foreground truncate">@username</div>
            </div>
          </div>
        </div>
      </div>

      {renderSection()}
    </div>
  );
};

export default Index;
