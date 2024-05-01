import { ViewButton } from './buttons';
import { fetchInvestmentList } from '@/app/lib/manager/data';
import { formatDateToLocal } from '@/app/lib/utils';

export default async function InventoryTable({
  query,
  currentPage,
  showDelete = true,
  showEdit = true
}: {
  query: string;
  currentPage: number;
  showDelete?: boolean;
  showEdit?: boolean;
}) {
  const dataList = await fetchInvestmentList(query, currentPage);

  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    {/* <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      ID
                    </th> */}
                    <th scope="col" className="px-3 py-5 font-medium">
                      案件名稱
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      總金額
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      申購日期
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      申購數量
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      申購人
                    </th>
                    {(showEdit || showDelete) && (
                      <th scope="col" className="px-3 py-5 font-medium">
                        操作
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {[1,5,8,11,18].map((data) => (
                    <tr key={data} className="group">
                      {/* <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {data.id}
                      </td> */}
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {`案件名稱${data}`}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        ${data*2385}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {'2024-11-30'}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {data*100}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {'王先生'}
                      </td>
                      {(showEdit || showDelete) && (
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                          <div className="flex justify-end gap-3">
                            <ViewButton
                              id={''+data}
                            />
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
