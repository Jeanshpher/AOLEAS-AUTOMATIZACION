# Especificacion de transferencia de fondos.
# Datos concretos en src/data/transferencia.json.

Característica: Transferencia de fondos
  Como cliente autenticado
  Quiero transferir dinero entre mis cuentas
  Para mover fondos según mi necesidad

  Antecedentes:
    Se inicia sesión y se navega a opción "Transfer Funds"    

  @transferencia @positivo
  Escenario: Transferencia exitosa entre cuentas propias
    Cuando indica un monto válido
    Y selecciona la cuenta origen y la cuenta destino
    Y presiona "Transfer"
    Entonces se muestra la confirmación "has been transferred from account"

  # NOTA: La página no valida saldo disponible; este caso se utiliza  
  # cuando se implemente la validación correspondiente.
  @transferencia @negativo @pendiente-definir
  Escenario: Transferencia con fondos insuficientes
    Cuando indica un monto mayor al disponible
    Y selecciona la cuenta origen y la cuenta destino
    Y presiona "Transfer"
    Entonces el sistema informa que la operación no puede completarse
