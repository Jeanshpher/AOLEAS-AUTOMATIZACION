# language: es
# Especificacion BDD del inicio de sesion.
# Datos concretos en src/data/inicioSesion.json.

Característica: Inicio de sesión
  Como cliente registrado
  Quiero autenticarme en el portal
  Para acceder al resumen de mis cuentas

  Antecedentes:
    Dado que el cliente abre la página de inicio de ParaBank

  @login @positivo @smoke
  Escenario: Acceso exitoso con credenciales válidas
    Cuando ingresa un usuario y contraseña válidos
    Y presiona "Log In"
    Entonces es redirigido a la página de resumen de cuentas "overview.htm"

  @login @negativo
  Escenario: Acceso rechazado con usuario inexistente
    Cuando ingresa un usuario que no existe
    Y presiona "Log In"
    Entonces se muestra el error "The username and password could not be verified."
