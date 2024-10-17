import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { AlertCircle, LogOut, User, FileText, BarChart2, Settings } from 'lucide-react';
import GlobalSearch from './GlobalSearch';
import NotificationDropdown from './NotificationDropdown';
import theme from '@/styles/theme';

const Navbar: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) return null;

  const isActive = (path: string) => router.pathname === path;

  return (
    <nav className="bg-white shadow-md" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/dashboard" className="flex-shrink-0 flex items-center">
              <AlertCircle className="h-8 w-8" style={{ color: theme.colors.primary }} />
              <span className="ml-2 font-bold text-xl" style={{ color: theme.colors.text }}>Incident Manager</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink href="/dashboard" icon={BarChart2} isActive={isActive('/dashboard')}>Dashboard</NavLink>
              <NavLink href="/cases" icon={FileText} isActive={isActive('/cases')}>Cases</NavLink>
              {(session.user.role === 'admin' || session.user.role === 'superadmin') && (
                <>
                  <NavLink href="/users" icon={User} isActive={isActive('/users')}>Users</NavLink>
                  <NavLink href="/floor-plans" icon={Settings} isActive={isActive('/floor-plans')}>Floor Plans</NavLink>
                </>
              )}
              {session.user.role === 'superadmin' && (
                <NavLink href="/franchises" icon={Settings} isActive={isActive('/franchises')}>Franchises</NavLink>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <GlobalSearch />
            </div>
            <NotificationDropdown />
            <div className="ml-3 relative">
              <button
                onClick={() => signOut()}
                className="ml-3 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
                style={{ 
                  backgroundColor: theme.colors.primary,
                  boxShadow: theme.shadows.sm,
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ href: string; icon: React.ElementType; isActive: boolean; children: React.ReactNode }> = ({ href, icon: Icon, isActive, children }) => (
  <Link
    href={href}
    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'border-primary text-primary'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
    }`}
    style={{ 
      borderColor: isActive ? theme.colors.primary : 'transparent',
      color: isActive ? theme.colors.primary : theme.colors.textLight,
    }}
  >
    <Icon className="mr-2 h-5 w-5" />
    {children}
  </Link>
);

export default Navbar;