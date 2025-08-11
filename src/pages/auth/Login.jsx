import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLoginMutation } from "../../features/auth/authSlide";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";
import { FaRegEyeSlash } from "react-icons/fa";
import { PiEye } from "react-icons/pi";
import { useState } from "react";
import { useLoginWithGoogle } from "../../components/social-auth/GoogleAuthComponent";
import { useLoginWithFacebook } from "../../components/social-auth/FacebookAuthComponent";
import { useLoginWithGithub } from "../../components/social-auth/GithubAuthComponent";

// import social media image
import FacebookLogo from '../../assets/social-media/facebook.jpg'
import GithubLogo from '../../assets/social-media/github.png'
import GoogleLogo from '../../assets/social-media/google.png'

export default function App() {
  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const navigate = useNavigate();

  // calling those 3 social login
  const { loginWithGoogle, googleLogout } = useLoginWithGoogle();
  const { loginWithFacebook, facebookLogout } = useLoginWithFacebook();
  const { loginWithGithub, gitHubLogout } = useLoginWithGithub();

  console.log(isLoading);

  const shcema = z.object({
    email: z.string().nonempty("email is required").email(),
    password: z.string().nonempty("password is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(shcema),
  });

  const onSubmit = async (data) => {
    try {
      let result = await login(data).unwrap();

      if (result != undefined) {
        navigate("/");
      }
    } catch (errors) {
      toast.error(errors?.data?.message);
      console.log("ERROR: ", errors?.data?.message);
    } finally {
      reset();
    }
  };

  return (
    // <section className="bg-teal-600 w-[100%] h-screen">
    //   <div className="h-screen flex justify-center items-center mx-auto">
    //     <form
    //       onSubmit={handleSubmit(onSubmit)}
    //       className="min-w-sm md:min-w-xl bg-gray-50 p-5 rounded-2xl "
    //     >
    //       <div className="flex flex-col gap-5">
    //         <h1 className="text-3xl text-center py-2 font-bold text-teal-600">
    //           Login
    //         </h1>
    //         <div className="flex flex-col">
    //           <input
    //             {...register("email")}
    //             className="px-2.5 py-2.5 border border-slate-400 rounded-xl"
    //             placeholder="email"
    //             type="text"
    //           />
    //           {errors.email && (
    //             <span className="text-red-600 mt-2">
    //               This field is required
    //             </span>
    //           )}
    //         </div>
    //         <div className="flex flex-col relative">
    //           <div
    //             onClick={() => setIsShowPassword(!isShowPassword)}
    //             className="absolute top-4 right-4"
    //           >
    //             {isShowPassword ? <PiEye /> : <FaRegEyeSlash />}
    //             {/* <PiEye /> */}
    //           </div>
    //           <input
    //             {...register("password")}
    //             className="px-2.5 py-2.5 border border-slate-400 rounded-xl"
    //             type={isShowPassword ? "text" : "password"}
    //             placeholder="Password"
    //           />
    //           {errors.password && (
    //             <span className="text-red-600 mt-2">
    //               This field is required
    //             </span>
    //           )}
    //         </div>
    //         <button
    //           type="submit"
    //           className="bg-teal-600 hover:bg-teal-700 px-5 py-2 rounded-xl text-white"
    //         >
    //           {isLoading ? "Loading..." : "Login"}
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    //   <ToastContainer />
    // </section>
    <div>
      <p className="text-center">Or Login With</p>
      {/* contain social login media */}
      <div className="flex gap-2 items-center w-full justify-center mt-2">
        {/* for google  */}
        <button onClick={loginWithGoogle}>
          <img src={GoogleLogo} alt="gogole provider" width={35} height={35} />
        </button>
        {/* for facebook  */}
        <button onClick={loginWithFacebook}>
          <img
            src={FacebookLogo}
            alt="facebook provider"
            width={30}
            height={30}
          />
        </button>
        {/* for github  */}
        <button onClick={loginWithGithub}>
          <img src={GithubLogo} alt="github provider" width={30} height={30} />
        </button>
      </div>
      {/* logout button */}
      <div className="flex gap-2 items-center w-full justify-center mt-2">
        {/* for google  */}
        <button onClick={googleLogout} className="border rounded-xl p-2">
          <p>Logout With Google</p>
        </button>
        {/* for facebook  */}
        <button onClick={facebookLogout} className="border rounded-xl p-2">
          <p>Logout with Facebook</p>
        </button>
        {/* for github  */}
        <button onClick={gitHubLogout} className="border rounded-xl p-2">
          <p>Logout with Github</p>
        </button>
      </div>
    </div>
  );
}
