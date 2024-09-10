import SignUp from "../components/usuarios/SignUp"


const SignUpPage = () => {
  

  return (
    <div className="bg-zinc-900 h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl text-cyan-400 text-center mb-6">Trainer App</h1>
      <div className="flex flex-col bg-zinc-800 p-6 rounded-lg shadow-lg">
        <SignUp/>
      </div>
    </div>

  )
}

export default SignUpPage