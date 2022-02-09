import { FilterItem } from './Filter';
function Table(props) {
   return (
      <div className='table-responsive app-table'>
         <table className='table'>{props.children}</table>
      </div>
   );
}

function TableHead(props) {
   const { head, filter } = props;

   return (
      <thead>
         <tr>
            {head.split(',').map((v, i) => {
               //let filterObj = filter[v.toLowerCase().replace(/\s/g, '_')];

               return (
                  <th key={i}>
                     <div className='th'>
                        {/*
                        
                        {filter && filterObj ? <TableFilter type={filterObj.type} value={filterObj.value} change={filterObj.change} /> : ''}
                        */}
                        <span>{v}</span>
                     </div>
                  </th>
               );
            })}
         </tr>
      </thead>
   );
}
function TableFilter(props) {
   const { type, change, value } = props;
   switch (type) {
      case 'text':
         return <input type='text' class='form-control table-filter' onChange={change} value={value} />;
      case 'select':
         return (
            <select class='form-select table-filter' value={value} onChange={change}>
               <option value=''>--- select one ---</option>
            </select>
         );
      case 'date':
         return <input type='date' class='form-control  table-filter' onChange={change} />;
      default:
         return <input type='text' class='form-control table-filter' onChange={change} value={value} />;
   }
}
function TableBody(props) {
   return <tbody>{props.children}</tbody>;
}
function TableRaw(props) {
   const { cls } = props;
   return <tr className={cls}>{props.children}</tr>;
}

function TableData(props) {
   return (
      <td>
         <div className='td'>{props.children}</div>
      </td>
   );
}

TableFilter.defaultProps = {
   type: 'text',
   change: (e) => {},
   value: '',
};
TableRaw.defaultProps = {
   style: {},
};
export { Table, TableHead, TableRaw, TableBody, TableData };
