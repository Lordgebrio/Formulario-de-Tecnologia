async function fillPdf() {
  const { PDFDocument, rgb } = PDFLib

  // Obtén los datos del formulario
  const name = document.getElementById('name').value
  const idNumber = document.getElementById('idNumber').value
  const cc = document.getElementById('cc').checked
  const ti = document.getElementById('ti').checked
  const signatureFile = document.getElementById('signature').files[0]
  const tiSignatureFile = document.getElementById('tisignature').files[0]
  const modelo = document.getElementById('modelo').value
  const serie = document.getElementById('serialNumber').value
  const placa = document.getElementById('plateNumber').value
  const networkName = document.getElementById('networkName').value
  const observations = document.getElementById('observations').value
  const equipmentType = document.getElementById('equipmentType').value
  const reason = document.getElementById('reason').value
  const processor = document.getElementById('processor').value
  const ram = document.getElementById('ram').value
  const diskCapacity = document.getElementById('diskCapacity').value
  const brand = document.getElementById('brand').value

  const city = document.getElementById('city').value
  const date = document.getElementById('date').value

  // Carga el PDF base
  const url = 'documents/format/template.pdf' // Ajusta esta ruta según la ubicación de tu archivo PDF
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer())

  // Crea un nuevo documento PDF
  const pdfDoc = await PDFDocument.load(existingPdfBytes)

  // Obtén los campos de formulario
  const form = pdfDoc.getForm()

  // Llena los campos de formulario

  const cityField = form.getTextField('city')
  cityField.setText(city)

  const dateField = form.getTextField('date')
  dateField.setText(date)

  const processorField = form.getTextField('processor')
  processorField.setText(processor)

  const ramField = form.getTextField('ram')
  ramField.setText(ram)

  const diskCapacityField = form.getTextField('diskCapacity')
  diskCapacityField.setText(diskCapacity)

  const brandField = form.getTextField('brand')
  brandField.setText(brand)

  const equipmentTypeField = form.getTextField('equipmentType')
  equipmentTypeField.setText(equipmentType)

  const reasonField = form.getTextField('reason')
  reasonField.setText(reason)

  const serieField = form.getTextField('serialNumber')
  serieField.setText(serie)

  const networkNameField = form.getTextField('networkName')
  networkNameField.setText(networkName)

  const nameField = form.getTextField('name')
  nameField.setText(name)

  const placaField = form.getTextField('plateNumber')
  placaField.setText(placa)

  const observationsField = form.getTextField('observations')
  observationsField.setText(observations)

  const modeloField = form.getTextField('model')
  modeloField.setText(modelo)

  const idNumberField = form.getTextField('idNumber')
  idNumberField.setText(idNumber)

  const ccField = form.getCheckBox('cc')
  if (cc) {
    ccField.check()
  } else {
    ccField.uncheck()
  }

  const tiField = form.getCheckBox('ti')
  if (ti) {
    tiField.check()
  } else {
    tiField.uncheck()
  }

  const equipmentFields = [
    'teclado',
    'cargador',
    'guaya',
    'base',
    'pantalla',
    'mouse',
    'morral',
  ]
  equipmentFields.forEach((field) => {
    const checkBox = form.getCheckBox(field + 'Field')
    if (document.getElementById(field).checked) {
      checkBox.check()
    } else {
      checkBox.uncheck()
    }
  })

  // Llena los campos de software
  const softwareFields = [
    'windows10',
    'windows11',
    'office2016',
    'office365',
    'antivirus',
    'winrar',
    'acrobatReader',
    'sapGui',
    'teamViewer',
    'adobeCloud',
    '7zip',
    'impresoras',
    'vpn',
    'oneDrive',
  ]
  softwareFields.forEach((field) => {
    const checkBox = form.getCheckBox(field + 'Field')
    if (document.getElementById(field).checked) {
      checkBox.check()
    } else {
      checkBox.uncheck()
    }
  })

  // Agrega las firmas
  if (signatureFile) {
    if (signatureFile.type === 'image/png') {
      const signatureBytes = await signatureFile.arrayBuffer()
      const signatureImage = await pdfDoc.embedPng(signatureBytes)
      const signatureField = form.getButton('signature')
      if (signatureField) {
        signatureField.setImage(signatureImage)
      } else {
        console.error('El campo de firma "signature" no es un botón.')
      }
    } else {
      console.error('El archivo de firma no es un PNG.')
    }
  }

  if (tiSignatureFile) {
    if (tiSignatureFile.type === 'image/png') {
      const tiSignatureBytes = await tiSignatureFile.arrayBuffer()
      const tiSignatureImage = await pdfDoc.embedPng(tiSignatureBytes)
      const tiSignatureField = form.getButton('tiSignature')
      if (tiSignatureField) {
        tiSignatureField.setImage(tiSignatureImage)
      } else {
        console.error('El campo de firma "tiSignature" no es un botón.')
      }
    } else {
      console.error('El archivo de firma TI no es un PNG.')
    }
  }

  // Guarda el PDF modificado
  const pdfBytes = await pdfDoc.save()

  // Descarga el PDF
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'formulario_lleno.pdf'
  link.click()

  // Mostrar mensaje de confirmación y refrescar la página
  alert('Formulario llenado satisfactoriamente y acta descargada.')
  location.reload()
}
