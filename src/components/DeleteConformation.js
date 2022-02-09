import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

//components
import AppButton from './AppButton';
import { TopLoader } from './Loader';
import { FormItem, Text } from './CustomFormItem';

function DeleteConformation(props) {
   const { msg, ico, label, del, cancel, f_error, loader, name } = props;
   const formik = useFormik({
      initialValues: {
         [name]: '',
      },
      validationSchema: yup.object({
         [name]: yup.number().required(f_error),
      }),
      onSubmit: (formData) => {
         del(formData, formik);
      },
      enableReinitialize: true,
   });
   return (
      <form onSubmit={formik.handleSubmit} autoComplete='off' className='app-delete-conf'>
         <TopLoader state={loader} />
         <div className='app-del-icon'>
            <ion-icon name={ico}></ion-icon>
         </div>
         <div className='app-del-msg'>
            <span>{msg}</span>
         </div>

         <div className='app-del-input'>
            <FormItem label={label} message={formik.errors.id}>
               <Text cls='w-100' name={name} value={formik.values[name]} change={formik.handleChange} />
            </FormItem>
         </div>
         <div className='app-del-action'>
            <AppButton text='CANCEL' cls='btn-primary' click={cancel} />
            <AppButton text='DELETE' cls='btn-danger' click={del} type='submit' />
         </div>
      </form>
   );
}

DeleteConformation.defaultProps = {
   msg: '',
   ico: 'trash-outline',
   label: 'Ender Id',
   del: (e) => {},
   cancel: (e) => {},
   f_error: 'Id is required',
   loader: { active: false },
   name: 'id',
};

export { DeleteConformation };
