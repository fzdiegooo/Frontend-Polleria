import { Role } from './Roles.type';
import { TipoDocumento } from './TipoDocumento';

export interface User {
  username: string;
  role: Role;
}

export interface UserWithToken extends User {
  token: string;
}

export interface Cliente extends User {
  id: string;
  nombre: string;
  apellidos: string;
  numeroDocumento: string;
  tipoDocumento: TipoDocumento;
  direccion: string;
  correo: string;
  telefono: string;
}