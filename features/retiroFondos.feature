# Especificacion de retiro de fondos.
# Datos concretos en src/data/retiro.json (actualmente incompletos: sin monto ni cuenta).
# ADVERTENCIA: La página actualmente NO expone una pantalla nativa de "retiro". 
# Los escenarios se encuentran a espera de definición.

Característica: Retiro de fondos
  Como cliente autenticado
  Quiero retirar dinero de mi cuenta
  Para disponer de mis fondos

  Antecedentes:
    El cliente ha iniciado sesión satisfactoriamente

  @retiro @positivo @pendiente-flujo
  Escenario: Retiro exitoso con monto válido y saldo suficiente
    Cuando solicita un retiro por un monto válido
    Entonces la operación se confirma como exitosa

  @retiro @negativo @pendiente-flujo
  Escenario: Retiro rechazado por fondos insuficientes
    Cuando solicita un retiro por un monto mayor al saldo disponible
    Entonces el sistema rechaza la operación por fondos insuficientes

  @retiro @negativo @validacion @pendiente-flujo
  Escenario: Retiro rechazado por monto inválido
    Cuando solicita un retiro por un monto inválido
    Entonces el sistema muestra el mensaje "Invalid amount"
