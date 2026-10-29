import { LogInForm } from "@/features/auth/Login/Login-form";

const LoginPage = () => {
  return (
    <div className="mt-[50px] max-w-[450px] mx-auto">
      <LogInForm mode="login" />
    </div>
  );
};

export default LoginPage;
