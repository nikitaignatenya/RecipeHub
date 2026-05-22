import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const LoginPage = lazy(() => import("../../pages/auth-user/ui/auth-user"));
const RegisterPage = lazy(() => import("../../pages/auth-user/ui/auth-user"));

const PageLoader = () => <div>Loading...</div>;

export const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/user/login" element={<LoginPage />}></Route>
        <Route path="/user/register" element={<RegisterPage />}></Route>
      </Routes>
    </Suspense>
  );
};
