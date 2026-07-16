import React from 'react';

export const Form: React.FC<any> = (props) => (
  <form {...props} />
);

export const FormField: React.FC<any> = (props) => (
  <div {...props} />
);

export const FormItem: React.FC<any> = (props) => (
  <div {...props} />
);

export const FormLabel: React.FC<any> = (props) => (
  <label {...props} />
);

export const FormMessage: React.FC<any> = (props) => (
  <span {...props} />
);

export const FormControl: React.FC<any> = (props) => (
  <div {...props} />
);

export const FormDescription: React.FC<any> = (props) => (
  <span {...props} />
);

export const useFormField = () => ({
  id: '',
  name: '',
  formItemId: '',
  formDescriptionId: '',
  formMessageId: '',
});
