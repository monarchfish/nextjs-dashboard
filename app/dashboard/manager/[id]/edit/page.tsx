import Form from '@/app/ui/manager/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvestmentById } from '@/app/lib/manager/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [investment] = await Promise.all([
        fetchInvestmentById(id)
    ]);
 
    if (!investment) {
      notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'CRUD', href: '/dashboard/manager/list' },
                    {
                        label: 'Edit',
                        href: `/dashboard/manager/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form investment={investment} />
        </main>
    );
}