# zerodev
2 Portales Web / 1 administracion y 1 de usuario
Modulos (usuario)
  - Inicio Sesion
      - [] Pagina Inicial con los planes Basic, Gold, Plantino e informacion de procesos
          Al momento de elegir el paquete debe permitir el registro (envio de formulario al correo del admin para la creacion de usuario) - envio de pendiente de aprobacion al usuario.
      - [] boton/enlace al login de la pagina
      - [] Usuario/Contraseña (Solo se crea desde portal Admin) 
      - [] Doble factor de autenticacion (google authenticator) opcion al final... si queda tiempo
      - [] Autentica a DB
      - [] Recuperacion de contraseña
  - Cuenta
      - [] Solo al inicio y por unica vez cuando se ingresa debe aceptar un formulario de terminos y condiciones con opcion de aceptar o no.
      - [] Status de solicitudes
      - [] Codigo de usuario (Account Number) Permite intercambiar cuentas (USDT, BTC, ETH)
      - [] Balance Actual y proyeccion de dinero ganado en el mes manteniendo ese saldo y anual
      - [] Tipo de cuenta (USDT, BTC, ETH)
      - [] Info del Wallet actual
      - [] Status Usuario (Activo/Inactivo)
      - [] Movimientos de la cuenta (fecha y hora, ID movimiento, Descripcion, Debito/Credito, Balance actual y Status del movimiento)
      - [] Permitir comprar mas paquetes
  - Mi Perfil
      - [x] Nombre Usuario
      - [x] Nombre Completo
      - [x] Direccion Email
      - [x] Status Usuario
      - [x] Fecha de cumpleaños
      - [x] ID
      - [x] Direccion
      - [x] Ciudad
      - [x] Pais
      - [x] Estado/Provincia/region
      - [x] Codigo Postal
  - Transferencias
      - [] Conversion de moneda - (Esto no es automatico)
      - [] Transferencia entre usuarios (No es automatico) debe permitir agregar usuario con opcion de agregar a favoritos (solo con ID Usuario)
      nota: Este proceso es manual, la informacion de este modulo debe enviarse por email para hacer la actividad el administrador
  - Retiro
      - Formulario donde se anexa la información para enviar la divisa (colocar mensaje de estas seguro? si/no)
      nota: Este proceso es manual, la informacion de este modulo debe enviarse por email para hacer la actividad el administrador
  - Seguridad
      -[] Cambio contraseña

Modulo (Administrador)
  - Inicio de sesion es el mismo que el modulo de cliente, solo que se tendría acceso a la siguiente informacion.
  - Cuenta
      - [] Dashboard donde se puedan ver todos los movimientos relacionados a las actividades del portal de cliente (debe contar con filtros)
      - [] Modulo donde se pueda agregar, modificar, eliminar saldos a los usuarios en cada cuenta (USD, EUR, BTC, Etc)
      - [] Modulo donde permita la creacion de usuario y eliminacion/suspension del mismo
      - [] Que se pueda ver la info especifica de cada usuario (puede ser en un dahboard) info de saldo, etc
      - [] Permitir responder el mensaje enviado por el cliente para confirmar transaccion o crear mensaje nuevo.
      - [] Permitir modificar info de clientes y permitir modificar saldo de los clientes en los diferentes wallet
      - [] Se puede agregar varios paquetes
        Nota: Que en el dashboard permita visualizar todos los string de las wallet creadas de los usuarios

Nota:
- toda la Informacion enviar a un correo y no dentro de la plataforma (facilidad de desarrollo)
- Al momento de crear el usuario permite generar los 3 tipos de wallet (BTC, USDT, ETH)
- Campo de valor 0,00000000 (debe aceptarlo la base de datos)
- ganancia al final de año y ganancia mensual (solo ganancia basado unicamente en el valor de los paquetes adquiridos.)
- Permitir al usuario comprar mas paquetes

Campos de formularios:
1.	Formulario de solicitud de creación de usuario (index):
En la página del index, al darle clic al paquete correspondiente se genera un formulario con los siguientes campos
o	[] Nombre
o	[] Apellido
o	[] Email
o	[] Fecha de nacimiento
o	[] Dirección
o	[] Ciudad
o	[] país
o	[] Estado/Provincia/Region
o	[] Codigo Postal
o	[] Paquete (Este campo se debe elegir automáticamente)
Esta información se envía por correo electrónico, pero al mismo tiempo se envia un correo al usuario con el texto… “Cuenta pendiente de aprobación”. 
En el modulo de administrador debe permitir agregar la siguiente información:
o	[] Wallet USDT (Campo alfanumerico sin caracteres especiales)
o	[] Wallet BTC (Campo alfanumerico sin caracteres especiales)
o	[] Wallet ETH (Campo alfanumerico sin caracteres especiales)

2.	Formulario de recompra de paquetes
Este formulario aparecerá solamente en las opciones de usuario (Puede ser en el modulo de mi cuenta) y contendrá las siguientes opciones
o	[] Paquete para adquirir
Esta opción debe permitir adicionar N paquetes
Registro de los paquetes adquiridos
La opción de ganancia que se mostrará en mi cuenta solo debe calcular la ganancia mensual (cada 30 días luego de adquirido el paquete) y anual de los paquetes base (365 días después de adquirido el paquete), no se generará ganancia sobre ganancia. 

3.	Formulario de conversión de moneda
Este formulario permite enviar la solicitud de conversión de saldo entre USDT, BTC y ETH con los siguientes campos:
o	[] Moneda inicial (Elegir la cuenta ya sea USDT, BTC o ETH)
o	[] Monto a convertir
o	[] Moneda final
Esta solicitud debe llegar por correo electrónico al administrador y generar una lista en el portal de administrador para confirmar la finalización del proceso y que el cliente pueda ver que la actividad ya fue realizada.

4.	Formulario de transferencia de saldo
Este formulario permite enviar solicitud de transferencia de saldo entre una cuenta y otra, los campos utilizados son:
o	[] Moneda inicial
o	[] Monto a transferir
o	[] Usuario final
En la opción de usuario final debe permitir agregar el id del usuario, nombre y apellido
o	[] Nota
Permite agregar una nota del motivo de la transferencia

  
# Apis
## Login
    - Autenticarse por usuario y contraseña
https://api.vbtcustody.io/auth/login
## Logout
    - salir de la aplicacion
https://api.vbtcustody.io/auth/logout
## Token
    - Autenticacion por token
https://api.vbtcustody.io/auth/login_jwt
## Contraseñas
    - Generar contraseñas
https://api.vbtcustody.io/auth/new_pass
## Perfil
    - Cargar Perfil
https://api.vbtcustody.io/apis/perfil_load
    - Aceptar terminos y condiciones
https://api.vbtcustody.io/apis/accept_terms
    - Consultar usuarios con algun filtro
https://api.vbtcustody.io/apis/perfil_select
    - Crear usuarios
https://api.vbtcustody.io/apis/perfil_create
    - Actualizar usuarios
https://api.vbtcustody.io/apis/perfil_edit
    - Traer todos los usuarios
https://api.vbtcustody.io/apis/all_users

## Paquetes
    - Crear paquetes
https://api.vbtcustody.io/apis/package/create
    -Consultar Paquetes
https://api.vbtcustody.io/apis/package/select

## Cuentas
    - Consultar Cuenta
https://api.vbtcustody.io/account/select

## Movimientos
    - Consultar Movimientos
https://api.vbtcustody.io/movements/select

# Base de datos - Tablas Listas

## audit.errors 
Tabla donde se registran los erroes

    - id - Id unico de la tabla
    - process - proceso que genero error
    - username - usuario con el que se genero error
    - error - Descripcion del Error
    - campos de auditoria


## catalogue.group 
Tabla donde se registran los grupos de los estados

    - id - Id unico de la tabla
    - name - nombre del grupo de estados
    - description - descripcion de los estado de grupos
    - campos de auditoria

## catalogue.roles 
Tabla donde se registran los roles

    - id - Id unico de la tabla
    - name - nombre del rol
    - description - descripcion del rol
    - id_state - Estado del registro
    - campos de auditoria

## catalogue.state 
Tabla donde se registran los estados para las tablas

    - id - Id unico de la tabla
    - id_group - id del grupo de estados
    - id_state - Estado del registro
    - name_state - nombre del estado
    - description - descripcion del estado
    - campos de auditoria

## auth.tokens 
Tabla donde se registran los token de accesos 

    - id - Id unico de la tabla
    - id_user - id del usuario que solicito el token 
    - token_type - tipo de token 
    - token - codigo del token
    - id_state - id del estado del registro
    - token_expire - Fecha de expiracion del token
    - campos de auditoria

## auth.users
Tabla donde se registran los token de accesos 

    - id - Id unico de la tabla
    - username - usuario de la cuenta
    - names - nombre del usuario
    - surname - apellido del usuario
    - email - correo electronico del usuario
    - password - contraseña de la cuenta
    - id_rol - id rol que usa el usuario en la plataforma
    - id_state - id estado del usuario
    - birthdate - fecha de cumpleaños del usuario
    - id_location - id de la ubicacion del usuario
    - accept_terms - acepto terminos y condiciones
    - date_accept_terms - fecha de aceptacion de terminos y condiciones
    - campos de auditoria

## core.location 
Tabla donde se registran los token de accesos 

    - id - Id unico de la tabla
    - country - pais del usuario
    - state_dpto - estado o departamento
    - city - ciudad
    - postal_code - codigo postal del usuario
    - direction - direccion del usuario
    - id_state - id del estado del registro
    - campos de auditoria

## core.account
Cuenta del usuario 

    - id - (Id unico de la tabla )
    - username - usuario de la cuenta
    - account_number - numero unico de la cuenta 
    - account_type - tipo de cuenta
    - wallet - wallet 
    - commission_percent - porcentaje de comision de la cuenta
    - cupo - cupo maximo de la cuenta
    - id_state - estado de al cuenta
    - campos auditoria

## core.account_balance - saldo_cuenta
Saldo de la cuenta

    - id - (Id unico de la tabla )
    - account_id - id de la cuenta 
    - balance - saldo de la cuenta
    - currency - tipo de moneda
    - id_state - estado del registro
    - campos auditoria

## core.currency_day - 
moneda del dia

    - id - (Id unico de la tabla )
    - currency - tipo de moneda
    - value - valor de la moneda del dia
    - id_state - estado del registro
    - campos auditoria

## core.type_movement -
tipos de transferencia o movimiento

    - id - (Id unico de la tabla )
    - movement - tipo de movimeinto o descripcion
    - description - descripcion de lo que hace el movimiento
    - sign - indica si el movimiento realiza un debito o credito o info
    - id_state - estado del registro
    - campos auditoria

## core.transfer_request  ****
solicitud transferencia

    - id - (Id unico de la tabla )
    - movement - (tipo de solicitud de transferencia)
    - request_state -  (estado de la solicitud
    - current_currency - (Moneda actual de la operacion)
    - destination_currency (Moneda destino si es cambio de moneda)
    - request_date (Fecha de solicitud y es la que aplica el cambio de moneda)
    - account_number cuenta que realiza la solicitud
    - account_number_destination (cuenta destino en caso de transferencia a otra cuenta)
    - id_state - estado de la solicitud
    - Obervation 
    - campos auditoria

## core.packages 
Solicitud Paquetes

    - id 
    - nombre_paquete (Paquete seleccionado) 
    - valor_paquete 
    - % rentabilidad
    - vigencia
    - dias_activo
    - package_type
    - voucher
    - campos de auditoria

## core.movements

movimientos

    - id --id unico
    - origin_movement --CAMPAÑA - BONO - SOLICITUD - PAQUETE
    - origin_id --id de movimientos para identificar origen y destino
    - id_cuenta  --id de la cuenta en la que se genera el movimiento
    - id_tipo_transferencia -- tipo de movimientos que se va a realizar
    - fecha_solicitud -- fecha de la solicitud del movimiento , si no viene de una solicitud se deja el mismo del movimiento
    - fecha_movimiento ---fecha cuando se aplica el movimiento
    - moneda_operacion -- modeda de la operacion
    - valor -- valor de la operacion
    - signo -- credito debito o informativo
    - campos de auditoria

# Base de datos - en Desarrollo


#### Pendientes  ****************
- [] Cuando se apruebe una solicitud , hay que diligenciar el valor destino



- mensajes
  - id 
  - id_cuenta 
  - id_solicitud 
  - mensaje -- Mensaje que vera el cliente cuando se le acepte una transferencia
  - campos de auditoria


