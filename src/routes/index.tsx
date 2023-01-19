import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";

export function RoutesMain(){
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="*" element={<Navigate to={'/'}/>}/>
    </Routes>
  )
}