"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Language = "en" | "ar";

type TranslateOptions = {
  values?: Record<string, string | number>;
  fallback?: string;
};

interface LanguageContextValue {
  language: Language;
  isRTL: boolean;
  t: (key: string, options?: TranslateOptions) => string;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  formatCurrency: (
    amount: number,
    options?: Intl.NumberFormatOptions
  ) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

const translations: Record<Language, Record<string, string>> = {
  en: {},
  ar: {
    StockFlow: "ستوك فلو",
    "Sales & Inventory": "المبيعات والمخزون",
    Dashboard: "لوحة التحكم",
    Inventory: "المخزون",
    Sales: "المبيعات",
    Analytics: "التحليلات",
    Notifications: "الإشعارات",
    "AI Insights": "تحليلات الذكاء الاصطناعي",
    Settings: "الإعدادات",
    Logout: "تسجيل الخروج",
    Owner: "المالك",
    Admin: "المشرف",
    User: "مستخدم",
    "Search inventory, sales, reports...":
      "ابحث في المخزون والمبيعات والتقارير...",
    "Welcome back, {name}!": "مرحباً بعودتك، {name}!",
    "Here's what's happening with your business today.":
      "إليك ما يحدث في عملك اليوم.",
    "Today's Sales": "مبيعات اليوم",
    "Items Sold": "العناصر المباعة",
    "In Stock": "متوفر",
    "Low Stock Alerts": "تنبيهات انخفاض المخزون",
    "vs yesterday": "مقارنة بالأمس",
    "from last week": "مقارنة بالأسبوع الماضي",
    "need attention": "بحاجة للانتباه",
    "Add New Item": "إضافة منتج جديد",
    "Add products to inventory": "إضافة منتجات إلى المخزون",
    "Record Sale": "تسجيل عملية بيع",
    "Log a new transaction": "تسجيل عملية جديدة",
    "View Reports": "عرض التقارير",
    "Check analytics & insights": "عرض التحليلات والرؤى",
    "Stock Check": "فحص المخزون",
    "Verify inventory levels": "التحقق من مستويات المخزون",
    "Hourly breakdown": "توزيع حسب الساعة",
    Today: "اليوم",
    Week: "الأسبوع",
    Month: "الشهر",
    "Recent Sales": "آخر المبيعات",
    "Last {count} transactions": "آخر {count} معاملات",
    "View All": "عرض الكل",
    "by {name}": "بواسطة {name}",
    "Inventory Alerts": "تنبيهات المخزون",
    "{count} items need attention": "{count} عناصر تحتاج إلى الانتباه",
    "All items are in good stock": "جميع العناصر في حالة جيدة",
    "{quantity} remaining": "متبقي {quantity}",
    "Out of Stock": "غير متوفر",
    "Low Stock": "مخزون منخفض",
    Critical: "حرج",
    "Smart recommendations for your business": "توصيات ذكية لعملك",
    "Restock iPhone Chargers": "إعادة تخزين شواحن آيفون",
    "Based on sales velocity, you'll run out in 2 days. Order now to maintain stock.":
      "بناءً على سرعة المبيعات، سينفد المخزون خلال يومين. اطلب الآن للحفاظ على التوفر.",
    "Order Now": "اطلب الآن",
    "Wireless Earbuds are Hot!": "سماعات الأذن اللاسلكية رائجة!",
    "Sales up 45% this week. Consider increasing stock and promoting.":
      "المبيعات ارتفعت بنسبة 45٪ هذا الأسبوع. فكر في زيادة المخزون والترويج.",
    "View Details": "عرض التفاصيل",
    "Slow Moving: Laptop Sleeves": "بطيئة الحركة: حافظات اللابتوب",
    "Only 2 sold in 30 days. Consider price reduction or bundle deals.":
      "تم بيع قطعتين فقط خلال 30 يوماً. فكر في خفض السعر أو عروض الباقات.",
    "Adjust Pricing": "تعديل الأسعار",
    "Manage your products and stock levels": "إدارة منتجاتك ومستويات المخزون",
    "Search items...": "ابحث عن العناصر...",
    "Total Items": "إجمالي العناصر",
    "Qty Available": "الكمية المتاحة",
    Sold: "المباع",
    "Cost Price": "سعر التكلفة",
    "Selling Price": "سعر البيع",
    Item: "العنصر",
    Status: "الحالة",
    Qty: "الكمية",
    Cost: "التكلفة",
    Price: "السعر",
    Actions: "الإجراءات",
    "Pending confirmation": "في انتظار التأكيد",
    "Confirm Receipt": "تأكيد الاستلام",
    Edit: "تعديل",
    Sell: "بيع",
    Confirm: "تأكيد",
    "Add Item": "إضافة عنصر",
    Cancel: "إلغاء",
    "Item Name": "اسم العنصر",
    "Image URL (optional)": "رابط الصورة (اختياري)",
    "e.g. Bluetooth Speaker": "مثال: مكبر صوت بلوتوث",
    "Cost Price (NGN)": "سعر التكلفة (نايرا)",
    "Selling Price (NGN)": "سعر البيع (نايرا)",
    Quantity: "الكمية",
    "Select status": "اختر الحالة",
    "Please enter an item name": "يرجى إدخال اسم العنصر",
    "Item added successfully": "تمت إضافة العنصر بنجاح",
    "Select items and record transactions": "اختر العناصر وسجل المعاملات",
    "Search products...": "ابحث عن المنتجات...",
    "Current Sale": "البيع الحالي",
    item: "عنصر",
    items: "عناصر",
    available: "متاح",
    "Click on products to add them to the sale":
      "اضغط على المنتجات لإضافتها إلى عملية البيع",
    "Enter your email": "أدخل بريدك الإلكتروني",
    "Enter your password": "أدخل كلمة المرور",
    "Actual Price": "السعر الفعلي",
    Subtotal: "المجموع الفرعي",
    "Current Sale": "البيع الحالي",
    Total: "الإجمالي",
    "Complete Sale": "إتمام البيع",
    "Cart is empty": "السلة فارغة",
    "Insufficient stock for {name}": "المخزون غير كافٍ لـ {name}",
    "Sale completed": "تم إتمام البيع",
    "Total {amount}": "الإجمالي {amount}",
    "Track your business performance and insights": "تتبع أداء عملك والرؤى",
    "Pick date": "اختر التاريخ",
    "Total Revenue": "إجمالي الإيرادات",
    "Net Profit": "صافي الربح",
    "Total Orders": "إجمالي الطلبات",
    "Avg Order Value": "متوسط قيمة الطلب",
    "Weekly Performance": "الأداء الأسبوعي",
    "Hourly Sales Trend": "اتجاه المبيعات حسب الساعة",
    "Sales by Category": "المبيعات حسب الفئة",
    "Top Performing Products": "أفضل المنتجات أداءً",
    Sales: "المبيعات",
    Profit: "الربح",
    "units sold": "وحدات مباعة",
    revenue: "إيرادات",
    "Smart recommendations powered by your sales data":
      "توصيات ذكية مستندة إلى بيانات مبيعاتك",
    "Refresh Insights": "تحديث التوصيات",
    "High Priority": "أولوية عالية",
    Medium: "متوسط",
    Low: "منخفض",
    "Actions needed": "إجراءات مطلوبة",
    "Potential Gain": "العائد المحتمل",
    "Monthly opportunity": "فرصة شهرية",
    "AI Accuracy": "دقة الذكاء الاصطناعي",
    "Prediction rate": "معدل التنبؤ",
    Impact: "التأثير",
    "Current Stock": "المخزون الحالي",
    "Daily Sales Avg": "متوسط المبيعات اليومي",
    "Days Until Stockout": "أيام حتى نفاد المخزون",
    "This Week": "هذا الأسبوع",
    "Last Week": "الأسبوع الماضي",
    Growth: "النمو",
    "Current Price": "السعر الحالي",
    "Suggested Price": "السعر المقترح",
    "Profit Increase": "زيادة الربح",
    "Related Purchases": "مشتريات مرتبطة",
    "Avg Margin": "متوسط الهامش",
    "Est. Weekly Sales": "المبيعات الأسبوعية المتوقعة",
    Phones: "الهواتف",
    Accessories: "الإكسسوارات",
    Gadgets: "الأجهزة",
    Others: "أخرى",
    "Stay updated with your business activities": "ابقَ على اطلاع بأنشطة عملك",
    "Mark all as read": "تحديد الكل كمقروء",
    All: "الكل",
    Unread: "غير مقروء",
    "All caught up!": "انتهيت من كل شيء!",
    "No unread notifications at the moment.":
      "لا توجد إشعارات غير مقروءة حالياً.",
    "No notifications at the moment.": "لا توجد إشعارات حالياً.",
    "Mark as read": "وضع علامة كمقروء",
    "Take Action": "اتخاذ إجراء",
    "Manage your account and preferences": "إدارة حسابك وتفضيلاتك",
    "Profile Settings": "إعدادات الملف الشخصي",
    "Manage your account information": "إدارة معلومات حسابك",
    "Configure alert preferences": "تكوين تفضيلات التنبيه",
    "Password and authentication": "كلمة المرور والمصادقة",
    Appearance: "المظهر",
    "Customize the app look": "تخصيص مظهر التطبيق",
    "Data & Backup": "البيانات والنسخ الاحتياطي",
    "Export and backup options": "خيارات التصدير والنسخ الاحتياطي",
    "Help & Support": "المساعدة والدعم",
    "Get help and documentation": "الحصول على المساعدة والوثائق",
    "Staff & Invitations": "الموظفون والدعوات",
    "Invite and manage your staff": "دعوة وإدارة موظفيك",
    "Update your personal information": "تحديث معلوماتك الشخصية",
    "First Name": "الاسم الأول",
    "Last Name": "اسم العائلة",
    Email: "البريد الإلكتروني",
    Password: "كلمة المرور",
    "Phone Number": "رقم الهاتف",
    "Business Name": "اسم العمل",
    "Save Changes": "حفظ التغييرات",
    "Notification Preferences": "تفضيلات الإشعارات",
    "Choose what notifications you receive": "اختر الإشعارات التي تستلمها",
    "Sales Alerts": "تنبيهات المبيعات",
    "Get notified when a sale is recorded": "استلم تنبيهاً عند تسجيل بيع",
    "Low Stock Warnings": "تحذيرات انخفاض المخزون",
    "Alert when items are running low": "تنبيه عند انخفاض المخزون",
    "Discrepancy Alerts": "تنبيهات التفاوت",
    "Immediate alert for stock mismatches": "تنبيه فوري لعدم تطابق المخزون",
    "Receive smart business recommendations": "استلم توصيات ذكية لعملك",
    "Daily Summary": "ملخص يومي",
    "End of day sales summary": "ملخص المبيعات نهاية اليوم",
    "Security Settings": "إعدادات الأمان",
    "Manage your password and security options":
      "إدارة كلمة المرور وخيارات الأمان",
    "Current Password": "كلمة المرور الحالية",
    "New Password": "كلمة المرور الجديدة",
    "Confirm Password": "تأكيد كلمة المرور",
    "Update Password": "تحديث كلمة المرور",
    "Invite team members to help manage your store":
      "دعوة أعضاء الفريق للمساعدة في إدارة متجرك",
    "Full Name": "الاسم الكامل",
    "Enter full name": "أدخل الاسم الكامل",
    "Enter your email": "أدخل بريدك الإلكتروني",
    "Enter your password": "أدخل كلمة المرور",
    "Remember me": "تذكرني",
    "Forgot password?": "هل نسيت كلمة المرور؟",
    "Sign In": "تسجيل الدخول",
    "Signing in...": "جاري تسجيل الدخول...",
    "Login as": "تسجيل الدخول كـ",
    "Demo Credentials:": "بيانات الدخول للتجربة:",
    "Owner:": "المالك:",
    "Admin:": "المشرف:",
    "Name and email are required": "الاسم والبريد الإلكتروني مطلوبان",
    "Enter a valid email": "أدخل بريداً إلكترونياً صالحاً",
    "Send Invite": "إرسال دعوة",
    "Only owners can invite staff. Contact your owner to get access.":
      "يمكن للمالكين فقط دعوة الموظفين. تواصل مع المالك للحصول على صلاحية.",
    Active: "نشط",
    Invited: "مدعو",
    "No staff members yet. Invite your first admin to get started.":
      "لا يوجد أعضاء فريق بعد. قم بدعوة أول مشرف للبدء.",
    "This section will be available soon.": "سيكون هذا القسم متاحاً قريباً.",
    "Loading your workspace...": "جاري تحميل مساحة العمل...",
    "Login failed. Please try again.": "فشل تسجيل الدخول. حاول مرة أخرى.",
    "Invalid email or password": "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    "You don't have owner access": "ليست لديك صلاحية مالك",
    "You don't have apprentice access": "ليست لديك صلاحية مشرف",
    "Welcome to LUXA": "مرحباً بكم في لوكسا",
    "Sign in to manage your business": "سجل الدخول لإدارة عملك",
    "All rights reserved.": "جميع الحقوق محفوظة.",
    "Insufficient stock": "المخزون غير كافٍ",
    "just now": "الآن",
    completed: "مكتمل",
    pending: "قيد الانتظار",
    "5 mins ago": "قبل 5 دقائق",
    "2 mins ago": "قبل دقيقتين",
    "15 mins ago": "قبل 15 دقيقة",
    "32 mins ago": "قبل 32 دقيقة",
    "1 hour ago": "قبل ساعة",
    "2 hours ago": "قبل ساعتين",
    "3 hours ago": "قبل 3 ساعات",
    "5 hours ago": "قبل 5 ساعات",
    "Urgent: Restock iPhone Chargers": "عاجل: إعادة تخزين شواحن آيفون",
    "Based on current sales velocity of 8 units/day, you'll run out of USB-C Fast Chargers in approximately 2 days. Historical data shows stockouts result in 15% customer loss.":
      "استناداً إلى سرعة المبيعات الحالية البالغة 8 وحدات يومياً، سينفد مخزون شواحن USB-C السريعة خلال يومين تقريباً. تظهر البيانات أن نفاد المخزون يؤدي إلى خسارة 15٪ من العملاء.",
    "Potential revenue loss: ₦96,000/day":
      "خسارة الإيرادات المحتملة: ₦96,000 يومياً",
    "Order 50 units now": "اطلب 50 وحدة الآن",
    "Wireless Earbuds are Trending!": "سماعات الأذن اللاسلكية تشهد رواجاً!",
    "Sales of Wireless Earbuds Pro have increased by 45% this week compared to last week. This product is outperforming all other accessories.":
      "ارتفعت مبيعات سماعات الأذن اللاسلكية برو بنسبة 45٪ هذا الأسبوع مقارنة بالأسبوع الماضي. هذا المنتج يتفوق على بقية الإكسسوارات.",
    "Additional profit opportunity: ₦125,000/week":
      "فرصة ربح إضافية: ₦125,000 أسبوعياً",
    "Increase stock by 50%": "زيادة المخزون بنسبة 50٪",
    'Laptop Sleeve 15" has only sold 2 units in the last 30 days. Current inventory of 22 units will take approximately 11 months to sell at this rate.':
      "لم يتم بيع سوى قطعتين من حافظة اللابتوب 15 بوصة خلال آخر 30 يوماً. المخزون الحالي البالغ 22 قطعة سيستغرق حوالي 11 شهراً للبيع بهذا المعدل.",
    "Capital locked: ₦154,000": "رأس مال مجمد: ₦154,000",
    "Consider 20% discount": "فكر في خصم 20٪",
    "Price Optimization Opportunity": "فرصة تحسين الأسعار",
    "Samsung Galaxy A54 is selling faster than average. Market analysis suggests you can increase the price by ₦5,000 without affecting demand.":
      "هاتف سامسونج جالاكسي A54 يُباع أسرع من المتوسط. تشير تحليلات السوق إلى إمكانية زيادة السعر بمقدار ₦5,000 دون التأثير على الطلب.",
    "Additional profit: ₦60,000/month": "ربح إضافي: ₦60,000 شهرياً",
    "Update pricing": "تحديث الأسعار",
    "New Product Suggestion": "اقتراح منتج جديد",
    "Based on customer purchase patterns, customers buying phones often look for screen protectors. Consider adding tempered glass protectors to your inventory.":
      "استناداً إلى أنماط الشراء، يبحث عملاء الهواتف غالباً عن واقيات الشاشة. فكر في إضافة واقيات زجاجية إلى مخزونك.",
    "Estimated additional revenue: ₦45,000/week":
      "إيراد إضافي متوقع: ₦45,000 أسبوعياً",
    "Add to inventory": "أضف إلى المخزون",
    "New Items Added": "تمت إضافة عناصر جديدة",
    "Ahmed added 20 units of iPhone 15 Pro Max Cases to inventory. Please confirm receipt.":
      "أضاف أحمد 20 قطعة من أغطية iPhone 15 Pro Max إلى المخزون. يرجى تأكيد الاستلام.",
    "Stock Discrepancy Detected": "تم اكتشاف تفاوت في المخزون",
    "Expected 12 Wireless Mouse units but system shows 8. Please verify physical count.":
      "المتوقع 12 وحدة من الفأرة اللاسلكية لكن النظام يظهر 8 فقط. يرجى التحقق من العدد الفعلي.",
    "Large Sale Recorded": "تم تسجيل عملية بيع كبيرة",
    "Ibrahim sold Samsung Galaxy A54 for ₦185,000. Transaction completed successfully.":
      "قام إبراهيم ببيع سامسونج جالاكسي A54 بسعر ₦185,000. اكتملت العملية بنجاح.",
    "Restock Recommendation": "توصية بإعادة التخزين",
    "USB-C Fast Chargers are selling fast. Consider restocking within 48 hours to avoid stockout.":
      "تُباع شواحن USB-C السريعة بسرعة. فكر في إعادة التخزين خلال 48 ساعة لتجنب نفاد المخزون.",
    "Low Stock Warning": "تحذير انخفاض المخزون",
    "iPhone 15 Pro Max Case has only 2 units left. Reorder to maintain stock levels.":
      "بقيت قطعتان فقط من غطاء iPhone 15 Pro Max. أعد الطلب للحفاظ على مستويات المخزون.",
    "Daily Sales Summary": "ملخص المبيعات اليومي",
    "Total sales for today: ₦892,400 with 47 items sold. Profit margin: 24.8%.":
      "إجمالي مبيعات اليوم: ₦892,400 مع بيع 47 عنصراً. هامش الربح: 24.8٪.",
    "Price Optimization": "تحسين السعر",
    "Wireless Earbuds Pro are trending. Consider a slight price increase to maximize profits.":
      "سماعات الأذن اللاسلكية برو رائجة. فكر في زيادة طفيفة في السعر لتعظيم الأرباح.",
  },
};

const LANGUAGE_STORAGE_KEY = "luxa_language";

const interpolate = (
  template: string,
  values?: Record<string, string | number>
) => {
  if (!values) return template;
  return template.replace(/\{(.*?)\}/g, (_, key) => {
    const replacement = values[key];
    return replacement !== undefined ? String(replacement) : "";
  });
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(
      LANGUAGE_STORAGE_KEY
    ) as Language | null;
    if (stored === "en" || stored === "ar") {
      setLanguage(stored);
    }
  }, []);

  const isRTL = language === "ar";

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", isRTL);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language, isRTL]);

  const formatCurrency = useMemo(() => {
    return (
      amount: number,
      options: Intl.NumberFormatOptions = { minimumFractionDigits: 0 }
    ) => {
      const locale = language === "ar" ? "ar-EG" : "en-NG";
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "NGN",
        ...options,
      }).format(amount);
    };
  }, [language]);

  const t = (key: string, options?: TranslateOptions) => {
    const template =
      translations[language][key] ??
      translations.en[key as keyof typeof translations.en] ??
      options?.fallback ??
      key;
    return interpolate(template, options?.values);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        isRTL,
        t,
        setLanguage,
        toggleLanguage,
        formatCurrency,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
