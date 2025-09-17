export type Role =
  RolAdmin
  | RolClient
  | { key: number, role: string };

export class RoleGeneric { readonly key: number | undefined; readonly role: string | undefined; }
export class RolAdmin extends RoleGeneric { override readonly key = 1; override readonly role= 'Administrador'; }
export class RolClient extends RoleGeneric { override readonly key = 2; override readonly role= 'Cliente'; }
export class RolConsultant extends RoleGeneric { override readonly key = 3; override readonly role= 'Consultor'; }


