'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
    children: [
      { name: 'List', href: '/dashboard/invoices/list' },
      { name: 'Create', href: '/dashboard/invoices/create' },
    ],
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname.startsWith(link.href);

        return (
          <div key={link.name}>
            <Link
              href={link.href}
              className={clsx(
                'flex items-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600',
                {
                  'bg-sky-100 text-blue-600': isActive,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <span>{link.name}</span>
            </Link>
            {link.children && (
              <div className="ml-4 mt-2 space-y-1">
                {link.children.map((child) => {
                  const isChildActive = pathname === child.href;
                  return (
                    <Link
                      key={child.name}
                      href={child.href}
                      className={clsx(
                        'block rounded-md py-2 px-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600',
                        {
                          'bg-sky-100 text-blue-600': isChildActive,
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
