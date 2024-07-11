import React from "react";
import Main from "./Components/it22324788/main/Main";
import { Route, Routes } from "react-router";
import ViewRice from "./Components/it22324788/viewStockLevels/viewRice/ViewRice";

import RiceVarieties from "./Components/it22324788/viewStockLevels/RiceVarieties/RiceVarieties";
import ViewPaddy from "./Components/it22324788/viewStockLevels/viewPaddy/ViewPaddy";
import AddRice from "./Components/it22324788/viewStockLevels/RiceVarieties/AddRiceV";
import UpdateRiceV from "./Components/it22324788/viewStockLevels/RiceVarieties/UpdateVariety";
import UpdatePaddy from './Components/it22324788/viewStockLevels/viewPaddy/UpdatePaddy';
import Dashboard from './Components/it22324788/Dashboard/Dashboard';

import ManageLocation from './Components/it22324788/locations/ManageLoc';
import AddLocation from "./Components/it22324788/locations/AddLocation";
import UpdateLocation from "./Components/it22324788/locations/UpdateLocation";

import GenerateReports from "./Components/it22324788/Reports/Reports";

import WorkersHome from "./Components/it22324788/Workers/Home/wHome";
import AddPaddy from "./Components/it22324788/Workers/Paddy/AddPaddy";

import Instructions from "./Components/it22324788/instructions/Instructions";
import WorkerInstructions from "./Components/it22324788/Workers/Instructions/wInstructions";
import Wdamages from "./Components/it22324788/Workers/damages/Damages";








































import HomeYevin from "./Components/it22324788/Dashboard/Dashboard";
import HomeTharaka from "./Components/it22319524/Page/Home";
import HomeManoj from "./Components/it22901712/Home/Home";
import HomeNalinda from "./Components/it22331786/HomeMainN/HomeMainN";
import HomeChathumin from "./Components/it22324788/Home/Home";
import HomeSenuri from "./Components/it22324788/Home/Home";

//tharaka
import Addproduct from "./Components/it22319524/Page/Addproduct";
import Product from "./Components/it22319524/Page/Product";
import Deleteproduct from "./Components/it22319524/Page/Deleteproduct";
import Reports from "./Components/it22319524/Page/Product";
import Sales from "./Components/it22319524/Page/Sales";














































//manoj
import Users from './Components/it22901712/UserDetails/Users';
import AddUser from './Components/it22901712/AddUser/AddUser';
import Update from './Components/it22901712/Update/Update';
import AddUser1 from './Components/it22901712/AddUser/AddUser1';
import Users1 from './Components/it22901712/UserDetails/Users1';
import Update1 from './Components/it22901712/Update/Update1';
import Users2 from './Components/it22901712/UserDetails/Users2';




































//nalinda
import Home from './Components/it22331786/Home/Home';
import EUsers from './Components/it22331786/UserDetails/EUsers';
import EaddUser from './Components/it22331786/EaddUser/EaddUser';
import EUpdate from './Components/it22331786/EUpdate/EUpdate';
import SalaryUsers from './Components/it22331786/UserDetails/SalaryUsers';
import SalaryaddUser from './Components/it22331786/EaddUser/SalaryAddUser';
import SalaryUpdate from './Components/it22331786/EUpdate/SalaryUpdate';
import EmLogin from './Components/it22331786/emlogin/emlogin'
import { EmAuthProvider } from "./Components/it22331786/contexts/EmAuthContext";
import Empro from "./Components/it22331786/User/Empro";
import HomeMain from "./Components/it22331786/HomeMainN/HomeMainN";


















































//chathuminn


























































































//senuri





























































function App() {
  return (
    <div>
      <React.Fragment>
        <EmAuthProvider>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/yevin" element={<HomeYevin />} />
          <Route path="/tharaka" element={<HomeTharaka />} />
          <Route path="/manoj" element={<HomeManoj />} />
          <Route path="/nalinda" element={<HomeNalinda />} />
          <Route path="/chathumin" element={<HomeChathumin />} />
          <Route path="/senuri" element={<HomeSenuri />} />




          <Route path="/manageLocation" element={<ManageLocation/>} />
          <Route path="/addLocation" element={<AddLocation/>} />
          <Route path="/manageLocation/:id" element={<UpdateLocation />} />{/*update location */}

          
          <Route path="/viewRice" element={<ViewRice />} />
          
          <Route path="/riceVarieties" element={<RiceVarieties />} />
          <Route path="/add-rice" element={<AddRice />} />
          <Route path="/riceVarieties/:id" element={<UpdateRiceV />} />{/*update rice variety */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/viewPaddy" element={<ViewPaddy />} />
          <Route path="/viewPaddy/:id" element={<UpdatePaddy />} />update paddy

          <Route path="/genReports" element= {<GenerateReports/>} />

          <Route path="/wHome" element={<WorkersHome/>}/>
          <Route path="/addPaddy" element={<AddPaddy/>}/>
          <Route path="/wInstructions" element={<WorkerInstructions/>}/>
          <Route path="/wdamages" element={<Wdamages/>}/>
          <Route path="/instructions" element={<Instructions/>}/>





































          {/* Tharaka */}
          <Route path='/tharaka' element={<HomeTharaka />} />
          <Route path='/product' element={<Product />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/sales' element={<Sales />} />
          <Route path='/addproduct' element={<Addproduct />} />
          <Route path='/deleteproduct' element={<Deleteproduct />} />
















































          {/* manoj */}
          
          <Route path="/mainHome" element={<HomeManoj />} />
          <Route path="/create" element={<Users />} />
          <Route path='/add' element={<AddUser/>}/>
          <Route path="/create/:id" element={<Update />} />
          <Route path='/add1' element={<AddUser1/>}/>
          <Route path="/create1" element={<Users1 />} />
          <Route path="/create1/:id" element={<Update1 />} />
          <Route path="/create2" element={<Users2 />} />

















































          {/* nalinda */}
          <Route path='/' element={<HomeMain/>} />
          <Route path="/mainHomej" element={<Home />} />
          <Route path="/ecreate" element={<EUsers />} />
          <Route path='/eadd' element={<EaddUser />} />
          <Route path="/ecreate/:id" element={<EUpdate />} />
          <Route path="/screate" element={<SalaryUsers />} />
          <Route path='/sadd' element={<SalaryaddUser />} />
          <Route path="/screate/:id" element={<SalaryUpdate />} />
          <Route path="/emlogin" element={<EmLogin />} />
          <Route path="/empro" element={<Empro />} />
          <Route path="/empro/:id" element={<Empro />} />











































          {/* chathumin */}



















































































          {/* senuri */}
          



          























































        </Routes>
        </EmAuthProvider>
      </React.Fragment>
    </div>
  );
}

export default App;

