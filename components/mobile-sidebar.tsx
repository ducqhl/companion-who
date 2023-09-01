import { Menu } from 'lucide-react';
import React from 'react';

import Sidebar from '@/components/sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-secondary pt-10 w-30">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
