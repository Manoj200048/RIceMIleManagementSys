// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from '../Header/Header';

// function Dashboard() {
//   const [totalCount, setTotalCount] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [totalWeight, setTotalWeight] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch total count
//         const countResponse = await axios.get('http://localhost:5000/varieties');
//         setTotalCount(countResponse.data.totalCount);

//         // Fetch total price
//         const priceResponse = await axios.get('http://localhost:5000/paddy/totalPrice');
//         setTotalPrice(priceResponse.data.totalPrice);

//         // Fetch total price
//         const weightResponse = await axios.get('http://localhost:5000/paddy/totalWeight');
//         setTotalWeight(weightResponse.data.totalWeight);

//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <Header/>
//       <h1>Dashboard</h1>
//       <p>Total Varieties: {totalCount}</p>
//       <p>Total Price: {totalPrice}</p>
//       <p>Total Weight: {totalWeight}</p>
//     </div>
//   );
// }

// export default Dashboard;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Grid, Paper, CircularProgress, IconButton } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from '../Header/Header';
import RefreshIcon from '@mui/icons-material/Refresh';

function Dashboard() {
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch total count
      const countResponse = await axios.get('http://localhost:5000/varieties');
      setTotalCount(countResponse.data.totalCount);

      // Fetch total price
      const priceResponse = await axios.get('http://localhost:5000/paddy/totalPrice');
      setTotalPrice(priceResponse.data.totalPrice);

      // Fetch total weight
      const weightResponse = await axios.get('http://localhost:5000/paddy/totalWeight');
      setTotalWeight(weightResponse.data.totalWeight);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
              Dashboard
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Varieties: {totalCount}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Price: {totalPrice}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total Weight: {totalWeight}
            </Typography>
            <IconButton color="primary" onClick={fetchData}>
              <RefreshIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography variant="h6" gutterBottom>
              Sales Overview
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;

// Dummy sales data for the chart
const salesData = [
  { month: 'Jan', sales: 2000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 4000 },
  { month: 'Apr', sales: 3500 },
  { month: 'May', sales: 5000 },
  { month: 'Jun', sales: 6000 },
];

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Typography, Grid, Paper, CircularProgress, IconButton } from '@mui/material';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import Header from '../Header/Header';
// import RefreshIcon from '@mui/icons-material/Refresh';

// function Dashboard() {
//   const [totalCount, setTotalCount] = useState(0);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [totalWeight, setTotalWeight] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [paddyData, setPaddyData] = useState([]);

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       // Fetch total count
//       const countResponse = await axios.get('http://localhost:5000/varieties');
//       setTotalCount(countResponse.data.totalCount);

//       // Fetch total price
//       const priceResponse = await axios.get('http://localhost:5000/paddy/totalPrice');
//       setTotalPrice(priceResponse.data.totalPrice);

//       // Fetch total weight
//       const weightResponse = await axios.get('http://localhost:5000/paddy/totalWeight');
//       setTotalWeight(weightResponse.data.totalWeight);

//       // Fetch paddy data for the chart
//       const paddyResponse = await axios.get('http://localhost:5000/paddy');
//       setPaddyData(transformData(paddyResponse.data.paddy));
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Function to transform paddy data into chart-compatible format
//   const transformData = (paddyData) => {
//     const monthlyData = {};

//     // Initialize monthly data
//     for (let i = 1; i <= 12; i++) {
//       monthlyData[i] = { month: i, weight: 0 };
//     }

//     // Aggregate paddy weight by month
//     paddyData.forEach((paddy) => {
//       const month = new Date(paddy.pDate).getMonth() + 1;
//       monthlyData[month].weight += paddy.weight;
//     });

//     // Convert monthly data object to array
//     return Object.values(monthlyData);
//   };

//   return (
//     <div>
//       <Header />
//       <Grid container spacing={3} justifyContent="center" alignItems="center">
//         <Grid item xs={12} sm={6}>
//           <Paper elevation={3} style={{ padding: 20 }}>
//             <Typography variant="h4" gutterBottom>
//               Dashboard
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Total Varieties: {totalCount}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Total Price: {totalPrice}
//             </Typography>
//             <Typography variant="body1" gutterBottom>
//               Total Weight: {totalWeight}
//             </Typography>
//             <IconButton color="primary" onClick={fetchData}>
//               <RefreshIcon />
//             </IconButton>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Paper elevation={3} style={{ padding: 20 }}>
//             <Typography variant="h6" gutterBottom>
//               Paddy Weight Overview
//             </Typography>
//             {loading ? (
//               <CircularProgress />
//             ) : (
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={paddyData}>
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="weight" fill="#8884d8" />
//                 </BarChart>
//               </ResponsiveContainer>
//             )}
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default Dashboard;

