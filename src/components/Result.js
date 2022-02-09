import React from 'react';

function Result(props) {
   const { render, show } = props;
   if (show) {
      return <div className='result-list d-flex flex-column'>{render()}</div>;
   } else {
      return <span></span>;
   }
}

function ResultItem(props) {
   const { dataKey, eve, children } = props;
   return (
      <div className='result-item' data-key={dataKey} onClick={eve} style={{ cursor: 'pointer' }}>
         {children}
      </div>
   );
}

function ResultText(props) {
   const { text } = props;
   return <div className='item-name'>{text}</div>;
}
Result.defaultProps = {
   close: () => {},
   render: () => {},
   show: false,
};
export { Result, ResultItem, ResultText };
