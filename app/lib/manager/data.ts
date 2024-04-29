import { sql } from '@vercel/postgres';
import {
  ManagerTable,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;
export async function fetchInvestmentList(
  query: string,
  currentPage: number,
) {
  noStore();
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
  try {
    const count = await sql`SELECT COUNT(*)
      FROM investments
      JOIN users ON investments.user_id = users.id
      WHERE
        investments.name ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvestmentById(id: string) {
  noStore();
  try {
    // const data = await sql<InvestmentForm>`
    //   SELECT
    //     invoices.id,
    //     invoices.customer_id,
    //     invoices.amount,
    //     invoices.status
    //   FROM invoices
    //   WHERE invoices.id = ${id};
    // `;

    // const invoice = data.rows.map((invoice) => ({
    //   ...invoice,
    //   // Convert amount from cents to dollars
    //   amount: invoice.amount / 100,
    // }));

    const investment = [
        {
            id: '1',
            caseName: '投資案',
            createTime: '2024/01/01',
            updateTime: '2024/01/01'
        }
    ]

    return investment[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch investment.');
  }
}
