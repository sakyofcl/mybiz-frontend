import Badge from '../../../components/Badge';

function DisplayCustomerStatus(props) {
   const { status } = props;
   let cls = 'bg-success';
   switch (status) {
      case 'blocked':
         cls = 'bg-danger';
         break;
      case 'suspend':
         cls = 'bg-warning';
         break;
      default:
         cls = 'bg-success';
         break;
   }

   return <Badge title={status} cls={cls} />;
}

DisplayCustomerStatus.defaultProps = {
   status: 'active',
};

export default DisplayCustomerStatus;
