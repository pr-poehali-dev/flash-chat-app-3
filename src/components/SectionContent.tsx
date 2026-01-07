import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type Chat = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
};

type SectionContentProps = {
  activeSection: 'profile' | 'contacts' | 'chats' | 'channels' | 'favorites' | 'settings' | 'help';
  mockChats: Chat[];
};

const SectionContent = ({ activeSection, mockChats }: SectionContentProps) => {
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

    default:
      return null;
  }
};

export default SectionContent;
