import Pagination from 'react-js-pagination';

function AppPagination(props) {
   const { change, tot, per, active } = props;
   return (
      <div className='d-flex justify-content-center align-items-center p-3'>
         <div className='app-pagination'>
            <Pagination itemClass='page-item' linkClass='page-link' activePage={active} itemsCountPerPage={per} totalItemsCount={tot} onChange={change} firstPageText='First' lastPageText='Last' />
         </div>
      </div>
   );
}

AppPagination.defaultProps = {
   change: (page) => {},
};
export { AppPagination };
