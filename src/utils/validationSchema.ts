import * as yup from 'yup'

export const InputValidation = yup.object().shape({
  senderStreet: yup.string().required('Enter your street address'),
  senderCity: yup.string().required('Enter your city'),
  senderCountry: yup.string().required('Enter your country'),
  senderPostCode: yup.string().required('Enter your postcode'),
  clientName: yup.string().required("Enter Client's Name"),
  clientEmail: yup.string().required("Enter Client's Email"),
  clientStreet: yup.string().required("Enter Client's street address"),
  clientCity: yup.string().required("Enter Client's city"),
  clientCountry: yup.string().required("Enter Client's country"),
  clientPostCode: yup.string().required("Enter Client's postcode"),
  description: yup.string().required("Enter description"),
  createdAt: yup.date().required('Enter invoice date')
})