# Notification Action Modal - User Guide

## Quick Start

### How to Use the Modal

1. **Navigate to Notifications**
   - Click the Bell icon in the navigation or go to `/notifications`

2. **Find an Actionable Notification**
   - Notifications with actionable items show a blue "Take Action" button
   - Look for these notification types:
     - 📦 Stock Alerts (Inventory/Alert/AI)
     - ✅ Pending Confirmations (Inventory)
     - 🛒 Sales (Sales transactions)

3. **Click "Take Action"**
   - Modal opens showing available actions for that notification
   - Choose the action you want to take

## Notification Types & Actions

### 1. Stock Alert Notifications 📦

**When You See:** "Stock Discrepancy Detected", "Low Stock Warning", "Restock Recommendation"

**Available Actions:**

- **🔄 Reorder Now**
  - Specify how many units to reorder
  - Add reason (optional)
  - System updates inventory immediately

- **🏷️ Apply Discount/Sale**
  - Set discount percentage (0-100%)
  - See real-time price calculation
  - Helps clear slow-moving inventory

**Example Flow:**

```
Notification: "Low Stock Warning - iPhone Case has 2 units left"
    ↓
Click "Take Action"
    ↓
Choose "Reorder Now"
    ↓
Enter 50 units
    ↓
Submit → Inventory now shows 52 units
    ↓
Success toast + Notification marked as read
```

### 2. Inventory Confirmation Notifications ✅

**When You See:** "New Items Added", "Please confirm receipt"

**Available Actions:**

- **✅ Approve**
  - Confirms the inventory addition
  - Marks item as verified
  - Status: Updated

- **❌ Reject**
  - Rejects the inventory addition
  - Item stays in pending state
  - Follow-up required with admin

**Item Details Shown:**

- Item name, category
- New quantity
- Cost price
- Current status

**Example Flow:**

```
Notification: "Ahmed added 20 iPhone Cases - Please confirm receipt"
    ↓
Click "Take Action"
    ↓
Review item details
    ↓
Click "Approve" or "Reject"
    ↓
System processes decision
    ↓
Success notification + Mark as read
```

### 3. Sales Notifications 🛒

**When You See:** "Large Sale Recorded", "Transaction completed"

**Available Actions:**

- **↩️ Process Return**
  - Specify return quantity
  - Add reason (defective, customer request, etc.)
  - System adjusts inventory and sales count
- **👁️ View Full Details**
  - Opens sales page for complete transaction info
  - Review full order breakdown

**Example Flow:**

```
Notification: "Customer returned 2 units of Wireless Earbuds"
    ↓
Click "Take Action"
    ↓
Choose "Process Return"
    ↓
Enter return quantity: 2
    ↓
Add reason: "Defective units"
    ↓
Submit → Inventory increases by 2, sold count decreases
    ↓
Success notification
```

### 4. System Messages 💬

**When You See:** Task assignments, reminders, admin messages

**Available Actions:**

- **📌 Acknowledge**
  - Marks message as read
  - Archives notification
  - Simple confirmation

## Modal Features

### Form Validation

- ❌ Required fields highlighted
- ✅ Submit button disabled until valid
- 📊 Real-time calculations shown

### Real-Time Previews

- **Discount Modal**

  ```
  Original Price: ₦25,000
  Discount: 15%
  New Price: ₦21,250
  You Save: ₦3,750
  ```

- **Inventory Updates**
  ```
  Current Stock: 15 units
  Reorder Qty: 20 units
  New Stock: 35 units
  ```

### Loading & Feedback

- 🔄 Loading spinner during processing
- ✨ Success toast on completion
- ⚠️ Error toast if something fails
- 📝 Notification automatically marked as read

## Tips & Best Practices

### Stock Management

- 📍 **Reorder when stock drops below 5 units**
- 🏷️ **Use discount for items not selling after 30 days**
- 📊 **Monitor reorder history in analytics**

### Confirmations

- ✅ **Always review item details before approving**
- 🔍 **Check cost price matches purchase order**
- 📋 **Keep notes in the notes field for audit trail**

### Returns

- 📸 **Document reason for each return**
- 📅 **Process returns within 24 hours**
- 🔄 **Cross-check with sales records**

## Keyboard Shortcuts (Future)

- `N` - Jump to Notifications
- `Tab` - Navigate modal fields
- `Enter` - Submit action
- `Esc` - Close modal

## Troubleshooting

### Modal won't open

- Check if notification is actionable (has "Take Action" button)
- Refresh page and try again
- Check browser console for errors

### Form submission fails

- Ensure all required fields are filled
- Check browser console for error messages
- Verify internet connection
- Try again in a few seconds

### Notification not updating

- Hard refresh the page (Ctrl+Shift+R)
- Check if action was actually submitted
- Clear browser cache if problem persists

## Notification Status Indicators

| Badge        | Meaning           | Action Needed             |
| ------------ | ----------------- | ------------------------- |
| 🔴 Unread    | New notification  | Mark as read              |
| 🟢 Read      | Seen but unacted  | Take action if actionable |
| ✅ Completed | Action taken      | None                      |
| ⏳ Pending   | Awaiting approval | Respond to confirmation   |

## Performance Tips

- **Process notifications daily** to keep dashboard clean
- **Group similar actions** (reorder requests) together
- **Archive old notifications** weekly
- **Check inbox regularly** for time-sensitive items

---

**Last Updated:** January 22, 2026  
**Version:** 1.0  
**Status:** Live in Production
