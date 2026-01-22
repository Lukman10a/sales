"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "@/components/layout/MainLayout";
import {
  Database,
  Download,
  Upload,
  HardDrive,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Trash2,
  Settings,
  Play,
  FileText,
  Cloud,
  Calendar,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  backups,
  backupSchedule,
  exportRequests,
  importRecords,
  databaseStats,
  dataCleanup,
  integrityChecks,
} from "@/data/dataManagement";
import {
  Backup,
  ExportRequest,
  ImportRecord,
  DataType,
  ExportFormat,
} from "@/types/dataManagementTypes";
import { format } from "date-fns";

export default function DataManagementPage() {
  const [selectedTab, setSelectedTab] = useState("backups");
  const [backupDialogOpen, setBackupDialogOpen] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);

  // Filters
  const [backupFilter, setBackupFilter] = useState<string>("all");
  const [exportFilter, setExportFilter] = useState<string>("all");

  // Form states
  const [newBackup, setNewBackup] = useState({
    name: "",
    type: "all" as DataType,
    description: "",
  });

  const [newExport, setNewExport] = useState({
    dataType: "all" as DataType,
    format: "csv" as ExportFormat,
    startDate: "",
    endDate: "",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "in-progress":
        return "bg-primary/10 text-primary border-primary/20";
      case "failed":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "scheduled":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground";
      case "high":
        return "bg-destructive/80 text-destructive-foreground";
      case "medium":
        return "bg-warning text-warning-foreground";
      case "low":
        return "bg-primary/60 text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatFileSize = (sizeInMB: number) => {
    if (sizeInMB >= 1000) {
      return `${(sizeInMB / 1000).toFixed(2)} GB`;
    }
    return `${sizeInMB.toFixed(2)} MB`;
  };

  const filteredBackups = backups.filter((backup) => {
    if (backupFilter === "all") return true;
    return backup.status === backupFilter;
  });

  const filteredExports = exportRequests.filter((exp) => {
    if (exportFilter === "all") return true;
    return exp.status === exportFilter;
  });

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Database className="w-8 h-8 text-primary" />
              Data Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Backup, restore, import, and export your business data
            </p>
          </div>
        </div>

        {/* Database Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Size</p>
                  <p className="text-2xl font-bold">
                    {formatFileSize(databaseStats.totalSize)}
                  </p>
                </div>
                <HardDrive className="w-10 h-10 text-primary/60" />
              </div>
              <Progress
                value={databaseStats.storageUsed}
                className="mt-3 h-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {databaseStats.storageUsed.toFixed(1)}% of{" "}
                {formatFileSize(databaseStats.storageLimit)} used
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Last Backup</p>
                  <p className="text-lg font-semibold">
                    {databaseStats.lastBackup
                      ? format(databaseStats.lastBackup, "MMM dd, HH:mm")
                      : "Never"}
                  </p>
                </div>
                <Cloud className="w-10 h-10 text-success/60" />
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {backupSchedule.enabled ? "Auto-backup enabled" : "Manual only"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tables</p>
                  <p className="text-2xl font-bold">
                    {databaseStats.tables.length}
                  </p>
                </div>
                <Database className="w-10 h-10 text-accent/60" />
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {databaseStats.tables
                  .reduce((sum, t) => sum + t.records, 0)
                  .toLocaleString()}{" "}
                total records
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Integrity Status
                  </p>
                  <p className="text-lg font-semibold flex items-center gap-2">
                    {integrityChecks[0].status === "passed" ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-success" />
                        Healthy
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-5 h-5 text-warning" />
                        Warnings
                      </>
                    )}
                  </p>
                </div>
                <Shield className="w-10 h-10 text-primary/60" />
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Last check: {format(integrityChecks[0].runAt, "MMM dd, HH:mm")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="backups">Backups</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="import">Import</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="integrity">Integrity</TabsTrigger>
          </TabsList>

          {/* Backups Tab */}
          <TabsContent value="backups" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Backup History</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select
                      value={backupFilter}
                      onValueChange={setBackupFilter}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Backups</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Dialog
                      open={scheduleDialogOpen}
                      onOpenChange={setScheduleDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-2" />
                          Schedule
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Backup Schedule</DialogTitle>
                          <DialogDescription>
                            Configure automatic backup settings
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="flex items-center justify-between">
                            <Label>Enable Auto Backup</Label>
                            <Switch defaultChecked={backupSchedule.enabled} />
                          </div>
                          <div className="space-y-2">
                            <Label>Frequency</Label>
                            <Select defaultValue={backupSchedule.frequency}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Time</Label>
                            <Input
                              type="time"
                              defaultValue={backupSchedule.time}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Retention Period (days)</Label>
                            <Input
                              type="number"
                              defaultValue={backupSchedule.retentionDays}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label>Cloud Storage</Label>
                            <Switch
                              defaultChecked={backupSchedule.cloudStorage}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setScheduleDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={() => setScheduleDialogOpen(false)}>
                            Save Schedule
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Dialog
                      open={backupDialogOpen}
                      onOpenChange={setBackupDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button>
                          <Download className="w-4 h-4 mr-2" />
                          Create Backup
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Backup</DialogTitle>
                          <DialogDescription>
                            Create a manual backup of your data
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Backup Name</Label>
                            <Input
                              placeholder="e.g., Pre-migration backup"
                              value={newBackup.name}
                              onChange={(e) =>
                                setNewBackup({
                                  ...newBackup,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Data Type</Label>
                            <Select
                              value={newBackup.type}
                              onValueChange={(value: DataType) =>
                                setNewBackup({ ...newBackup, type: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Data</SelectItem>
                                <SelectItem value="products">
                                  Products Only
                                </SelectItem>
                                <SelectItem value="sales">
                                  Sales Only
                                </SelectItem>
                                <SelectItem value="customers">
                                  Customers Only
                                </SelectItem>
                                <SelectItem value="analytics">
                                  Analytics Only
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Description (Optional)</Label>
                            <Input
                              placeholder="Add notes about this backup"
                              value={newBackup.description}
                              onChange={(e) =>
                                setNewBackup({
                                  ...newBackup,
                                  description: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setBackupDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={() => setBackupDialogOpen(false)}>
                            Create Backup
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredBackups.map((backup) => (
                    <motion.div
                      key={backup.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{backup.name}</h3>
                            <Badge
                              variant="outline"
                              className={getStatusColor(backup.status)}
                            >
                              {backup.status}
                            </Badge>
                            {backup.isAutoBackup && (
                              <Badge variant="outline" className="text-xs">
                                Auto
                              </Badge>
                            )}
                          </div>
                          {backup.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {backup.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {format(backup.createdAt, "MMM dd, yyyy HH:mm")}
                            </span>
                            <span className="flex items-center gap-1">
                              <HardDrive className="w-3 h-3" />
                              {formatFileSize(backup.size)}
                            </span>
                            {backup.recordCount > 0 && (
                              <span className="flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                {backup.recordCount.toLocaleString()} records
                              </span>
                            )}
                          </div>
                        </div>
                        {backup.status === "completed" && (
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              <Play className="w-4 h-4 mr-2" />
                              Restore
                            </Button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Export Data</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select
                      value={exportFilter}
                      onValueChange={setExportFilter}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Exports</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                    <Dialog
                      open={exportDialogOpen}
                      onOpenChange={setExportDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button>
                          <Upload className="w-4 h-4 mr-2" />
                          New Export
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Export Data</DialogTitle>
                          <DialogDescription>
                            Export your data in various formats
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label>Data Type</Label>
                            <Select
                              value={newExport.dataType}
                              onValueChange={(value: DataType) =>
                                setNewExport({ ...newExport, dataType: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Data</SelectItem>
                                <SelectItem value="products">
                                  Products
                                </SelectItem>
                                <SelectItem value="sales">Sales</SelectItem>
                                <SelectItem value="customers">
                                  Customers
                                </SelectItem>
                                <SelectItem value="analytics">
                                  Analytics
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Export Format</Label>
                            <Select
                              value={newExport.format}
                              onValueChange={(value: ExportFormat) =>
                                setNewExport({ ...newExport, format: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="csv">CSV</SelectItem>
                                <SelectItem value="xlsx">
                                  Excel (XLSX)
                                </SelectItem>
                                <SelectItem value="json">JSON</SelectItem>
                                <SelectItem value="pdf">PDF</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Start Date</Label>
                              <Input
                                type="date"
                                value={newExport.startDate}
                                onChange={(e) =>
                                  setNewExport({
                                    ...newExport,
                                    startDate: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>End Date</Label>
                              <Input
                                type="date"
                                value={newExport.endDate}
                                onChange={(e) =>
                                  setNewExport({
                                    ...newExport,
                                    endDate: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setExportDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={() => setExportDialogOpen(false)}>
                            Start Export
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredExports.map((exp) => (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{exp.fileName}</h3>
                            <Badge
                              variant="outline"
                              className={getStatusColor(exp.status)}
                            >
                              {exp.status}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs uppercase"
                            >
                              {exp.format}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>
                              {format(exp.dateRange.start, "MMM dd")} -{" "}
                              {format(exp.dateRange.end, "MMM dd, yyyy")}
                            </span>
                            {exp.fileSize && (
                              <span>{formatFileSize(exp.fileSize)}</span>
                            )}
                            <span>
                              Expires: {format(exp.expiresAt, "MMM dd, yyyy")}
                            </span>
                          </div>
                        </div>
                        {exp.status === "completed" && (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Import Tab */}
          <TabsContent value="import" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Import History</CardTitle>
                  <Dialog
                    open={importDialogOpen}
                    onOpenChange={setImportDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <Upload className="w-4 h-4 mr-2" />
                        Import Data
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Import Data</DialogTitle>
                        <DialogDescription>
                          Upload a file to import data
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Data Type</Label>
                          <Select defaultValue="products">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="products">Products</SelectItem>
                              <SelectItem value="sales">Sales</SelectItem>
                              <SelectItem value="customers">
                                Customers
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Choose File</Label>
                          <Input type="file" accept=".csv,.xlsx,.json" />
                          <p className="text-xs text-muted-foreground">
                            Supported formats: CSV, XLSX, JSON
                          </p>
                        </div>
                        <Alert>
                          <AlertTriangle className="w-4 h-4" />
                          <AlertTitle>Warning</AlertTitle>
                          <AlertDescription>
                            Importing data may overwrite existing records.
                            Always backup before importing.
                          </AlertDescription>
                        </Alert>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setImportDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => setImportDialogOpen(false)}>
                          Start Import
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {importRecords.map((record) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{record.fileName}</h3>
                            <Badge
                              variant="outline"
                              className={getStatusColor(record.status)}
                            >
                              {record.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>
                              {format(record.uploadedAt, "MMM dd, yyyy HH:mm")}
                            </span>
                            <span>{formatFileSize(record.fileSize)}</span>
                            <span>By {record.importedBy}</span>
                          </div>
                          {record.status === "completed" && (
                            <div className="mt-3 flex items-center gap-4 text-xs">
                              <span className="text-success flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                {record.successfulRecords} successful
                              </span>
                              {record.failedRecords > 0 && (
                                <span className="text-destructive flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3" />
                                  {record.failedRecords} failed
                                </span>
                              )}
                            </div>
                          )}
                          {record.errors && record.errors.length > 0 && (
                            <div className="mt-2 text-xs text-destructive">
                              {record.errors.slice(0, 2).map((error, i) => (
                                <div key={i}>• {error}</div>
                              ))}
                              {record.errors.length > 2 && (
                                <div>
                                  ...and {record.errors.length - 2} more
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Database Tab */}
          <TabsContent value="database" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Tables</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Table Name</TableHead>
                      <TableHead>Records</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {databaseStats.tables.map((table) => (
                      <TableRow key={table.name}>
                        <TableCell className="font-medium">
                          {table.name}
                        </TableCell>
                        <TableCell>{table.records.toLocaleString()}</TableCell>
                        <TableCell>{formatFileSize(table.size)}</TableCell>
                        <TableCell>
                          {format(table.lastModified, "MMM dd, yyyy HH:mm")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Optimize
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Cleanup Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Auto Cleanup Enabled</Label>
                    <Switch defaultChecked={dataCleanup.enabled} />
                  </div>
                  <div className="space-y-3">
                    {dataCleanup.rules.map((rule) => (
                      <div
                        key={rule.id}
                        className="p-4 border rounded-lg flex items-center justify-between"
                      >
                        <div>
                          <h4 className="font-medium">{rule.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {rule.condition} {rule.value} → {rule.action}
                          </p>
                          {rule.nextRun && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Next run: {format(rule.nextRun, "MMM dd, yyyy")}
                            </p>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Run Now
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrity Tab */}
          <TabsContent value="integrity" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Data Integrity Checks</CardTitle>
                  <Button>
                    <Play className="w-4 h-4 mr-2" />
                    Run Check Now
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrityChecks.map((check) => (
                    <div key={check.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">
                              {format(check.runAt, "MMM dd, yyyy HH:mm")}
                            </h3>
                            <Badge
                              variant="outline"
                              className={getStatusColor(check.status)}
                            >
                              {check.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="text-muted-foreground">
                              Duration: {check.duration}s
                            </span>
                            <span className="text-success">
                              {check.summary.passed} passed
                            </span>
                            {check.summary.warnings > 0 && (
                              <span className="text-warning">
                                {check.summary.warnings} warnings
                              </span>
                            )}
                            {check.summary.errors > 0 && (
                              <span className="text-destructive">
                                {check.summary.errors} errors
                              </span>
                            )}
                          </div>
                          {check.issues.length > 0 && (
                            <div className="mt-4 space-y-2">
                              {check.issues.map((issue, i) => (
                                <div
                                  key={i}
                                  className="p-3 bg-muted rounded-lg text-sm"
                                >
                                  <div className="flex items-center gap-2">
                                    <Badge
                                      className={getSeverityColor(
                                        issue.severity,
                                      )}
                                    >
                                      {issue.severity}
                                    </Badge>
                                    <span className="font-medium">
                                      {issue.table}
                                    </span>
                                    <span className="text-muted-foreground">
                                      {issue.issueType}
                                    </span>
                                  </div>
                                  <p className="mt-2 text-muted-foreground">
                                    {issue.description}
                                  </p>
                                  {issue.autoFixable && (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="mt-2"
                                    >
                                      Auto Fix
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
}
