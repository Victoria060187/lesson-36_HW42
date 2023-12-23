import { useFormik } from 'formik';
import { Fragment } from 'react';
import { string, object, StringSchema } from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { contactAdded } from '../../store/contactsSlice';

import './AddContacts.scss';

type getValidationSchema = {
    name: StringSchema<string | undefined>;
    username: StringSchema<string | undefined>;
    phone: StringSchema<string | undefined>;
  };
  
  interface formElementsConfig {
    defaultValue: string;
    inputType: string;
    labelText: string;
    vSchema: StringSchema<string>;
  }
  

  const formElementsConfiguration: Record<string, formElementsConfig> = {
  name: {
    defaultValue: '',
    inputType: 'text',
    labelText: 'Name: ',
    vSchema: string()
      .matches(/^[\p{L}\s-]+$/u, 'Please enter a valid name containing only alphabetical characters, spaces, and hyphens.')
      .required('Enter your name'),
  },
  username: {
    defaultValue: '',
    inputType: 'text',
    labelText: 'Surname: ',
    vSchema: string()
      .matches(/^[\p{L}\s-]+$/u, 'Please enter a valid name containing only alphabetical characters, spaces, and hyphens.')
      .required('Enter your surname'),
  },
  phone: {
    defaultValue: '',
    inputType: 'text',
    labelText: 'Phone: ',
    vSchema: string()
      .matches(/^\d{10}$/, 'Phone number must contain 10 digits')
      .required('Enter your phone number'),
  },
}

interface InitialValues {
    [key: string]: string;
}

function getInitialValues(): InitialValues {
    let initialValues: InitialValues = {};
    for (let key in formElementsConfiguration) {
      initialValues[key] = formElementsConfiguration[key].defaultValue;
    }
    return initialValues;
  }

function createValidationSchema() {
    let objWithSchemas: Partial<getValidationSchema> = {};
    for (let key in formElementsConfiguration) {
      objWithSchemas[key as keyof getValidationSchema] = formElementsConfiguration[key].vSchema;
    }
    return object(objWithSchemas as getValidationSchema);
  }

export default function AddContact(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: createValidationSchema(),
    onSubmit: (values) => {
      const newContact = {
        ...values,
        id: Date.now(),
      };
      dispatch(contactAdded(newContact));
      navigate('/');
    },
  });

  const handleCancel = () => {
    formik.resetForm(); 
    navigate('/'); 
  };

  const generateFormElements = () => {
    return (
      <>
        {Object.keys(formElementsConfiguration).map((key) => {
        const { labelText, inputType } = formElementsConfiguration[key];
          return (
            <Fragment key={key}>
              <div>
               <label htmlFor={key}>{labelText}</label>
               <input className='input-field' type={inputType} name={key} value={formik.values[key]} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              </div>
          {formik.touched[key] && formik.errors[key] && <div className='error-message'>{formik.errors[key]}</div>}
        </Fragment>
      );
    })};
        <div>
          <input type='submit' className='submit-button' value='Save' disabled={!formik.isValid} />
          <input type='button' className='cancel-button' onClick={handleCancel} value='Cancel' />
        </div>
      </>
    );
  };

  return (
    <div className='container'>
      <form  className='form-container' onSubmit={formik.handleSubmit}>
        {generateFormElements()}
      </form>
    </div>
  )
}