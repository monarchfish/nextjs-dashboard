import MainPage from './mainPage';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
    title: 'Dice',
};

export default async function Page() {
    return (<MainPage />);
}
