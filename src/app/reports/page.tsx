"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Download,
  FileSpreadsheet,
  TrendingUp,
  Package,
  DollarSign,
  Users,
  UserCheck,
  Settings,
  Clock,
  Calendar,
  Mail,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { ReportFormat, ReportType } from "@/types/reportTypes";
import { reports, scheduledReports, reportTemplates } from "@/data/reports";

const formatIcons = {
  pdf: FileText,
  csv: FileText,
  excel: FileSpreadsheet,
};

const statusConfig = {
  completed: {
    label: "Completed",
    className: "bg-success/10 text-success border-success/20",
  },
  processing: {
    label: "Processing",
    className: "bg-warning/10 text-warning border-warning/20",
  },
  pending: {
    label: "Pending",
    className: "bg-muted text-muted-foreground border-muted",
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  scheduled: {
    label: "Scheduled",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
};

const templateIcons: Record<string, any> = {
  TrendingUp,
  Package,
  DollarSign,
  Users,
  UserCheck,
  Settings,
};

export default function Reports() {
  const { t, formatCurrency } = useLanguage();
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [generateForm, setGenerateForm] = useState({
    name: "",
    format: "pdf" as ReportFormat,
    dateStart: "",
    dateEnd: "",
    includeCategories: true,
    includeExpenses: true,
    includeStaff: true,
  });

  const handleGenerateReport = () => {
    if (!selectedTemplate || !generateForm.name.trim()) {
      toast(t("Please fill in all required fields"));
      return;
    }

    toast(t("Report generation started..."));
    setIsGenerateOpen(false);
    setSelectedTemplate(null);
    setGenerateForm({
      name: "",
      format: "pdf",
      dateStart: "",
      dateEnd: "",
      includeCategories: true,
      includeExpenses: true,
      includeStaff: true,
    });
  };

  const handleDownload = (report: (typeof reports)[0]) => {
    if (report.fileUrl) {
      toast(t("Downloading {name}...", { values: { name: report.name } }));
      // Simulate download
    } else {
      toast(t("Report is still being generated"));
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">
              {t("Reports & Export")}
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("Generate custom reports and export your data")}
            </p>
          </div>
        </div>

        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="templates">{t("Templates")}</TabsTrigger>
            <TabsTrigger value="history">{t("History")}</TabsTrigger>
            <TabsTrigger value="scheduled">{t("Scheduled")}</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                {t("Report Templates")}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("Choose a template to generate a custom report")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reportTemplates.map((template, index) => {
                const Icon = templateIcons[template.icon] || FileText;
                return (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className="card-elevated card-hover cursor-pointer h-full"
                      onClick={() => {
                        setSelectedTemplate(template.id);
                        setGenerateForm({
                          ...generateForm,
                          name: template.name,
                        });
                        setIsGenerateOpen(true);
                      }}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">
                            {t(template.name)}
                          </CardTitle>
                        </div>
                        <CardDescription>
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-foreground">
                            {t("Metrics Included")}:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {template.metrics.slice(0, 3).map((metric) => (
                              <Badge
                                key={metric}
                                variant="secondary"
                                className="text-xs"
                              >
                                {metric}
                              </Badge>
                            ))}
                            {template.metrics.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{template.metrics.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                {t("Report History")}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("View and download your previously generated reports")}
              </p>
            </div>
            <div className="space-y-3">
              {reports.map((report) => {
                const FormatIcon = formatIcons[report.format];
                return (
                  <Card key={report.id} className="card-elevated">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="p-2 rounded-lg bg-muted">
                            <FormatIcon className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-foreground truncate">
                                {report.name}
                              </h4>
                              <Badge
                                variant="outline"
                                className={
                                  statusConfig[report.status].className
                                }
                              >
                                {t(statusConfig[report.status].label)}
                              </Badge>
                            </div>
                            {report.description && (
                              <p className="text-sm text-muted-foreground mb-2">
                                {report.description}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(
                                  report.dateRange.start,
                                ).toLocaleDateString()}{" "}
                                -{" "}
                                {new Date(
                                  report.dateRange.end,
                                ).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(report.createdAt).toLocaleString()}
                              </span>
                              <span>
                                {t("by")} {report.createdBy}
                              </span>
                              {report.fileSize && (
                                <span>{report.fileSize}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        {report.status === "completed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(report)}
                            className="w-full sm:w-auto"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            {t("Download")}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                {t("Scheduled Reports")}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t("Automatically generate and email reports on a schedule")}
              </p>
            </div>
            <div className="space-y-3">
              {scheduledReports.map((schedule) => (
                <Card key={schedule.id} className="card-elevated">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-foreground">
                            {schedule.reportName}
                          </h4>
                          <Badge
                            variant="outline"
                            className={
                              schedule.active
                                ? "bg-success/10 text-success border-success/20"
                                : "bg-muted text-muted-foreground border-muted"
                            }
                          >
                            {schedule.active ? t("Active") : t("Paused")}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {t(
                              schedule.frequency.charAt(0).toUpperCase() +
                                schedule.frequency.slice(1),
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {t("Next run")}:{" "}
                            {new Date(schedule.nextRun).toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {schedule.recipients.length} {t("recipients")}
                          </span>
                          <Badge variant="secondary">
                            {schedule.format.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          {t("Edit")}
                        </Button>
                        <Button variant="outline" size="sm">
                          {schedule.active ? t("Pause") : t("Resume")}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Generate Report Dialog */}
      <Dialog open={isGenerateOpen} onOpenChange={setIsGenerateOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{t("Generate Report")}</DialogTitle>
            <DialogDescription>
              {t("Configure your report settings and generate")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="report-name">{t("Report Name")}*</Label>
              <Input
                id="report-name"
                value={generateForm.name}
                onChange={(e) =>
                  setGenerateForm({ ...generateForm, name: e.target.value })
                }
                placeholder={t("e.g. January Sales Report")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="format">{t("Format")}</Label>
              <Select
                value={generateForm.format}
                onValueChange={(value) =>
                  setGenerateForm({
                    ...generateForm,
                    format: value as ReportFormat,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date-start">{t("Start Date")}</Label>
                <Input
                  id="date-start"
                  type="date"
                  value={generateForm.dateStart}
                  onChange={(e) =>
                    setGenerateForm({
                      ...generateForm,
                      dateStart: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date-end">{t("End Date")}</Label>
                <Input
                  id="date-end"
                  type="date"
                  value={generateForm.dateEnd}
                  onChange={(e) =>
                    setGenerateForm({
                      ...generateForm,
                      dateEnd: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="grid gap-3 p-4 border rounded-lg bg-muted/30">
              <Label>{t("Include in Report")}</Label>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-categories"
                  checked={generateForm.includeCategories}
                  onCheckedChange={(checked) =>
                    setGenerateForm({
                      ...generateForm,
                      includeCategories: checked as boolean,
                    })
                  }
                />
                <label
                  htmlFor="include-categories"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("Categories breakdown")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-expenses"
                  checked={generateForm.includeExpenses}
                  onCheckedChange={(checked) =>
                    setGenerateForm({
                      ...generateForm,
                      includeExpenses: checked as boolean,
                    })
                  }
                />
                <label
                  htmlFor="include-expenses"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("Expenses and costs")}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-staff"
                  checked={generateForm.includeStaff}
                  onCheckedChange={(checked) =>
                    setGenerateForm({
                      ...generateForm,
                      includeStaff: checked as boolean,
                    })
                  }
                />
                <label
                  htmlFor="include-staff"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("Staff performance")}
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsGenerateOpen(false);
                setSelectedTemplate(null);
              }}
            >
              {t("Cancel")}
            </Button>
            <Button
              onClick={handleGenerateReport}
              disabled={!generateForm.name.trim()}
            >
              {t("Generate Report")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
