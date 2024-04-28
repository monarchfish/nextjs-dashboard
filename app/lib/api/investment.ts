// import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchInvestmentList() {
  noStore();
  try {
    // const data = await sql<LatestInvoiceRaw>`
    //   SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
    //   FROM invoices
    //   JOIN customers ON invoices.customer_id = customers.id
    //   ORDER BY invoices.date DESC
    //   LIMIT 5`;

    // const latestInvoices = data.rows.map((invoice) => ({
    //   ...invoice,
    //   amount: formatCurrency(invoice.amount),
    // }));

    const investmentList = [
      {
        id: '1',
        caseName: '基金投資案',
        createTime: '2024/01/01',
        updateTime: '2024/01/01',
      }
    ]


    return investmentList;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchInvestmentPages(query: string) {
  noStore();
  try {
  //   const count = await sql`SELECT COUNT(*)
  //     FROM invoices
  //     JOIN customers ON invoices.customer_id = customers.id
  //     WHERE
  //       customers.name ILIKE ${`%${query}%`} OR
  //       customers.email ILIKE ${`%${query}%`} OR
  //       invoices.amount::text ILIKE ${`%${query}%`} OR
  //       invoices.date::text ILIKE ${`%${query}%`} OR
  //       invoices.status ILIKE ${`%${query}%`}
  //   `;

    const totalPages = 1;
    // const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
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
