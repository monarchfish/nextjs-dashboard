import { ViewButton } from './buttons';
import { fetchInvestmentList } from '@/app/lib/manager/data';
import { formatDateToLocal } from '@/app/lib/utils';

export default async function UserProfitTable({
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
                      金額
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      相關案件
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      備註
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {[1,2,3,4,5].map((data) => (
                    <tr key={data} className="group">
                      {/* <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {data.id}
                      </td> */}
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {'$300'}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {'案件A'}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {'分潤進帳'}
                      </td>
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
