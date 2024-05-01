import { sql } from '@vercel/postgres';
import {
  InvestmentForm,
  ManagerTable,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { auth } from "@/auth"

const ITEMS_PER_PAGE = 6;
export async function fetchInvestmentList(
  query: string,
  currentPage: number,
) {
  noStore();
  const session = await auth()
  const user_id = session?.user?.id
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const investments = await sql<ManagerTable>`
      SELECT
        investments.id,
        investments.name AS investment_name,
        investments.description,
        investments.exprie_date,
        investments.price,
        investments.profit,
        investments.status,
        users.name AS user_name
      FROM investments
      JOIN users ON investments.user_id = users.id
      WHERE
        investments.user_id = ${user_id} AND
        investments.name ILIKE ${`%${query}%`}
      ORDER BY investments.exprie_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return investments.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch investments.');
  }
}

export async function fetchInvestmentPages(query: string) {
  noStore();
  const session = await auth()
  const user_id = session?.user?.id

  try {
    const count = await sql`SELECT COUNT(*)
      FROM investments
      JOIN users ON investments.user_id = users.id
      WHERE
        investments.user_id = ${user_id} AND
        investments.name ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of investments.');
  }
}

export async function fetchInvestmentById(id: string) {
  noStore();
  try {
    const data = await sql<InvestmentForm>`
      SELECT
        investments.id,
        investments.name,
        investments.description,
        investments.exprie_date,
        investments.price,
        investments.amount,
        investments.profit
      FROM investments
      WHERE investments.id = ${id};
    `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch investment.');
  }
}
