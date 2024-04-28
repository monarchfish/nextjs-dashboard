import { CreateButton } from '@/app/ui/investmentTable/buttons';
import InvestmentTable from '@/app/ui/investmentTable/table';
import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { fetchInvestmentPages, fetchInvestmentList } from '@/app/lib/api/investment';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
    title: '我的案件',
};

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
 
    const totalPages = await fetchInvestmentPages(query);
    const list = await fetchInvestmentList();

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>案件列表</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search investment..." />
                <CreateButton />
            </div>
            <Suspense key={query + currentPage}>
            <InvestmentTable dataList={list} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}
