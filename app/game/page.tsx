import { Metadata } from 'next';
 
export const metadata: Metadata = {
    title: 'Game',
};

export default async function Page() {
    return (
        <div className="w-full">
            Welcome to Game Page
        </div>
    );
}
