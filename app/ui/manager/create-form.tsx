'use client';

import Link from 'next/link';
import {
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { BaseInput } from '@/app/ui/form';
import { createInvestment } from '@/app/lib/manager/actions';
import { useFormState } from 'react-dom';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createInvestment, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <BaseInput
          name="name"
          label="Name"
          inputType="text"
          errors={state.errors?.name ? state.errors.name : []}
        />
        <BaseInput
          name="description"
          label="Description"
          inputType="text"
          errors={state.errors?.description ? state.errors.description : []}
        />
        <BaseInput
          name="price"
          label="Price"
          inputType="number"
          errors={state.errors?.price ? state.errors.price : []}
        />
        <BaseInput
          name="amount"
          label="Amount"
          inputType="number"
          errors={state.errors?.amount ? state.errors.amount : []}
        />
        <BaseInput
          name="profit"
          label="Profit"
          inputType="number"
          errors={state.errors?.profit ? state.errors.profit : []}
        />
        <BaseInput
          name="exprie_date"
          label="Exprie date"
          inputType="text"
          errors={state.errors?.exprie_date ? state.errors.exprie_date : []}
          defaultValue={new Date().toISOString().split('T')[0]}
        />

        <div id="create-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">
            {state.message}
          </p>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/manager/list"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}
