declare module "midtrans-client" {
  interface ClientOptions {
    isProduction: boolean;
    serverKey: string;
    clientKey?: string;
  }

  interface SnapTransaction {
    token: string;
    redirect_url: string;
  }

  interface TransactionDetails {
    order_id: string;
    gross_amount: number;
  }

  interface ItemDetail {
    id: string;
    price: number;
    quantity: number;
    name: string;
  }

  interface CustomerDetails {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  }

  interface SnapParameter {
    transaction_details: TransactionDetails;
    item_details?: ItemDetail[];
    customer_details?: CustomerDetails;
    [key: string]: unknown;
  }

  class Snap {
    constructor(options: ClientOptions);
    createTransaction(parameter: SnapParameter): Promise<SnapTransaction>;
    createTransactionToken(parameter: SnapParameter): Promise<string>;
  }

  class CoreApi {
    constructor(options: ClientOptions);
  }

  export { Snap, CoreApi };
}
