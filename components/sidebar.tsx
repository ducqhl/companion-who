'use client';

import { Home, Plus, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';
import ROUTES from '@/utils/routes';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const routes = [
    {
      icon: Home,
      href: ROUTES.ROOT,
      label: 'Home',
      protectedRoute: false,
    },
    {
      icon: Plus,
      href: ROUTES.CREATE_COMPANION,
      label: 'Create',
      protectedRoute: true,
    },
    {
      icon: Settings,
      href: ROUTES.SETTINGS,
      label: 'Settings',
      protectedRoute: true,
    },
  ];

  const onNavigation = (url: string, protectedRoute: boolean) => {
    // TODO: check if protected
    if (protectedRoute) return router.push(url);
    else return router.push(url);
  };

  return (
    <div className="space-y-4 bg-secondary flex flex-col h-full text-primary">
      <div className="p-3 flex flex-1 justify-center">
        <div className="space-y-2 w-full">
          {routes.map((route) => (
            <div
              onClick={() => onNavigation(route.href, route.protectedRoute)}
              key={route.label}
              className={cn(
                'text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition',
                pathname == route.href && 'bg-primary/10 text-primary',
              )}
            >
              <div className="flex flex-col gap-y-2 items-center justify-center flex-1">
                <route.icon className="h5 w-5" />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
