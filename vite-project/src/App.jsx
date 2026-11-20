import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LayoutAdmin from "./admin/layoutadmin";

import Layout from "./layout";
import Home from "./home";
import Dashboard from "./admin/Dashboard";
import Showuser from "./admin/showuser";
import Adduser from "./admin/Adduser";
import Edituser from "./admin/edituser";
import ShowRoom from "./admin/showroom";
import AddRoom from "./admin/Addroom";
import Editroom from "./admin/editroom";
import Login from "./login";
import ProtectedRoute from "./ProtectedRoute";
import Signin from "../signin";
import Rooms from "./room";
import RoomDetail from "./detail_page";
import Booking from "./booking";

function App() {
  return (
    <BrowserRouter>
      <Routes>

  <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route index element={<Home></Home>} />
                    <Route path="rooms" element={<Rooms></Rooms>} />
                    <Route path="room/:id" element={<RoomDetail />} />
                    <Route path="bookroom/:id" element={<Booking />} />
        </Route>

        {/* Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "manager", "receptionist", "housekeeping"]} />}>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<Dashboard />} />
           <Route path="users" element={<Showuser />} />
             <Route path="Adduser" element={ <Adduser/>} />
          <Route path="edituser/:id" element={<Edituser />} />
            <Route path="rooms" element={<ShowRoom />} />
              <Route path="addroom" element={<AddRoom />} />
                 <Route path="editroom/:id" element={<Editroom />} />
        </Route>
</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
