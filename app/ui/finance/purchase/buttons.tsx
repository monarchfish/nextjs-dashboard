import { deleteInvestment } from '@/app/lib/manager/actions';
import { PencilIcon, PlusIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateButton() {
  return (
    <Link
      href="/dashboard/manager/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">新增案件</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function EditButton({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/manager/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteButton({
  id,
}: {
  id: string;
}) {
  const deleteInvestmentWithId = deleteInvestment.bind(null, id);

  return (
    <form action={deleteInvestmentWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function ViewButton({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/user/list/${id}/view`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <MagnifyingGlassIcon className="w-5" />
    </Link>
  );
}
