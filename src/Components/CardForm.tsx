import React, {useState} from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import '../App.css';
import GetCardDetails from './GetCardDetails';
import * as Yup from 'yup';



export interface IFormInputValues {
  cvc: string;
  expiry: string;
  focus: any| null;
  name: string;
  number: string;
  country: string;

}

const validationSchema = Yup.object().shape({
  cvc: Yup.string()
  .required('CVC is required')
  .matches(/^\d{3}$/, 'CVC must be a 3 digit number'),
  number: Yup.string()
  .required('Card number is required')
  .matches(/^\d{16}$/,'Card number must be a 16-digits number'),
  expiry: Yup.string().required('Expiry date is required'),
  name: Yup.string().required('Name is required'),
  country: Yup.string().required('Country is required')
})

const CardForm = () => {

  const [submitForm, setSubmitForm] = useState(true);
  const [formData, setFormData] = useState<IFormInputValues>({
    cvc: '',
    expiry: '',
    focus: null,
    name: '',
    number: '',
    country: '',
  
  });
  const storedFormData = localStorage.getItem('formDataList');
  const [formDataList, setFormDataList] = useState<IFormInputValues[]>(JSON.parse(storedFormData as string) as IFormInputValues[]);
  const [errors, setErrors] = useState<any>({})

 const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      focus: e.target.name,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      await validationSchema.validate(formData,{abortEarly:false});
      setErrors({});
      
    } catch (validationErrors){
      const newErrors: {[key: string]: string} = {};
      if (Yup.ValidationError.isError(validationErrors)){
        validationErrors.inner.forEach((error) => {
          if (error.path){
            newErrors[error.path] = error.message;
          }
        });
      }
      setErrors(newErrors);
    }
    const bannedCountries = [
      'Belarus',
      'Cuba',
      'Eritrea',
      'Iran',
      'North Korea',
      'Syria',
      'Venezuela',
    ];

    if (bannedCountries.includes(formData.country)) {
      setSubmitForm(false);
      alert("Sorry, you have added a card from a banned country. Therefore, your card cannot be added.");
      return
    }

    if (storedFormData) {
      const storedFormDataList = JSON.parse(storedFormData) as IFormInputValues[];
      const cardList = [...storedFormDataList, formData];
      localStorage.setItem('formDataList', JSON.stringify(cardList));
  
      setFormData({ ...formData });
     setFormDataList(prev => prev = cardList)
    } else {
      localStorage.setItem('formDataList', JSON.stringify([formData]));
    }
   
    setFormData({
      cvc: '',
      expiry: '',
      focus: null,
      name: '',
      number: '',
      country: '',
    });
  };
 
  return (
    <div className='App'>
      <Cards
        cvc={formData.cvc}
        expiry={formData.expiry}
        focused={formData.focus}
        name={formData.name}
        number={formData.number}
      />
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={formData.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
         {errors.name && <span className="error-message">{errors.name}</span>}
        <input
          type='tel'
          name='number'
          placeholder='Card Number'
          value={formData.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        {errors.number && <span className="error-message">{errors.number}</span>}
        <input
          type='text'
          name='expiry'
          placeholder='MM/YY expiry'
          value={formData.expiry}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
         {errors.expiry && <span className="error-message">{errors.expiry}</span>}
        <input
          type='tel'
          name='cvc'
          placeholder='CVC'
          value={formData.cvc}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
         {errors.cvc && <span className="error-message">{errors.cvc}</span>}
        <input
          id = 'country'
          type='text'
          name='country'
          placeholder='Country'
          value={formData.country}
          onChange={handleInputChange}
        />
         {errors.country && <span className="error-message">{errors.country}</span>}
         <div className='buttonContainer'>
        <button type='submit' name='submit'>
          SAVE CARD
        </button>
        <GetCardDetails formDataList={formDataList as IFormInputValues[]} />
        </div>
      </form>
      
    </div>
  );
}

export default CardForm;