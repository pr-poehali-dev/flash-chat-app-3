import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

type SidebarProps = {
  theme: 'light' | 'dark';
  activeSection: 'profile' | 'contacts' | 'chats' | 'channels' | 'favorites' | 'settings' | 'help';
  onThemeToggle: () => void;
  onSectionChange: (section: 'profile' | 'contacts' | 'chats' | 'channels' | 'favorites' | 'settings' | 'help') => void;
};

const Sidebar = ({ theme, activeSection, onThemeToggle, onSectionChange }: SidebarProps) => {
  return (
    <div className="w-64 bg-sidebar border-r flex flex-col">
      <div className="h-16 flex items-center justify-between px-4 border-b">
        <div className="flex items-center gap-2">
          <div className="text-2xl">⚡</div>
          <span className="font-bold text-lg">Flash Chat</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onThemeToggle}>
          <Icon name={theme === 'light' ? 'Moon' : 'Sun'} size={20} />
        </Button>
      </div>

      <nav className="flex-1 p-2">
        <div className="space-y-1">
          <Button
            variant={activeSection === 'profile' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onSectionChange('profile')}
          >
            <Icon name="User" size={20} className="mr-3" />
            Профиль
          </Button>
          <Button
            variant={activeSection === 'contacts' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onSectionChange('contacts')}
          >
            <Icon name="Users" size={20} className="mr-3" />
            Контакты
          </Button>
          <Button
            variant={activeSection === 'chats' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onSectionChange('chats')}
          >
            <Icon name="MessageCircle" size={20} className="mr-3" />
            Чаты
            <Badge className="ml-auto">7</Badge>
          </Button>
          <Button
            variant={activeSection === 'channels' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onSectionChange('channels')}
          >
            <Icon name="Radio" size={20} className="mr-3" />
            Каналы
          </Button>
          <Button
            variant={activeSection === 'favorites' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onSectionChange('favorites')}
          >
            <Icon name="Star" size={20} className="mr-3" />
            Избранное
          </Button>
          <Separator className="my-2" />
          <Button
            variant={activeSection === 'settings' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onSectionChange('settings')}
          >
            <Icon name="Settings" size={20} className="mr-3" />
            Параметры
          </Button>
          <Button
            variant={activeSection === 'help' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onSectionChange('help')}
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
  );
};

export default Sidebar;
