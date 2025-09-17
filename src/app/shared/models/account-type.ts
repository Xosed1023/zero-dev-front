export type AccountType =
  AccountTypeUsdt
  | AccountTypeEth
  | AccountTypeBtc
  | { name: string };

export class AccountTypeGeneric { readonly name: string | undefined; }
export class AccountTypeUsdt extends AccountTypeGeneric { override readonly name= 'USDT'; }
export class AccountTypeEth extends AccountTypeGeneric { override readonly name= 'ETH'; }
export class AccountTypeBtc extends AccountTypeGeneric { override readonly name= 'BTC'; }


