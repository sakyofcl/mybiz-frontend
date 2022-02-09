import { Form } from 'react-bootstrap';
function FormItem(props) {
   const { label, message, children } = props;
   return (
      <Form.Group className='mb-3 custom-form-group'>
         <Form.Label>{label}</Form.Label>
         <div className='form-group-item'>{children}</div>

         <Form.Text className='text-muted error'>{message}</Form.Text>
      </Form.Group>
   );
}

function Text(props) {
   const { type, value, change, placeholder, name, blur, af, cls } = props;
   return <Form.Control className={cls} type={type} name={name} value={value} onChange={change} placeholder={placeholder} onBlur={blur} autoFocus={af} />;
}
function InputDate(props) {
   const { type, value } = props;
   return <input className='form-control' type={type} value={value} />;
}
function Select(props) {
   const { render, name, value, change } = props;
   return (
      <Form.Select aria-label='Default select example' name={name} value={value} onChange={change}>
         <Option v='' t='select one' />
         {render ? render() : ''}
      </Form.Select>
   );
}
function DatePicker(props) {
   const { value, name, change } = props;
   return <input className='form-control' name={name} type='date' value={value} onChange={change} />;
}
function Option(props) {
   const { v, t, selected } = props;
   return (
      <option value={v} defaultValue={selected ? v : ''}>
         {t}
      </option>
   );
}
FormItem.defaultProps = {
   label: '',
   message: '',
};
Text.defaultProps = {
   type: 'text',
   change: (e) => {},
   name: '',
   blur: (e) => {},
   af: false,
   cls: '',
};

DatePicker.defaultProps = {
   value: new Date().toISOString().substring(0, 10),
   change: (e) => {},
   name: '',
};

InputDate.defaultProps = {
   type: 'date',
};
Option.defaultProps = {
   selected: false,
};
export { FormItem, Text, Option, Select, InputDate, DatePicker };
