import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { WEAK_PASSWORDS } from "../../../constants";
import { PATH_NAMES } from "../../../constants/path-name";
import { customerRegister } from '../../../services/api-auth.service';
import { RegisterPayload } from '../../../services/api-auth.type';
import AuthInput from "./auth-input";

export const RegisterForm = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<RegisterPayload>()
  const navigate = useNavigate()

  const onSubmit: SubmitHandler<RegisterPayload> = async (data) => {
    try {
      const res = await customerRegister(data)
      toast(res.data.message)
      navigate(PATH_NAMES.login)
    } catch (error: any) {
      console.log(error)
      toast(error.response.data.message)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="group flex flex-col mb-8">
          <AuthInput label="User name:" {...register('username', { required: true })} />
          {errors.username && <span>This field is required</span>}
        </div>
        <div className="group flex flex-col mb-8">
          <AuthInput label="Password:" type="password" {...register('password', {
            required: true, validate: {
              weakPassword: v => !WEAK_PASSWORDS.includes(v) || 'Weak'
            }
          })} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className="group flex flex-col mb-8">
          <AuthInput label="Confirm password:" type="password" {...register('confirmPassword', {
            required: {
              value: true,
              message: 'This field is required'
            }, validate: {
              samePassword: v => v === getValues('password') || 'Confirm password not match'
            }
          })} />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>
        <div className="group flex flex-col mb-8">
          <AuthInput label="Full name:" {...register('fullName', { required: true })} />
          {errors.fullName && <span>This field is required</span>}
        </div>
        <div className="group flex flex-col mb-10">
          <AuthInput label="Email:" {...register('email', { required: true })} />
          {errors.email && <span>This field is required</span>}
        </div>
        <input type="submit" value="Register" className="w-3/6 mx-auto block bg-lightBlue-300 py-3 text-white rounded-3xl font-medium" />
      </form>
    </div>
  )
}