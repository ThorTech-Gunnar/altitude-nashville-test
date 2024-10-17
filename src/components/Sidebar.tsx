import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BarChart2, FileText, Users, Settings, Map } from 'lucide-react';
import theme from '@/styles/theme';

const Sidebar: React.FC = () => {
  const router = useRouter();

  const menuItems = [
    { name: 'Dashboard', icon: BarChart2, href: '/dashboard' },
    { name: 'Cases', icon: FileText, href: '/cases' },
    { name: 'Users', icon: Users, href: '/users' },
    { name: 'Floor Plans', icon: Map, href: '/floor-plans' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <div className="flex flex-col w-64 bg-white shadow-lg" style={{ backgroundColor: theme.colors.background }}>
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                router.pathname === item.href
                  ? `bg-${theme.colors.primary} text-white`
                  : `text-${theme.colors.text} hover:bg-${theme.colors.secondary} hover:text-white`
              }`}
            >
              <item.icon
                className={`mr-3 flex-shrink-0 h-6 w-6 transition-colors duration-200 ${
                  router.pathname === item.href ? 'text-white' : `text-${theme.colors.textLight} group-hover:text-white`
                }`}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;