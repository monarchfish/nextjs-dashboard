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
                      名稱
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      投資成本
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      市值
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      報酬率
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      到期時間
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      庫存單位
                    </th>
                    {(showEdit || showDelete) && (
                      <th scope="col" className="px-3 py-5 font-medium">
                        操作
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {[4,23,82].map((data) => (
                    <tr key={data} className="group">
                      {/* <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {data.id}
                      </td> */}
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {`案件${data}`}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {`$${data*1000}`}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {`$${(data*1000*(Math.random()*0.2+0.9)).toFixed(2)}`}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {`${Math.round(Math.random()*500)/100+2}%`}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        2024-12-30
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        王經理
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