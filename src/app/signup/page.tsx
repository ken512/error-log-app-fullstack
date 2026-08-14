import { SignUpForm } from "@/features/auth/signup/Signup-form";

const SignUpPage = () => {
  return (
      <div className="mt-[50px] max-w-[450px] mx-auto">
        <SignUpForm mode="signup" />
      </div>
  );
};

export default SignUpPage;
