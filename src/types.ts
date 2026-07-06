export type Role = 'fan' | 'staff' | 'admin' | 'volunteer';

export interface User {
  id: string;
  name: string;
  role: Role;
}
