import { SignInForm } from "@/features/auth/login/Login-form";

const LoginPage = () => {
  return (
    <div className="mt-[50px] max-w-[450px] mx-auto">
      <SignInForm mode="login" />
    </div>
  );
};

export default LoginPage;
