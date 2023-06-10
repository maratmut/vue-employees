import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

// Валидация формы
export const useEmployeeForm = (initialValues, emit) => {
  const { handleSubmit, resetForm } = useForm({ initialValues });

  const { value: name, errorMessage: nErrorMessage } = useField(
    'name',
    yup.string().required('Введите имя'),
  );

  const { value: lastName, errorMessage: lnErrorMessage } = useField(
    'lastName',
    yup.string().required('Введите Фамилию'),
  );

  const { value: experience, errorMessage: expErrorMessage } = useField(
    'experience',
    yup.string().required('Введите стаж работы'),
  );

  const { value: age, errorMessage: ageErrorMessage } = useField(
    'age',
    yup.string().required('Введите возраст'),
  );

  const { value: address, errorMessage: addrErrorMessage } = useField(
    'address',
    yup.string().required('Введите адрес'),
  );

  const oneSubmit = handleSubmit((values) => {
    /* const dataObject = initialValues ? values : { id: Date.now().toString(), ...values }; */
    emit('submit', values);
    resetForm();
  });

  return {
    name,
    nErrorMessage,
    lastName,
    lnErrorMessage,
    experience,
    expErrorMessage,
    oneSubmit,
    age,
    ageErrorMessage,
    address,
    addrErrorMessage,
  };
};
