import AppButton from './AppButton';

function Filter(props) {
   const { children, reset, filter } = props;
   return (
      <div className='filter-ui-wrapper'>
         <div className='filter-ui'>
            {children}
            <div className='filter-item flex-row align-items-center'>
               <AppButton ico='filter-sharp' cls='btn-primary mt-0' click={filter} h={30} type='submit' />
               <AppButton ico='sync' cls='btn-danger mt-0' click={reset} h={30} />
            </div>
         </div>
      </div>
   );
}

function FilterItem(props) {
   const { label, type, change, value, render, name } = props;
   return (
      <div className='filter-item'>
         <span>{label}</span>
         <FilterInput type={type} name={name} change={change} value={value} render={render} />
      </div>
   );
}

function FilterInput(props) {
   const { type, change, value, render, name } = props;
   switch (type) {
      case 'text':
         return <input type='text' name={name} class='form-control curve' onChange={change} value={value} />;
      case 'select':
         return (
            <select class='form-select curve' value={value} onChange={change} name={name}>
               <option value=''>--- select one ---</option>
               {render ? render() : ''}
            </select>
         );
      case 'date':
         return <input type='date' class='form-control curve' onChange={change} value={value} name={name} />;
      default:
         return <input type='text' class='form-control' onChange={change} value={value} name={name} />;
   }
}

FilterItem.defaultProps = {
   type: 'text',
   change: (e) => {},
   value: '',
   label: '',
   name: '',
};
Filter.defaultProps = {
   reset: (e) => {},
   filter: (e) => {},
};
export { Filter, FilterItem };
