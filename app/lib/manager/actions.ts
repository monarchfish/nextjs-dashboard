'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from "@/auth"

const FormSchema = z.object({
    id: z.string(),
    name: z.string().trim().min(1, { message: "Please input name" }),
    description: z.string().trim().min(1, { message: "Please input description" }),
    price: z.coerce.number().gt(0, { message: 'Please enter an price greater than $0.' }),
    amount: z.coerce.number().gt(0, { message: 'Please enter an price greater than $0.' }),
    profit: z.coerce.number().gt(0, { message: 'Please enter an profit greater than 0%.' }),
    exprie_date: z.string(),
});

const CreateInvestment = FormSchema.omit({ id: true, updateTime: true });
const UpdateInvestment = FormSchema.omit({ id: true, updateTime: true });

export type State = {
    errors?: {
        name?: string[],
        description?: string[],
        price?: string[],
        amount?: string[],
        profit?: string[],
        exprie_date?: string[],
    };
    message?: string | null;
};

export async function createInvestment(prevState: State, formData: FormData) {
    const validatedFields = CreateInvestment.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        amount: formData.get('amount'),
        profit: formData.get('profit'),
        exprie_date: formData.get('exprie_date'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Data.',
        };
    }

    const { name, description, price, amount, profit, exprie_date } = validatedFields.data;
    const session = await auth()
    const user_id = session?.user?.id
    const status = 'pending'

    try {
        await sql`
          INSERT INTO investments (user_id, name, description, price, amount, profit, exprie_date, status)
          VALUES (${user_id}, ${name}, ${description}, ${price}, ${amount}, ${profit}, ${exprie_date}, ${status})
        `;
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create investment.',
        };
    }

    revalidatePath('/dashboard/manager/list');
    redirect('/dashboard/manager/list');
}

export async function updateInvestment(
    id: string,
    prevState: State,
    formData: FormData,
) {
    const validatedFields = UpdateInvestment.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
        amount: formData.get('amount'),
        profit: formData.get('profit'),
        exprie_date: formData.get('exprie_date'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create investment.',
        };
    }

    const { name, description, price, amount, profit, exprie_date } = validatedFields.data;

    try {
        await sql`
            UPDATE investments
            SET name = ${name},
                description = ${description},
                price = ${price},
                amount = ${amount},
                profit = ${profit},
                exprie_date = ${exprie_date}
            WHERE id = ${id}
        `;
    } catch (error) {
        console.log(error)
        return {
            message: 'Database Error: Failed to Update investment.',
        };
    }

    revalidatePath('/dashboard/manager/list');
    redirect('/dashboard/manager/list');
}

export async function deleteInvestment(id: string) {
    try {
        await sql`DELETE FROM investments WHERE id = ${id}`;
        revalidatePath('/dashboard/manager/list');
        return { message: 'Deleted investment.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete investment.' };
    }
}