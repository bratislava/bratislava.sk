// form params:
// steps
// validation for steps (state, formRef) => boolean

export const steps = [
  {
    schema: {
      title: 'Data',
      description: 'Example schema',
      type: 'object',
      required: ['address', 'name', 'birthDate', 'postalCode', 'city', 'email', 'phone'],
      properties: {
        firstName: {
          type: 'string',
        },
        lastName: {
          type: 'string',
        },
        birthDate: {
          type: 'string',
        },
        newTaxpayer: {
          type: 'boolean',
        },
        address: {
          type: 'string',
        },
        postalCode: {
          type: 'string',
        },
        city: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        phone: {
          type: 'string',
        },
      },
    },
  },
  {
    title: 'Data',
    description: 'Example schema',
    type: 'object',
    required: ['address', 'otp'],
    properties: {
      otp: {
        type: 'string',
      },
    },
  },
]
