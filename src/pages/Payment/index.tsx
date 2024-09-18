import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { IMaskInput } from 'react-imask'

import { CustomerData } from '../../interfaces/CustomerData'

import { Head } from '../../components/Head'
import { PayOrder } from '../../components/OrderCloseAction/PayOrder'
import { OrderHeader } from '../../components/OrderHeader'

import { useCart } from '../../hooks/useCart'

import { FieldValues, schema } from './validationSchema'

import IMask from 'imask'
import { Container, Form, Inner } from './styles'
import { useState } from 'react'

export default function Payment() {
  const { payOrder } = useCart()
  const [payment, setPayment] = useState("")

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(schema)
  })
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    payOrder(data as CustomerData)
  } 
  

  return (
    <Container>
      <Head title='Pagamento' />
      <OrderHeader />
      <Inner>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h4>Informações pessoais</h4>

          <div className='field'>
            <label htmlFor='fullName'>Nome e sobrenome</label>
            <input type='text' id='fullName' autoComplete='name' {...register("fullName")} />
            {errors.fullName && <p className='error'>{errors.fullName.message}</p>}
          </div>

          <div className='grouped'>
            <div className='field'>
              <label htmlFor='email'>E-mail</label>
              <input type='email' id='email' autoComplete='email' {...register("email")}/>
              {errors.email && <p className='error'>{errors.email.message}</p>}
            </div>

            <div className='field'>
              <label htmlFor='mobile'>Celular</label>
              <Controller
                name="mobile"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <IMaskInput
                    {...field}
                    type="tel"
                    id="mobile"
                    autoComplete="phone"
                    mask="(00) 90000-0000"
                    onAccept={(value: any) => field.onChange(value)}
                  />
                )}
              />
              {errors.mobile && <p className='error'>{errors.mobile.message}</p>}
            </div>

            <div className='field'>
              <label htmlFor='document'>CPF/CNPJ</label>
              <Controller
                name='document'
                control={control}
                defaultValue=''
                render={({ field}) => (
                  <IMaskInput
                    {...field}
                    type='text'
                    id='document'
                    mask={[
                      { mask: '000.000.000-00', maxLength: 11 },
                      { mask: '00.000.000/0000-00' },
                    ]}
                    onAccept={(value: any) => field.onChange(value)}
                  />
                )}
              />
              {errors.document && <p className='error'>{errors.document.message}</p>}
            </div>
          </div>

          <h4>Endereço de entrega</h4>

          <div className='field'>
            <label htmlFor='zipCode'>CEP</label>
            <Controller
                name='zipCode'
                control={control}
                defaultValue=''
                render={({ field}) => (
                  <IMaskInput
                    type='text'
                    id='zipCode'
                    style={{ width: '120px' }}
                    mask={'00000-000'}
                    onAccept={(value: any)  => field.onChange(value)}
                  />
                )}
              />
            {errors.zipCode && <p className='error'>{errors.zipCode.message}</p>}
          </div>

          <div className='field'>
            <label htmlFor='street'>Endereço</label>
            <input type='text' id='street' {...register("street")}/>
            {errors.street && <p className='error'>{errors.street.message}</p>}
          </div>

          <div className='grouped'>
            <div className='field'>
              <label htmlFor='number'>Número</label>
              <input type='text' id='number' {...register("number")}/>
              {errors.number && <p className='error'>{errors.number.message}</p>}
            </div>

            <div className='field'>
              <label htmlFor='complement'>Complemento</label>
              <input type='text' id='complement'  {...register("complement")}/>
              {errors.complement && <p className='error'>{errors.complement.message}</p>}
            </div>
          </div>

          <div className='grouped'>
            <div className='field'>
              <label htmlFor='neighborhood'>Bairro</label>
              <input type='text' id='neighborhood' {...register("neighborhood")}/>
              {errors.neighborhood && <p className='error'>{errors.neighborhood.message}</p>}
            </div>

            <div className='field'>
              <label htmlFor='city'>Cidade</label>
                <input type='text' id='city' {...register("city")} />
              {errors.city && <p className='error'>{errors.city.message}</p>}
            </div>

            <div className='field'>
              <label htmlFor='state'>Estado</label>
                  <select id='state' {...register("state")} >
                    <option value=''>Selecione</option>
                    <option value='AC'>Acre</option>
                    <option value='AL'>Alagoas</option>
                    <option value='AP'>Amapá</option>
                    <option value='AM'>Amazonas</option>
                    <option value='BA'>Bahia</option>
                    <option value='CE'>Ceará</option>
                    <option value='ES'>Espírito Santo</option>
                    <option value='GO'>Goiás</option>
                    <option value='MA'>Maranhão</option>
                    <option value='MT'>Mato Grosso</option>
                    <option value='MS'>Mato Grosso do Sul</option>
                    <option value='MG'>Minas Gerais</option>
                    <option value='PA'>Pará</option>
                    <option value='PB'>Paraíba</option>
                    <option value='PR'>Paraná</option>
                    <option value='PE'>Pernambuco</option>
                    <option value='PI'>Piauí</option>
                    <option value='RJ'>Rio de Janeiro</option>
                    <option value='RN'>Rio Grande do Norte</option>
                    <option value='RS'>Rio Grande do Sul</option>
                    <option value='RO'>Rondônia</option>
                    <option value='RR'>Roraima</option>
                    <option value='SC'>Santa Catarina</option>
                    <option value='SP'>São Paulo</option>
                    <option value='SE'>Sergipe</option>
                    <option value='TO'>Tocantins</option>
                    <option value='DF'>Distrito Federal</option>
                  </select>
              {errors.state && <p className='error'>{errors.state.message}</p>}
            </div>
          </div>

          <h4>Pagamento</h4>
          <div className='field'>
            <label htmlFor='creditCardNumber'>Metodo de pagamento</label>
                <select
                  id="method"
                  {...register("method")}
                  onChange={(e) => setPayment(e.target.value)}
                >
                  <option value="">Selecione ...</option>
                  <option value="CREDIT_CARD">Cartão de crédito</option>
                  <option value="PIX">Pix</option>
                </select>
            {errors.method && <p className='error'>{errors.method.message}</p>}
          </div>
        {payment === "CREDIT_CARD" &&
          (<>
         <div className='field'>
            <label htmlFor='creditCardNumber'>Número do cartão</label>
            <Controller
                name='creditCardNumber'
                control={control}
                defaultValue=''
                render={({ field}) => (
                  <IMaskInput
                    {...field}
                    type='text'
                    id='creditCardNumber'
                    mask={[
                      {
                        mask: '0000 000000 0000',
                        maxLength: 14,
                      },
                      {
                        mask: '0000 000000 00000',
                        maxLength: 15,
                      },
                      {
                        mask: '0000 0000 0000 0000',
                      },
                    ]}
                  />

                )}/>
            {errors.creditCardNumber && <p className='error'>{errors.creditCardNumber.message}</p>}
          </div>

          <div className='field'>
            <label htmlFor='creditCardHolder'>Nome impresso no cartão</label>
            <input type='text' id='creditCardHolder' {...register("creditCardHolder")} />
            {errors.creditCardHolder && <p className='error'>{errors.creditCardHolder.message}</p>}
          </div>

          <div className='grouped'>
            <div className='field'>
              <label htmlFor='creditCardExpiration'>Validade (MM/AA)</label>
              <Controller
                name='creditCardExpiration'
                control={control}
                defaultValue=''
                render={({ field}) => (
                  <IMaskInput
                    {...field}
                    type='text'
                    id='creditCardExpiration'
                    mask={[
                      {
                        mask: 'MM/YY',
                        blocks: {
                          MM: {
                            mask: IMask.MaskedRange,
                            from: 1,
                            to: 12,
                          },
                          YY: {
                            mask: IMask.MaskedRange,
                            from: new Date().getFullYear() - 2000,
                            to: 99,
                          },
                        },
                      },
                    ]}
                    onAccept={(value: any)  => field.onChange(value)}
                  />
                )}/>
              {errors.creditCardExpiration && (
                <p className='error'>{errors.creditCardExpiration.message}</p>
              )}
            </div>

            <div className='field'>
              <label htmlFor='creditCardSecurityCode'>Código de segurança (CVV)</label>
              <Controller
                name='creditCardSecurityCode'
                control={control}
                defaultValue=''
                render={({ field}) => (
                  <IMaskInput {...field}type='text' id='creditCardSecurityCode' mask={'0000'} />
                )}/>
              
              {errors.creditCardSecurityCode && (
                <p className='error'>{errors.creditCardSecurityCode.message}</p>
              )}
            </div>
          </div>
          </>
          )}
          <PayOrder />
        </Form>
      </Inner>
    </Container>
  )
}
