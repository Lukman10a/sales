import MainLayout from "@/components/layout/MainLayout";
import { InvestorsList } from "@/components/investors/InvestorsList";
import { InvestorsStats } from "@/components/investors/InvestorsStats";
import { AddInvestorButton } from "@/components/investors/AddInvestorButton";
import {
  mockInvestors,
  mockFinancialRecords,
  mockWithdrawalRecords,
} from "@/data/investor";

export default function InvestorsPage() {
  return (
    <MainLayout requireRole="owner">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Investor Management
            </h1>
            <p className="text-muted-foreground">
              Manage your investors, track investments, and approve withdrawals
            </p>
          </div>
          <AddInvestorButton />
        </div>

        {/* Stats */}
        <InvestorsStats
          investors={mockInvestors}
          financialRecords={mockFinancialRecords}
        />

        {/* Investors List */}
        <InvestorsList
          investors={mockInvestors}
          financialRecords={mockFinancialRecords}
          withdrawalRecords={mockWithdrawalRecords}
        />
      </div>
    </MainLayout>
  );
}
