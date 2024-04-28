'use client';

import Link from 'next/link';
import {
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvestment } from '@/app/lib/investmentTableAction';
import { useFormState } from 'react-dom';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createInvestment, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* 案件名稱 */}
        <div className="mb-4">
          <label htmlFor="caseName" className="mb-2 block text-sm font-medium">
            案件名稱
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="caseName"
                name="caseName"
                type="number"
                step="0.01"
                placeholder="Enter caseName"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="caseName-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="caseName-error" aria-live="polite" aria-atomic="true">
            {state.errors?.caseName &&
              state.errors.caseName.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))
            }
          </div>
        </div>

        <div id="create-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">
            {state.message}
          </p>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/manager/investment/list"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          取消
        </Link>
        <Button type="submit">新增案件</Button>
      </div>
    </form>
  );
}
