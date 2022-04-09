import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InputField from 'components/molecules/InputField/InputField';
import Button from 'components/atoms/Button/Button';
import { MDBIcon } from 'mdb-react-ui-kit';
import { useCurrencies } from 'hooks/useCurrencies';
import { StyledForm, CurrencyItem, CurrencyButton } from './CurrenciesForm.styles';

const CurrenciesForm = () => {
  const { currencies, addCurrency, deleteCurrency, error: currenciesError } = useCurrencies();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(false);

  const handleAddCurrency = () => {
    setError(false);

    const isAdded = addCurrency(getValues('newCurrency'));
    if (!isAdded) {
      setError(true);
    }

    reset();
  };

  return (
    <>
      <div>
        {currencies.map((currency) => (
          <CurrencyItem key={currency}>
            {currency}
            <CurrencyButton onClick={() => deleteCurrency(currency)}>
              <MDBIcon far icon="trash-alt" />
            </CurrencyButton>
          </CurrencyItem>
        ))}
        {currenciesError ? <p>{currenciesError}</p> : null}
      </div>
      <StyledForm autoComplete="off" onSubmit={handleSubmit(handleAddCurrency)}>
        <InputField {...register('newCurrency', { required: true, maxLength: 10 })} label="Currency name" id="addCurrency" type="text" />
        <Button>Add currency</Button>
        {errors.newCurrency ? <span>Minimum 1 letter, maximum length of the currency: 10</span> : null}
        {error ? <span>Currency already exist</span> : null}
      </StyledForm>
    </>
  );
};

export default CurrenciesForm;
