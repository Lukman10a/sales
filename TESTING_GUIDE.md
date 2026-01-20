# Complete Investor System - Testing Guide

## Quick Overview

Your LUXA Sales application now has a complete **3-Phase Investor Management System** with role-based access and comprehensive features.

---

## Test Scenarios

### Scenario 1: Login as Owner

**Credentials:**

```
Email: ahmed@luxa.com
Password: admin123
Role: Owner
```

**What to Test:**

1. ✅ Login page shows 3 role options (Owner, Admin, Investor)
2. ✅ Sidebar shows owner navigation including "Investors" and "Withdrawals"
3. ✅ Regular dashboard displays (Dashboard, Inventory, Sales, Analytics, Notifications, AI Insights)

---

### Scenario 2: Owner - View Investors

**URL:** `http://localhost:3000/investors`

**What to See:**

1. ✅ Header with "Add Investor" button
2. ✅ 4 stat cards showing:
   - Active Investors: 2
   - Total Invested: ₦800,000
   - Total Profit Accrued: Calculated amount
   - Ownership Distributed: 32%

3. ✅ Data table with 2 investors:
   - Fatima Adeyemi (fatima@investor.com)
   - Karim Okafor (karim@investor.com)
   - Each showing: investment, ownership %, profit, pending withdrawals, status

4. ✅ Hover actions on each row (Edit, View Details, View Withdrawals)

---

### Scenario 3: Owner - Add New Investor

**Action:** Click "Add Investor" button

**Form Fields to Fill:**

- First Name: `Chukwu`
- Last Name: `Eze`
- Email: `chukwu@investor.com`
- Investment Amount: `250000`
- Ownership %: `10`

**Expected Result:**

- ✅ Form validates all fields
- ✅ Success toast notification appears
- ✅ Form closes
- ✅ New investor appears in list (after page refresh - since using mock data)

---

### Scenario 4: Owner - Manage Withdrawals

**URL:** `http://localhost:3000/withdrawals`

**What to See:**

1. ✅ Three tabs:
   - **Pending:** 1 withdrawal
   - **Approved:** 0 withdrawals
   - **Completed:** 2 withdrawals

2. ✅ For each pending withdrawal:
   - Investor avatar and name
   - Request date
   - Amount: ₦43,200
   - "Approve" and "Reject" buttons

3. ✅ Click "Approve" or "Reject":
   - Button shows loading state
   - Toast notification appears
   - Withdrawal moves to appropriate tab

---

### Scenario 5: Login as Investor

**Credentials:**

```
Email: fatima@investor.com
Password: investor123
Role: Investor
```

**What to Test:**

1. ✅ Login shows investor role option is available
2. ✅ Sidebar shows investor-only navigation:
   - Investment Dashboard
   - Notifications
3. ✅ Cannot access: Inventory, Sales, Analytics, Investors, Withdrawals

---

### Scenario 6: Investor - View Dashboard

**URL:** `http://localhost:3000/investor-dashboard` (auto-loads after login)

**What to See:**

1. ✅ **Investment Overview** - 4 cards:
   - Investment Amount: ₦500,000
   - Ownership: 20%
   - Total Profit Accrued: Calculated amount
   - Investment Date: Oct 15, 2025

2. ✅ **Profit Summary** (Right sidebar):
   - ROI % with progress bar
   - Break-even status
   - Total earnings

3. ✅ **Profit Trend Chart** (Center):
   - Bar chart showing monthly profit
   - Your share vs total profit

4. ✅ **Withdrawal Requests** (Bottom right):
   - Recent withdrawals with status
   - Pending count badge

---

## Feature Testing Checklist

### Authentication

- [ ] Login with Owner credentials works
- [ ] Login with Investor credentials works
- [ ] Role selector shows all 3 options
- [ ] Cannot login with wrong password
- [ ] Demo credentials displayed on login page

### Owner Features

- [ ] Investors page loads for owner only
- [ ] Withdrawals page loads for owner only
- [ ] Can see all investors in table
- [ ] Can see stat cards calculating correctly
- [ ] Can open Add Investor modal
- [ ] Form validates properly
- [ ] Can approve/reject withdrawals
- [ ] Withdrawal status badges show correctly
- [ ] Tab switching works on withdrawals page

### Investor Features

- [ ] Dashboard loads for investor only
- [ ] Cannot access owner pages (redirects)
- [ ] Can see investment overview
- [ ] Profit chart displays correctly
- [ ] Withdrawal history shows
- [ ] Numbers calculate correctly

### Navigation

- [ ] Sidebar shows correct items for each role
- [ ] Navigation links work
- [ ] Sidebar collapse/expand works
- [ ] Active states highlight correctly

### UI/UX

- [ ] Animations are smooth
- [ ] Colors are correct
- [ ] Responsive on different screen sizes
- [ ] Buttons have hover states
- [ ] Modals work properly
- [ ] Toast notifications appear

---

## Mock Data Overview

### Sample Investors

1. **Fatima Adeyemi**
   - Investment: ₦500,000
   - Ownership: 20%
   - Active

2. **Karim Okafor**
   - Investment: ₦300,000
   - Ownership: 12%
   - Active

### Financial Data

- 4 months of records (Oct 2025 - Jan 2026)
- Monthly revenue, costs, expenses tracked
- Net profit calculated automatically

### Withdrawal Records

- Some completed
- Some pending
- Some approved
- Demonstrates all status states

---

## Troubleshooting

### Pages not loading?

- Ensure you're logged in with correct role
- Check if you have correct role access
- Verify URL is correct

### Numbers not calculating?

- Mock data is in `src/data/investor.ts`
- Calculations in `src/lib/investorUtils.ts`
- Both files are hardcoded - no API calls yet

### Modals not opening?

- Check browser console for errors
- Ensure dialog component is imported
- Verify form handlers are correct

### Sidebar not updating?

- Role is determined by `user.role` from auth
- Sidebar automatically updates based on role
- May need to login again to see changes

---

## Next Steps

### Potential Phase 4 Features:

1. Investor Withdrawal Requests - Allow investors to request withdrawals
2. Financial Reports - PDF export of investor statements
3. Backend Integration - Replace mock data with API calls
4. Real Authentication - Connect to actual backend auth
5. Email Notifications - Auto-send to investors on status changes
6. Dashboard Analytics - More detailed financial charts for owner

---

## Development Server

**Running on:** `http://localhost:3000`

**Dev Mode:** All hot-reloads working
**No Errors:** TypeScript compilation clean

---

**Happy Testing! 🎉**

For any issues, check the browser console (F12) for error messages.
