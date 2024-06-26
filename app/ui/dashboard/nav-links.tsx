'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserIcon,
  RocketLaunchIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
  {
    name: 'Basic CRUD',
    href: '/dashboard/manager/list',
    icon: RocketLaunchIcon,
  },
  {
    name: 'CSS Demo',
    href: '',
    icon: UserIcon,
    children: [
      { name: 'Dice', href: '/dashboard/cssDemo/diceGame' },
      // { name: 'continue1', href: '/dashboard/user/inventory' },
      // { name: 'continue2', href: '/dashboard/user/profit' },
    ],
  },
  {
    name: 'Game',
    href: '/game',
    icon: CubeIcon,
    target: 'blank'
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;

        return (
          <div key={link.name}>
            <Link
              href={link.href}
              className={clsx(
                'flex items-center gap-2 rounded-md p-3 text-sm font-medium',
                {
                  'bg-sky-100 text-blue-600': pathname === link.href,
                },
              )}
              target={link.target}
            >
              <LinkIcon className="w-6" />
              <span>{link.name}</span>
            </Link>
            {link.children && (
              <div className="ml-4 mt-2 space-y-1">
                {link.children.map((child) => {
                  return (
                    <Link
                      key={child.name}
                      href={child.href}
                      className={clsx(
                        'block rounded-md px-3 py-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600',
                        {
                          'bg-sky-100 text-blue-600': pathname === child.href,
                        },
                      )}
                    >
                      {child.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
