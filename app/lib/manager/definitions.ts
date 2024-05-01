export type InvestmentForm = {
    id: string;
    name: string;
    description: string;
    exprie_date: string;
    price: number;
    amount: number;
    profit: number;
};

export type ManagerTable = {
    id: string;
    user_id: string;
    investment_name: string;
    user_name: string;
    description: string;
    exprie_date: string;
    price: number;
    amount: number;
    profit: number;
    status: 'pending' | 'available';
    enable_ceo_check: boolean;
};