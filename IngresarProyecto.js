$w.onReady(function () {
    init()
});

function init() {
    $w('#saveProyecto').onClick(() => saveProyecto())
}

function saveProyecto() {

    $w('#saveProyecto').disable()
    $w('#alert').collapse();
    try {
        checkValidationProject();
        let json = {
            'titulo_proyecto': $w('#titulo').value,
            'resumen': $w('#resumen').value,
            'objetivos': $w('#objetivos').value,
            'conclusiones': $w('#conclusiones').value,
            'metodologia': $w('#metodologia').value,
            'presupuesto': $w('#presupuesto').value,
            'fecha_inicio': $w('#date1').value.toDateString(),
            'fecha_cierre': $w('#date2').value.toDateString()
        }
        console.log(json)
        disable()
        //HERE ================================================================

    } catch (error) {
        $w('#alert').text = error.message;
        $w('#alert').expand();
        $w('#saveProyecto').enable()
    }
}

function checkValidationProject() {
    if (!$w('#titulo').valid) throw new Error('Falta el titulo');
	if (!$w('#resumen').valid) throw new Error('Falta el resumen');
	if (!$w('#objetivos').valid) throw new Error('Falta los objetivos');
	if (!$w('#conclusiones').valid) throw new Error('Falta las conclusiones');
	if (!$w('#metodologia').valid) throw new Error('Falta la metodologia');
	if (!$w('#presupuesto').valid) throw new Error('Falta el presupuesto');
}

function disable() {
    $w('#titulo').disable()
    $w('#resumen').disable()
    $w('#objetivos').disable()
    $w('#conclusiones').disable()
    $w('#metodologia').disable()
    $w('#presupuesto').disable()
    $w('#date1').disable()
    $w('#date2').disable()
}
