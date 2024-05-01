import { ViewButton } from './buttons';
import { fetchInvestmentList } from '@/app/lib/manager/data';
import { formatDateToLocal } from '@/app/lib/utils';

export default async function UserListTable({
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
                      描述A
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      單位價格
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      預期報酬
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      到期時間
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      經理人
                    </th>
                    {(showEdit || showDelete) && (
                      <th scope="col" className="px-3 py-5 font-medium">
                        操作
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {dataList.map((data) => (
                    <tr key={data.id} className="group">
                      {/* <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {data.id}
                      </td> */}
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {data.investment_name}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {data.description}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {data.price}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {data.profit}%
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {formatDateToLocal(data.exprie_date)}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {data.user_name}
                      </td>
                      {(showEdit || showDelete) && (
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                          <div className="flex justify-end gap-3">
                            <ViewButton
                              id={data.id}
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