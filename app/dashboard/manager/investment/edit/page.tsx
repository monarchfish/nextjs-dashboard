import Form from '@/app/ui/investmentTable/editTable';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchInvestmentById } from '@/app/lib/api/investment';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [investment] = await Promise.all([
        fetchInvestmentById(id),
    ]);
 
    if (!investment) {
      notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Investment', href: '/dashboard/manager' },
                    {
                        label: 'Edit Investment',
                        href: `/dashboard/manager/investment/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form investment={investment} />
        </main>
    );
}