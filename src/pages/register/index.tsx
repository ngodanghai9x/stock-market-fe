import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { WEAK_PASSWORDS } from "../../constants";
import { PATH_NAMES } from "../../constants/path-name";
import { customerRegister } from '../../services/api-auth.service';
import { RegisterPayload } from '../../services/api-auth.type';

const RegisterPage = () => {
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
        <div>
          {/* <FCTextInput label='User name:' type='text' {...register('username', { required: true })} /> */}
          <label htmlFor="username">User name::</label>
          <input type="text" id='username' {...register('username', { required: true })} />
          {errors.username && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id='password' {...register('password', {
            required: true, validate: {
              weakPassword: v => WEAK_PASSWORDS.includes(v) || 'Weak'
            }
          })} />
          {errors.password && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input type="password" id='confirmPassword' {...register('confirmPassword', {
            required: {
              value: true,
              message: 'This field is required'
            }, validate: {
              samePassword: v => v === getValues('password') || 'Confirm password not match'
            }
          })} />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        </div>
        <div>
          <label htmlFor="fullname">Full name:</label>
          <input type="text" id='fullname' {...register('fullName', { required: true })} />
          {errors.fullName && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id='email' {...register('email', { required: true })} />
          {errors.email && <span>This field is required</span>}
        </div>
        <input type="submit" value='Register' />
      </form>
    </div>
  )
}

export default RegisterPage
