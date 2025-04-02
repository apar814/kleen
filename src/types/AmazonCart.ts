export interface AmazonMarketBasketReport {
  reportSpecification: ReportSpecification;
  dataByAsin: DetailsByAsin[];
}

export interface ReportSpecification {
  reportType: "GET_BRAND_ANALYTICS_MARKET_BASKET_REPORT";
  reportOptions: {
    reportPeriod: "DAY" | "WEEK" | "MONTH" | "QUARTER";
  };
  dataStartTime: string;
  dataEndTime: string;
  marketplaceIds: string[];
}

export interface DetailsByAsin {
  startDate: string;
  endDate: string;
  asin: string;
  purchasedWithAsin: string;
  purchasedWithRank: number;
  combinationPct: number;
}

// Legacy cart data structure (keep for compatibility)
export interface AmazonCartData {
  idempotentShoppingTripId: string;
  storeId: string;
  lineItems: AmazonLineItem[];
  orderTotals: AmazonOrderTotals;
}

export interface AmazonLineItem {
  productId: string;
  type: string;
  quantity: {
    value: string;
    unit: string;
  };
  unitPrice: {
    totalPrice: AmazonPrice;
    price: AmazonPrice;
    depositsAndFees?: AmazonDepositAndFee[];
    salesTax: AmazonPrice;
    promotions?: AmazonPromotion[];
  };
}

export interface AmazonPrice {
  amount: string;
  currencyCode: string;
}

export interface AmazonDepositAndFee {
  depositAndFeeAmount: AmazonPrice;
  depositAndFeeDescription: string;
  salesTax?: AmazonPrice;
}

export interface AmazonPromotion {
  promotionAmount: AmazonPrice;
  promotionDescription: string;
}

export interface AmazonOrderTotals {
  priceTotal: AmazonPrice;
  subTotal: AmazonPrice;
  promotionsTotal: AmazonPrice;
  salesTaxTotal: AmazonPrice;
}
