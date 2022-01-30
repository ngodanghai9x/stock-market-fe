import { useContext } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { AuthContext } from "../../context/auth/auth"
import { login } from "../../lib/utils"
import { LoginPayload } from "../../services/api-auth.type"

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginPayload>()
  const { setUser, setAuthenticated } = useContext(AuthContext)

  const loginHandle: SubmitHandler<LoginPayload> = async (data) => {
    try {
      const res = await login(data);
      setUser(res.data.user)
      setAuthenticated(true)
      toast(res.message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(loginHandle)} >
        <label htmlFor="username">User name</label>
        <input type="text" id='username' {...register('username', { required: true })} />
        {errors.username && <span>This field is required</span>}
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register('password', { required: true })} />
        {errors.password && <span>This field is required</span>}
        <input type="submit" value="login" />
      </form>
    </div>
  )
}

export default LoginPage
