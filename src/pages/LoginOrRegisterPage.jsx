import Form from "../components/Form";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";

function LoginOrRegisterPage() {
  const { loginUser, signInWithGoogle, user, registerUser } = useUsers();
  const [newUser, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const route = pathname === "/login";

  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    user && navigate("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (route) {
      await loginUser(newUser);
    } else {
      await registerUser(newUser);
    }
  };

  const contentForm = [
    {
      labelText: "nombre",
      name: "name",
      placeholder: "Displayname",
      typeInput: "nickname",
      onChange: handleChange,
      autoComplete: "nickname",
      textButton: route
        ? t("login_or_register.login")
        : t("login_or_register.register"),
    },
    {
      labelText: t("login_or_register.email"),
      name: "email",
      placeholder: "prueba@prueba.com",
      typeInput: "email",
      onChange: handleChange,
      autoComplete: "email",
      textButton: route
        ? t("login_or_register.login")
        : t("login_or_register.register"),
    },
    {
      labelText: t("login_or_register.password"),
      name: "password",
      placeholder: "********",
      //   typeInput: "password",
      onChange: handleChange,
      autoComplete: "current-password",
    },
  ];
  if (route) {
    contentForm.shift();
  }
  return (
    <div className="flex justify-center max-sm:p-4">
      <div className=" p-8 flex flex-col gap-4 bg-[var(--card-background-color)] rounded-md shadow-md  ">
        <h1 className="font-bold text-2xl">
          {t("login_or_register.welcome")}
          {route && t("login_or_register.back")}
        </h1>
        <p>
          {route
            ? t("login_or_register.account_false")
            : t("login_or_register.account_true")}
          <Link
            className=" text-xs pl-2  pt-8 text-blue-500 hover:text-blue-600 hover:border-b border-blue-600"
            to={route ? "/register" : "/login"}
          >
            {route
              ? t("login_or_register.sign_up")
              : t("login_or_register.sign_in")}
          </Link>
          .
        </p>
        <Form
          style="flex flex-col  gap-4 text-[var(--text-color)]"
          contentForm={contentForm}
          onSubmit={handleSubmit}
        />
        <p className="font-bold text-lg text-center max">Or</p>
        <div className="flex flex-col items-center justify-center space-y-4 ">
          <Button
            icon={
              <svg
                className="w-5 h-5"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_13183_10121)">
                  <path
                    d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                    fill="#3F83F8"
                  ></path>
                  <path
                    d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                    fill="#FBBC04"
                  ></path>
                  <path
                    d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                    fill="#EA4335"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_13183_10121">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                      transform="translate(0.5)"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
            }
            onClick={signInWithGoogle}
            text={`${
              route
                ? t("login_or_register.sign_in")
                : t("login_or_register.sign_up")
            }  ${t("login_or_register.with")} Google`}
            background={
              "bg-[var(--card-background-color)] hover:bg-[var(--background-color)] border-[2px] border-[var(--background-color)] border-solid"
            }
            textColor={" text-[var(--text-color)]"}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginOrRegisterPage;
