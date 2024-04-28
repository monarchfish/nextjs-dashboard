import { InvestmentTableType } from '@/app/lib/investmentTable';
import { DeleteButton, EditButton } from './buttons';

export default async function InvestmentTable({
  dataList,
  showDelete = true,
  showEdit = true
}: {
  dataList: InvestmentTableType[];
  showDelete?: boolean;
  showEdit?: boolean;
}) {
  return (
    <div className="w-full">
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      案件ID
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      案件名稱
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      創建日期
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      更新日期
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
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {data.id}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {data.caseName}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {data.createTime}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {data.updateTime}
                      </td>
                      {(showEdit || showDelete) && (
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                          <div className="flex justify-end gap-3">
                            {showEdit && (
                              <EditButton
                                id={data.id}
                              />
                            )}
                            {showDelete && (
                              <DeleteButton
                                id={data.id}
                              />
                            )}
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
