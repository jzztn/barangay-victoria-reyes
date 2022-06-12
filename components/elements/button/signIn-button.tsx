import { signIn } from "next-auth/react"

const SignInButton = () => {
  return (
    <div className="grid justify-center hover:-translate-y-1 transition-all duration-300">
      <button onClick={() => signIn("google")} className="shadow-md shadow-gray/40 text-primary py-2 px-5 md:px-7 tracking-wider text-sm rounded-md flex items-center gap-3 cursor-pointer transition-all duration-500">
        <h1>Sign In with Google Account</h1>
        <img src="\images\google.png" alt="Google Icon" className="w-4 h-4" />
      </button>
    </div>
  )
}

export default SignInButton
