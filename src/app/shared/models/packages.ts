export type Package =
  PackageGold
  | PackageBasic
  | PackagePlatinum
  | { name: string, percentage: number };

export class PackageGeneric { readonly name: string | undefined; readonly percentage: number | undefined; }
export class PackageGold extends PackageGeneric { override readonly name= 'ORO'; override readonly percentage= 5; }
export class PackageBasic extends PackageGeneric { override readonly name= 'BASICO'; override readonly percentage= 3;}
export class PackagePlatinum extends PackageGeneric { override readonly name= 'PLATINO'; override readonly percentage= 7;}


