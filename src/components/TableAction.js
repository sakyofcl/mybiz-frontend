function TableActionWrapper(props) {
   return <div className='action-wrapper'>{props.children}</div>;
}
function TableActionBtn(props) {
   const { ico, click, cls, dataKey } = props;
   return (
      <button type='button' class={`btn ${cls ? cls : ''}`} data-key={dataKey} onClick={click}>
         <ion-icon name={ico} data-key={dataKey}></ion-icon>
      </button>
   );
}
TableActionBtn.defaultProps = {
   click: (e) => {},
};

export { TableActionWrapper, TableActionBtn };
