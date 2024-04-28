import Form from '@/app/ui/investmentTable/createTable';
import Breadcrumbs from '@/app/ui/breadcrumbs';
 
export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Investment', href: '/dashboard/manager/investment/create' },
          {
            label: 'Create Investment',
            href: '/dashboard/manager/investment/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}