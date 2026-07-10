# Especificacion del registro de cuenta.
# Datos concretos en src/data/crearUsuario.json.

Característica: Registro de cuenta
  Como visitante del portal registro una nueva cuenta 
  Para poder operar como cliente del banco

  Antecedentes:
    URL de acceso público "https://parabank.parasoft.com/parabank/register.htm"

  @registro @positivo
  Escenario: Registro exitoso con datos válidos
    Cuando completa el formulario con datos válidos y username único
    Y presiona "Register"
    Entonces el sistema confirma que la cuenta fue creada y la sesión queda iniciada

  @registro @negativo
  Escenario: Registro rechazado cuando las contraseñas no coinciden
    Cuando completa el formulario con datos válidos
    Pero la confirmación de contraseña es distinta de la contraseña
    Y presiona "Register"
    Entonces se muestra el error "Passwords did not match."

  @registro @negativo
  Escenario: Registro rechazado con username ya existente
    Cuando completa el formulario con un username ya registrado
    Y presiona "Register"
    Entonces se muestra el error "This username already exists."

  @registro @negativo @validacion
  Escenario: Registro rechazado cuando el SSN está vacío
    Cuando completa el formulario dejando el SSN vacío
    Y presiona "Register"
    Entonces se muestra el error "Social Security Number is required."
