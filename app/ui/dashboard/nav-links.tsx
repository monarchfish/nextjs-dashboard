'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserIcon,
  RocketLaunchIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: '投資經理',
    href: '',
    icon: RocketLaunchIcon,
    children: [
      { name: '案件管理', href: '/dashboard/manager/list' },
    ],
  },
  {
    name: '使用者',
    href: '',
    icon: UserIcon,
    children: [
      { name: '案件總覽', href: '/dashboard/user/list' },
      { name: '投資庫存', href: '/dashboard/user/inventory' },
      { name: '收益報表', href: '/dashboard/user/profit' },
    ],
  },
  {
    name: '財務人員',
    href: '',
    icon: CurrencyDollarIcon,
    children: [
      { name: '新申購審核', href: '/dashboard/finance/purchase' },
      { name: '月分潤審核', href: '/dashboard/finance/profit' },
      { name: '到期案件審核', href: '/dashboard/finance/expire' },
    ],
  },
  // {
  //   name: '執行長',
  //   href: '',
  //   icon: HomeIcon,
  //   children: [
  //     { name: '全部案件', href: '/dashboard/investment/list' },
  //     { name: '月現金流報表', href: '/dashboard/cashFlow' },
  //   ],
  // },
  // { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon },
  // { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
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
                        'block rounded-md py-2 px-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600',
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
