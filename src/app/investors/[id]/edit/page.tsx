import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { mockInvestors } from "@/data/investor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { use } from "react";

export default function EditInvestorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const investor = mockInvestors.find((inv) => inv.id === resolvedParams.id);

  if (!investor) {
    return (
      <MainLayout requireRole="owner">
        <div className="max-w-2xl mx-auto">
          <Link href="/investors">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Investors
            </Button>
          </Link>
          <Card>
            <CardContent className="py-12">
              <p className="text-center text-muted-foreground">
                Investor not found
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const investorInitials = `${investor.firstName[0]}${investor.lastName[0]}`;

  return (
    <MainLayout requireRole="owner">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <Link href="/investors">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Investors
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Edit Investor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="space-y-3">
              <Label>Profile Picture</Label>
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={investor.avatar} />
                  <AvatarFallback className="bg-accent text-accent-foreground font-bold">
                    {investorInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="avatarInput"
                  />
                  <label htmlFor="avatarInput">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="cursor-pointer"
                    >
                      <span>Change Avatar</span>
                    </Button>
                  </label>
                </div>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  defaultValue={investor.firstName}
                  placeholder="First name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  defaultValue={investor.lastName}
                  placeholder="Last name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue={investor.email}
                placeholder="Email address"
              />
            </div>

            {/* Investment Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Investment Amount (₦)</Label>
              <Input
                id="amount"
                type="number"
                defaultValue={investor.investmentAmount}
                placeholder="0"
              />
            </div>

            {/* Investment Date */}
            <div className="space-y-2">
              <Label htmlFor="date">Investment Date</Label>
              <Input
                id="date"
                type="date"
                defaultValue={investor.dateInvested}
              />
            </div>

            {/* Ownership Percentage */}
            <div className="space-y-2">
              <Label htmlFor="ownership">Ownership Percentage</Label>
              <Input
                id="ownership"
                type="number"
                step="0.01"
                defaultValue={(investor.percentageOwnership * 100).toFixed(2)}
                placeholder="0"
                min="0"
                max="100"
              />
              <p className="text-xs text-muted-foreground">
                Enter percentage (0-100)
              </p>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={investor.status}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <Button className="flex-1 bg-gradient-accent text-accent-foreground">
                Save Changes
              </Button>
              <Link href="/investors" className="flex-1">
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
