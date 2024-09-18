import axios from 'axios'

import { SnackData } from '../interfaces/SnackData'
import { Snack } from '../contexts/CartContext'
import { CustomerData } from '../interfaces/CustomerData'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

export const getLingerie = () => api.get<SnackData[]>('/coisado?name_icon=lingerie')
export const getAcessorios = () => api.get<SnackData[]>('/coisado?name_icon=acessórios')
export const getCosmeticos = () => api.get<SnackData[]>('/coisado?name_icon=cosmeticos')
export const getBrincadeiras = () => api.get<SnackData[]>('/coisado?name_icon=brincadeiras')
export const processCheckout = (cart: Snack[], customer: CustomerData) => {
  // Verifica se o método de pagamento é "CREDIT_CARD"
  const paymentData = customer.method === 'CREDIT_CARD' 
    ? {
        creditCardNumber: customer.creditCardNumber,
        creditCardHolder: customer.creditCardHolder,
        creditCardExpiration: `${new Date(customer.creditCardExpiration).getMonth() + 1}/${new Date(customer.creditCardExpiration).getFullYear()}`,
        creditCardSecurityCode: customer.creditCardSecurityCode,
      }
    : {}; // Se for "PIX", envia um objeto vazio para os dados do cartão

  return api.post("/checkout", {
    cart,
    customer: {
      fullName: customer.fullName,          
      email: customer.email, 
      mobile: customer.mobile,  
      document:  customer.document,          
      zipCode: customer.zipCode,           
      street: customer.street,
      number: customer.number,
      complement: customer.complement,
      neighborhood: customer.neighborhood,
      city: customer.city,
      state: customer.state,
      method: customer.method, // método de pagamento
    },
    payment: paymentData, // Dados do pagamento são enviados aqui, mas apenas se for "CREDIT_CARD"
  });
}

export default api
