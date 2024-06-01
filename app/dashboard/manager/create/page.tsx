import Form from '@/app/ui/manager/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
 
export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'CRUD', href: '/dashboard/manager/list' },
          {
            label: 'Create',
            href: '/dashboard/manager/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}