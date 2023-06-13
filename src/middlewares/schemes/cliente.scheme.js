const joi = require("joi");

let crearCliente = joi.object({
    nombre: joi.string().required().messages({
        'string.empty': 'El campo nombre"no puede estar vacío',
        'any.required': 'El campo nombre es obligatorio'
      }),
      dni: joi.string().required().messages({
        'string.empty': 'El campo dni no puede estar vacío',
        'any.required': 'El campo dni es obligatorio'
      }),
      oficina: joi.string().required().messages({
        'string.empty': 'El campo oficina no puede estar vacío',
        'any.required': 'El campo oficina es obligatorio'
      }),
      correo: joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }).required().messages({
        'string.email': 'El campo correo debe ser un correo electrónico válido',
        'string.empty': 'El campo correo no puede estar vacío',
        'any.required': 'El campo correo es obligatorio'
      }),
      celular: joi.string().required().messages({
        'string.empty': 'El campo celular no puede estar vacío',
        'any.required': 'El campo celular es obligatorio'
      }),
      password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).messages({
        'string.pattern.base': 'El campo password debe contener entre 3 y 30 caracteres alfanuméricos',
        'string.empty': 'El campo password no puede estar vacío',
      }),
});

let actualizarCliente = joi.object({
  nombre: joi.string().required(),
  dni: joi.string().required(),
  oficina: joi.string().required(),
  correo: joi.string().required(),
  celular: joi.string().required(),
});

module.exports = { crearCliente, actualizarCliente };
