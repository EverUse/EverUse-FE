// FORM COMPONENT //

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SUBMIT_REQUEST } from "../api";
import { camelToPascalCase } from '../helperFunctions'  
import CheckoutError from "./CheckoutError";
import '../styles/_Form.scss';

const validator = require("email-validator");

const Form = ({ shoppingBag, totalPrice, emptyShoppingBag, updateSuccessMessage }) => {
  
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [comments, setComments] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const [postRequest, { error }] = useMutation(SUBMIT_REQUEST);
  
  const navigate = useNavigate();

  const submitRequest = (e) => {
    e.preventDefault()
    if (!validator.validate(email)) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
    if (!firstName) {
      setFirstNameError(true)
    } else {
      setFirstNameError(false)
    }
    if (!lastName) {
      setLastNameError(true)
    } else {
      setLastNameError(false)
    }
    if (validator.validate(email) && firstName && lastName) {
      const newRequest = {}
      newRequest.email = email
      newRequest.customer = `${firstName[0].toUpperCase() + firstName.slice(1)} ${lastName[0].toUpperCase() + lastName.slice(1)}`
      newRequest.comment = comments
      newRequest.total = parseFloat(totalPrice)
      newRequest.products = shoppingBag.map(item => {
        return {
          name: camelToPascalCase(item.type),
          color: camelToPascalCase(item.color),
          size: item.size,
          quantity: parseInt(item.quantity)
        }
      });
      postRequest({
          variables: {
            input: newRequest
          }
        })
        .then(res => {
          if (!error) {
          updateSuccessMessage(res)
          emptyShoppingBag()
          navigate('/')
          }
        })
        .catch(error => console.error)
    }
  };

  return (
  <>
  {error && <CheckoutError/>}
  {!error &&
      <form className='checkout__form' onSubmit={(e) => submitRequest(e)}>
        <h2>Customer Info</h2>
        <label htmlFor='checkout__form__email'>Email Address</label>
        <input name='checkout__form__email' id='checkout__form__email' type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
        {emailError && <p className='checkout__form__fielderror'>* Please enter a valid email address</p>}
        <label htmlFor='checkout__form__firstname'>First Name</label>
        <input name='checkout__form__firstname' id='checkout__form__firstname' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        {firstNameError && <p className='checkout__form__fielderror'>* Please enter your first name</p>}
        <label htmlFor='checkout__form__lastname'>Last Name</label>
        <input name='checkout__form__lastname' id='checkout__form__lastname' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        {lastNameError && <p className='checkout__form__fielderror'>* Please enter your last name</p>}
        <label htmlFor='checkout__form__comments'>Comments/Questions/Concerns</label>
        <textarea name='checkout__form__comments' id='checkout__form__comments' className='checkout__form__comments' value={comments} onChange={(e) => setComments(e.target.value)}/>
        <button className='checkout__form__submit'>Submit</button>
      </form>}
  </>
  )
};

export default Form;