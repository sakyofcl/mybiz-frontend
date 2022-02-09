import React from 'react';
import { Table, TableHead, TableRaw, TableBody, TableData } from '../../components/AppTable';
import { AppCard, AppCardBody, AppCardFooter, AppCardHead, PanelCard } from '../../components/AppCard';

import { Bar, Pie, Line } from 'react-chartjs-2';
//Logic
import { Head } from '../../logic/Head';

const options = {
   responsive: true,
};

const data = {
   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
   datasets: [
      {
         label: 'Earnings Percentage',
         data: [10, 59, 80, 81, 56, 55, 40, 15, 45, 78, 15, 125],
         backgroundColor: '#e80000',
      },
      {
         label: 'Dataset 2',
         data: [30, 79, 120, 41, 20, 55, 40, 15, 45, 88, 15, 25],
         backgroundColor: '#0099ff',
      },
   ],
};
const lineData = {
   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
   datasets: [
      {
         label: 'Dataset 1',
         data: [10, 52, 14, 45, 456, 52],
         borderColor: 'rgb(255, 99, 132)',
         backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
         label: 'Dataset 1',
         data: [10, 32, 104, 65, 10, 52],
         borderColor: 'green',
         backgroundColor: 'green',
      },
   ],
};
function Dashboard() {
   Head.setTitle('Soft Magic Kalmunai');
   return (
      <div>
         <div className='row m-0 p-0'>
            <div className='col-lg-4 col-md-6 mb-1 p-1'>
               <PanelCard ico='wallet-outline' huge='150.02' title='Total Wallet' hbg='#337ab7' />
            </div>
            <div className='col-lg-4  col-md-6 mb-1 p-1'>
               <PanelCard ico='server-outline' huge='125' title='Total Product' hbg='#337ab7' />
            </div>
            <div className='col-lg-4 col-md-6 mb-1 p-1'>
               <PanelCard ico='cellular-outline' huge='$1500' title='Total Earn' hbg='#337ab7' />
            </div>
            <div className='col-lg-4 col-md-6  mb-1 p-1'>
               <PanelCard ico='card-outline' huge='1500' title='Total Profit' hbg='#337ab7' />
            </div>
            <div className='col-lg-4 col-md-6 mb-1 p-1'>
               <PanelCard ico='cellular-outline' huge='$1500' title='Total Earn' hbg='#337ab7' />
            </div>
            <div className='col-lg-4 col-md-6  mb-1 p-1'>
               <PanelCard ico='card-outline' huge='1500' title='Total Profit' hbg='#337ab7' />
            </div>
         </div>
         <div className='row m-0 p-0'>
            <div className='col-md-6 p-1'>
               <AppCard>
                  <AppCardHead title='Monthly Sales Performance' sub='July,2021' />

                  <AppCardBody>
                     <Bar options={options} data={data} />
                  </AppCardBody>
                  <AppCardFooter></AppCardFooter>
               </AppCard>
            </div>
            <div className='col-md-6 p-1'>
               <AppCard>
                  <AppCardHead title='Monthly Sales Performance' sub='2021/12/10' />

                  <AppCardBody>
                     <Line data={lineData} />
                  </AppCardBody>
                  <AppCardFooter></AppCardFooter>
               </AppCard>
            </div>
         </div>
         <div className='row m-0 p-0'>
            <div className='col-md-6 p-1'>
               <AppCard>
                  <AppCardHead title='Top Selling Product' sub='2021/12/10' />

                  <AppCardBody>
                     <Table>
                        <TableHead head='PID,Name,Sales,Amount' />
                        <TableBody>
                           <TableRaw>
                              <TableData>125</TableData>
                              <TableData>Pepsi</TableData>
                              <TableData>50</TableData>
                              <TableData>Rs 1500.00</TableData>
                           </TableRaw>
                           <TableRaw>
                              <TableData>125</TableData>
                              <TableData>Pepsi</TableData>
                              <TableData>50</TableData>
                              <TableData>Rs 1500.00</TableData>
                           </TableRaw>
                           <TableRaw>
                              <TableData>125</TableData>
                              <TableData>Pepsi</TableData>
                              <TableData>50</TableData>
                              <TableData>Rs 1500.00</TableData>
                           </TableRaw>
                           <TableRaw>
                              <TableData>125</TableData>
                              <TableData>Pepsi</TableData>
                              <TableData>50</TableData>
                              <TableData>Rs 1500.00</TableData>
                           </TableRaw>
                        </TableBody>
                     </Table>
                  </AppCardBody>
                  <AppCardFooter></AppCardFooter>
               </AppCard>
            </div>
            <div className='col-md-6 p-1'>
               <AppCard>
                  <AppCardHead title='Monthly Sales Report' sub='2021/12/10' />

                  <AppCardBody>
                     <Table>
                        <TableHead head='PID,Name,Sales,Amount' />
                        <TableBody>
                           <TableRaw>
                              <TableData>125</TableData>
                              <TableData>Pepsi</TableData>
                              <TableData>50</TableData>
                              <TableData>Rs 1500.00</TableData>
                           </TableRaw>
                           <TableRaw>
                              <TableData>125</TableData>
                              <TableData>Pepsi</TableData>
                              <TableData>50</TableData>
                              <TableData>Rs 1500.00</TableData>
                           </TableRaw>
                           <TableRaw>
                              <TableData>125</TableData>
                              <TableData>Pepsi</TableData>
                              <TableData>50</TableData>
                              <TableData>Rs 1500.00</TableData>
                           </TableRaw>
                           <TableRaw>
                              <TableData>125</TableData>
                              <TableData>Pepsi</TableData>
                              <TableData>50</TableData>
                              <TableData>Rs 1500.00</TableData>
                           </TableRaw>
                        </TableBody>
                     </Table>
                  </AppCardBody>
                  <AppCardFooter></AppCardFooter>
               </AppCard>
            </div>
         </div>
      </div>
   );
}

export default Dashboard;
