import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
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

type ChatWindowProps = {
  mockChats: Chat[];
  mockMessages: Message[];
  selectedChat: number | null;
  messageText: string;
  showEmojiPicker: boolean;
  emojis: string[];
  onChatSelect: (chatId: number) => void;
  onMessageChange: (text: string) => void;
  onSendMessage: () => void;
  onEmojiPickerToggle: () => void;
  onEmojiSelect: (emoji: string) => void;
};

const ChatWindow = ({
  mockChats,
  mockMessages,
  selectedChat,
  messageText,
  showEmojiPicker,
  emojis,
  onChatSelect,
  onMessageChange,
  onSendMessage,
  onEmojiPickerToggle,
  onEmojiSelect,
}: ChatWindowProps) => {
  const currentChat = mockChats.find(c => c.id === selectedChat);

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
              onClick={() => onChatSelect(chat.id)}
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
                  onChange={(e) => onMessageChange(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0"
                  onClick={onEmojiPickerToggle}
                >
                  <Icon name="Smile" size={20} />
                </Button>
                {showEmojiPicker && (
                  <div className="absolute bottom-full right-0 mb-2 p-3 bg-popover border rounded-lg shadow-lg grid grid-cols-6 gap-2">
                    {emojis.map((emoji, i) => (
                      <button
                        key={i}
                        onClick={() => onEmojiSelect(emoji)}
                        className="text-2xl hover:scale-125 transition-transform"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Button onClick={onSendMessage} size="icon" className="rounded-full">
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
};

export default ChatWindow;
