import Form from '@/app/ui/manager/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
 
export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: '案件列表', href: '/dashboard/manager/list' },
          {
            label: '新建案件',
            href: '/dashboard/manager/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}