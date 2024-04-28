'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
    id: z.string(),
    caseName: z.string(),
    createTime: z.string(),
    updateTime: z.string()
});

const CreateInvestment = FormSchema.omit({ id: true, createTime: true, updateTime: true });
const UpdateInvestment = FormSchema.omit({ id: true, createTime: true, updateTime: true });

export type State = {
    errors?: {
        caseName?: string[],
    };
    message?: string | null;
};

export async function createInvestment(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateInvestment.safeParse({
        caseName: formData.get('caseName')
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Data.',
        };
    }

    // Prepare data for insertion into the database
    const { caseName } = validatedFields.data;
    //   const amountInCents = amount * 100;
    //   const date = new Date().toISOString().split('T')[0];

    //   try {
    //     await sql`
    //       INSERT INTO invoices (customer_id, amount, status, date)
    //       VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    //     `;
    //   } catch (error) {
    //     return {
    //       message: 'Database Error: Failed to Create Invoice.',
    //     };
    //   }

    revalidatePath('/dashboard/manager/investment/list');
    redirect('/dashboard/manager/investment/list');
}

export async function updateInvestment(
    id: string,
    prevState: State,
    formData: FormData,
) {
    const validatedFields = UpdateInvestment.safeParse({
        caseName: formData.get('caseName'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { caseName } = validatedFields.data;
    //   const amountInCents = amount * 100;

    //   try {
    //     await sql`
    //       UPDATE invoices
    //       SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    //       WHERE id = ${id}
    //     `;
    //   } catch (error) {
    //     return { message: 'Database Error: Failed to Update Invoice.' };
    //   }

    revalidatePath('/dashboard/manager/investment/list');
    redirect('/dashboard/manager/investment/list');
}

export async function deleteInvestment(id: string) {
    console.dir('delete!')
    // throw new Error('Failed to Delete data');

    try {
        // await sql`DELETE FROM invoices WHERE id = ${id}`;
        // revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice.' };
      } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' };
      }
}