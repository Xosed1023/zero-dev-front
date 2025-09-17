export type PackageType =
  PackageTypeBasic
  | PackageTypeOro
  | PackageTypePlatino
  | { name: string };

export class PackageTypeGeneric { readonly name: string | undefined; }
export class PackageTypeBasic extends PackageTypeGeneric { override readonly name= 'Basic'; }
export class PackageTypeOro extends PackageTypeGeneric { override readonly name= 'Oro'; }
export class PackageTypePlatino extends PackageTypeGeneric { override readonly name= 'Platino'; }


