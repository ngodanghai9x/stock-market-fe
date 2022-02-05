import { useContext } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { AuthContext } from "../../../context/auth/auth"
import { login } from "../../../lib/utils"
import { LoginPayload } from "../../../services/api-auth.type"
import AuthInput from "./auth-input"

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginPayload>()
  const { setUser, setAuthenticated } = useContext(AuthContext)

  const loginHandle: SubmitHandler<LoginPayload> = async (data) => {
    try {
      const res = await login(data);
      setUser(res.data.user)
      setAuthenticated(true)
      toast(res.message)
    } catch (error: any) {
      console.log(error)
      toast(error.response.data.message)

    }
  }

  return (
    <form onSubmit={handleSubmit(loginHandle)} className="w-ful" >
      <div className="group flex flex-col mb-8">
        <AuthInput label="User name" {...register('username', { required: true })} />
        {errors.username && <span>This field is required</span>}
      </div>
      <div className="group flex flex-col mb-10">
        <AuthInput label="Password" type='password' {...register('password', { required: true })} />
        {errors.password && <span>This field is required</span>}
      </div>
      <input type="submit" value="Login" className="w-3/6 mx-auto block bg-lightBlue-300 py-3 text-white rounded-3xl font-medium" />
    </form>
  )
}