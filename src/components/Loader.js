function TopLoader(props) {
   const {
      state: { active },
      width,
      height,
   } = props;

   return (
      <div className={`top-loader ${active ? 'top-loader-active' : ''}`} style={{ height: height }}>
         <div className='top-loader-box' style={{ width: width }}></div>
      </div>
   );
}

export { TopLoader };

TopLoader.defaultProps = {
   state: {
      active: false,
   },
   width: '40%',
   height: 5,
};
