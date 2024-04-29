const { db } = require('@vercel/postgres');
const {
  investments,
  invoices,
  customers,
  revenue,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        permission TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password, permission)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.permission})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS invoices (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        customer_id UUID NOT NULL,
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      );
    `;

    console.log(`Created "invoices" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "customers" table`);

    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map(
        (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      createTable,
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Create the "revenue" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

    console.log(`Created "revenue" table`);

    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map(
        (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      createTable,
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function seedInvestments(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "investments" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS investments (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        exprie_date DATE NOT NULL,
        price DOUBLE NOT NULL,
        amount INT NOT NULL,
        profit DOUBLE PRECISION NOT NULL,
        status VARCHAR(255) NOT NULL,
        enable_CEO_check BOOLEAN DEFAULT FALSE
      );
    `;

    console.log(`Created "investments" table`);

    // Insert data into the "investments" table
    const insertedInvestments = await Promise.all(
      investments.map(
        (investment) => client.sql`
        INSERT INTO investments (user_id, name, description, exprie_date, price, amount, profit, status)
        VALUES (${investment.user_id}, ${investment.name}, ${investment.description}, ${investment.exprie_date}, ${investment.price}, ${investment.amount}, ${investment.profit}, ${investment.status})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInvestments.length} investments`);

    return {
      createTable,
      investments: insertedInvestments,
    };
  } catch (error) {
    console.error('Error seeding investments:', error);
    throw error;
  }
}

async function seedInventories(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "inventories" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS inventories (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        investment_id UUID NOT NULL,
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "inventories" table`);

    // user_id 410544b2-4001-4271-9855-fec4b6a6442a
    // investment_id 25102e05-d8a0-420d-be8f-c24b64916d9e

    // Insert data into the "inventories" table
    const insertedInventories = await Promise.all(
      inventories.map(
        (inventory) => client.sql`
        INSERT INTO inventories (user_id, investment_id, amount, status)
        VALUES (${inventory.user_id}, ${inventory.investment_id}, ${inventory.amount}, ${inventory.status})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedInventories.length} inventories`);

    return {
      createTable,
      inventories: insertedInventories,
    };
  } catch (error) {
    console.error('Error seeding inventories:', error);
    throw error;
  }
}

async function seedCashFlow(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "cash_flow" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS cash_flow (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL,
        investment_id UUID NOT NULL,
        type VARCHAR(255) NOT NULL,
        amount DOUBLE PRECISION NOT NULL,
        CEO_check BOOLEAN DEFAULT FALSE,
        finance_check BOOLEAN DEFAULT FALSE
      );
    `;

    console.log(`Created "cash_flow" table`);

    // user_id 410544b2-4001-4271-9855-fec4b6a6442a
    // investment_id 25102e05-d8a0-420d-be8f-c24b64916d9e

    // Insert data into the "cash_flow" table
    const insertedCashFlow = await Promise.all(
      cash_flows.map(
        (cash_flow) => client.sql`
        INSERT INTO cash_flow (user_id, investment_id, type, amount)
        VALUES (${cash_flow.user_id}, ${cash_flow.investment_id}, ${cash_flow.type}, ${cash_flow.amount})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCashFlow.length} cash_flow`);

    return {
      createTable,
      cash_flow: insertedCashFlow,
    };
  } catch (error) {
    console.error('Error seeding cash_flow:', error);
    throw error;
  }
}

async function seedMonthProfit(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "month_profit" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS month_profit (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        investment_id UUID NOT NULL,
        month SMALLINT NOT NULL,
        profit DOUBLE PRECISION NOT NULL,
        profit_date DATE NOT NULL,
        status VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "month_profit" table`);

    // user_id 410544b2-4001-4271-9855-fec4b6a6442a
    // investment_id 25102e05-d8a0-420d-be8f-c24b64916d9e

    // Insert data into the "month_profit" table
    const insertedMonthProfit = await Promise.all(
      cash_flows.map(
        (month_profits) => client.sql`
        INSERT INTO month_profit (investment_id, month, profit, profit_date, status)
        VALUES (${month_profit.investment_id}, ${month_profit.month}, ${month_profit.profit}, ${month_profit.profit_date}, ${month_profit.status})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedMonthProfit.length} month_profit`);

    return {
      createTable,
      month_profit: insertedMonthProfit,
    };
  } catch (error) {
    console.error('Error seeding month_profit:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedCustomers(client);
  await seedInvoices(client);
  await seedRevenue(client);

  await seedInvestments(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
