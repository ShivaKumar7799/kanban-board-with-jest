import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css'
const Loader = lazy(() => import("./components/Dumb components/Loader"));
const Home = lazy(() => import("./pages/Home"));
const DashBoard = lazy(() => import("./pages/DashBoard"));
const TaskManagement = lazy(() => import("./pages/TaskManagement"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ProtectedRoutes = lazy(() =>
  import("./components/Auth components/ProtectedRoutes")
);
const NoPageFound = lazy(() => import("./pages/NoPageFound"));
function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/dashBoard"
          element={
            <ProtectedRoutes>
              <DashBoard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/taskManagement"
          element={
            <ProtectedRoutes>
              <TaskManagement />
            </ProtectedRoutes>
          }
        />
        <Route path="/*" element={<NoPageFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
