export const formatAmount = (number) => {
  const formattedAmount = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  })

  return formattedAmount.format(number)
}

export const formatDate = (date) => {
  const convertDate = date.seconds * 1000 + date.nanoseconds / 1000000
  const dueDate = new Date(convertDate)
  //const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const formatedDate = new Intl.DateTimeFormat('en-GB', options).format(dueDate)

  return formatedDate
}

export const formatStringDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  const formatedDate = new Intl.DateTimeFormat('en-GB', options).format(
    new Date(date)
  )
  return formatedDate
}
