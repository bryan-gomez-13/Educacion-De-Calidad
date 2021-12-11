import {register, login} from 'backend/mintic'

$w.onReady(function () {
	//$w('#group1').collapse()
    init()
});
//Inicializacion de metodos
function init() {
    $w('#address').onChange(() => getAddress())
    $w('#register').onClick(() => registerClick())
    $w('#loginIngresar').onClick(() => IngresarClick())
    $w('#text4').onClick(() => $w('#statebox8').changeState('Login'))
    $w('#text7').onClick(() => $w('#statebox8').changeState('Register'))
}
//Autocompletar Datos de municipio y departamento
function getAddress() {
    let address = ($w('#address').value.formatted).split(',');
    $w('#departamento').value = address[2]
    $w('#municipio').value = address[1]
    //console.log($w('#address').value)
}
//Registrar
async function registerClick() {
    $w('#register').disable()
    $w('#alert').collapse();
    try {
        checkValidationRegister();
        await registerUser();
    } catch (err) {
        $w('#alert').text = err.message;
        $w('#alert').expand();
        $w('#register').enable()
    }
}
//Validación que todos los campos esten completos
function checkValidationRegister() {
    if (!$w('#cedula').valid) throw new Error('Falta la cedula');
    if (!$w('#nombre').valid) throw new Error('Falta el nombre');
    if (!$w('#correo').valid) throw new Error('Falta el correo electronico');
    if (!$w('#pass').valid) throw new Error('Falta la contraseña');
    if ($w('#pass').value.length < 6) throw new Error('La contraseña debe ser mayor a 6 caracteres');
    if (!$w('#address').valid) throw new Error('Falta la dirección');
    if (!$w('#departamento').valid) throw new Error('Falta el departamento');
    if (!$w('#municipio').valid) throw new Error('Falta el municipio');
    if (!$w('#perfil').valid) throw new Error('Falta el perfil');
}
//Registra usuario
async function registerUser() {
    $w('#alert').text = 'Guardando la información, No cierre la pagina';
    $w('#alert').expand();

    let json = {
        'cedula': $w('#cedula').value,
        'nombre': $w('#nombre').value,
        'correoElectronico': $w('#correo').value,
        'clave': $w('#pass').value,
        'direccion': $w('#address').value.formatted,
        'departamento': $w('#departamento').value,
        'municipio': $w('#municipio').value,
        'perfil': $w('#perfil').value
    }

	//HERE ================================================================
    register(json)

    $w('#alert').text = 'Usuario creado';
	$w('#statebox8').changeState('Login')
	clear()
}

async function IngresarClick() {
    $w('#loginIngresar').disable()
    $w('#loginAlert').collapse();
    try {
        checkValidationLogin();
        let json = {
            'cedula': $w('#loginID').value,
            'clave': $w('#loginPass').value
        }
        //HERE ================================================================
        login(json)

    } catch (error) {
        $w('#loginAlert').text = error.message;
        $w('#loginAlert').expand();
        $w('#loginIngresar').enable()
    }
}

function checkValidationLogin() {
    if (!$w('#loginID').valid) throw new Error('Falta la cedula');
    if (!$w('#loginPass').valid) throw new Error('Falta la contraseña');
    if ($w('#loginPass').value.length < 6) throw new Error('La contraseña debe ser mayor a 6 caracteres');
}

function clear(){
	$w('#cedula').value = ""
	$w('#nombre').value = ""
	$w('#correo').value = ""
	$w('#pass').value = ""
	$w('#address').value = null
	$w('#departamento').value = ""
	$w('#municipio').value = ""
	$w('#perfil').value = ""
}