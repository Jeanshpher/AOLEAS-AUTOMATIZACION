export interface CrearUsuarioCaso {
  firstName: string;
  lastName: string;
  addres: string;
  city: string;
  State: string;
  zipCode: string;
  phone: string;
  ssn: string;
  userName: string;
  password: string;
  confirm: string;
  statusCase: 'usuario_creado' | 'error_confirm' | 'usuario_duplicado' | 'ssn_vacio';
  assert: string;
}

export interface TransferenciaCaso {
  amount: string;
  origin_account: string;
  destination_account: string;
  statusCase: 'transferencia_exitosa' | 'fondos_insuficientes';
  assert: string;
}

export interface InicioSesionCaso {
  userName: string;
  password: string;
  statusCase: 'acceso_exitoso' | 'usuario_noexiste';
  assert: string;
}