export interface UserList {
  names: string;
  surname: string;
  username: string;
  id?: string;
  email: string;
  id_rol: number;
  id_state?: number
}

export interface UserListResult extends UserList {
}

export interface User extends UserList {
    id_user?: string;
    modification_date?: string;
    postal_code: number;
    state_dpto?: string;
    id_location?: number;
    birthdate: string;
    city: string;
    country: string;
    creation_date?: Date;
    password?: string;
    direction?: string;
    wallet_usdt?: string;
    wallet_eth?: string;
    wallet_btc?: string;
    wallet_usd?: string;
}
