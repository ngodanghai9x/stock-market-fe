import { useCallback, useState } from "react"
import LoginLogo from "../../components/images/LoginLogo"
import { LoginForm, RegisterForm } from "../../modules/auth";

enum Form {
  LoginForm,
  RegisterForm
}

const LoginPage = () => {
  const [selectedForm, setSelectedForm] = useState<Form>(Form.LoginForm);

  const setForm = (form: Form) => {
    setSelectedForm(form)
  }

  const activeForm = selectedForm === Form.RegisterForm

  return (
    <div className="container mx-auto max-w-none flex items-center justify-center h-screen bg-gray-100">
      <div className="h-2/3 w-4/5 grid grid-cols-7 max-w-screen-lg">
        <div className="w-full bg-blue-purple col-span-3 rounded-2xl shadow-2xl text-white py-10">
          <div className="w-44 h-44 mx-auto border-dashed border-2 border-white rounded-full p-3 flex items-center justify-center bg-blue-purple-dark">
            <LoginLogo classNames="w-20" />
          </div>
        </div>
        <div className="col-span-4 bg-white my-5 rounded-tr-2xl rounded-br-2xl shadow-2xl px-10 py-8">
          <div className="flex mx-auto justify-center">
            <div className="flex font-bold text-base text-gray-300 mb-10 cursor-pointer">
              <span className={`px-4 border-b-2 ${activeForm ? 'border-b-2 border-lightBlue-300 text-lightBlue-300 font-extrabold' : 'border-gray-300 '}`} onClick={() => setForm(Form.RegisterForm)} >Register</span>
              <span className={`px-4 border-b-2 ${!activeForm ? 'border-b-2 border-lightBlue-300 text-lightBlue-300 font-extrabold' : 'border-gray-300 '}`} onClick={() => setForm(Form.LoginForm)}>Login</span>
            </div>
          </div>
          {selectedForm === Form.LoginForm ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
