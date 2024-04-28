import Form from '@/app/ui/investmentTable/editTable';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvestmentById } from '@/app/lib/api/investment';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { investmentId: string } }) {
    const id = params.investmentId;
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
                    { label: 'Investment', href: '/dashboard/manager/investment/list' },
                    {
                        label: 'Edit Investment',
                        href: `/dashboard/manager/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form investment={investment} />
        </main>
    );
}