import MainPage from '@/app/ui/cssDemo/diceGame';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
    title: 'Dice',
};

export default async function Page() {
    return (<MainPage />);
}
