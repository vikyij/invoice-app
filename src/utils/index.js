export const formatAmount = (number) => {
  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  })

  return formattedAmount.format(number)
}

export const formatDate = (date) => {
  const dueDate = new Date(date)
  //const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const formatedDate = new Intl.DateTimeFormat('en-GB', options).format(dueDate)

  return formatedDate
}
