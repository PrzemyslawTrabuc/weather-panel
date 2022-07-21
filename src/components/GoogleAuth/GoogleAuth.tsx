import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";


import { signIn } from "./GoogleAuthSlice";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const dark = useSelector((state: RootState) => state.DarkModeSwitch.value);
  const isDesktop = useSelector((state: RootState) => state.MobileMenuSwitch.isDesktop);

  function parseJwt(token: string) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const handleCallbackResponse = (response: any) => {
    let data = parseJwt(response.credential);
    console.log(data);
    dispatch(signIn({ userName: data.name, userId: data.sub}));
  };

  useEffect(() => {
    console.log("dupa")
    window.google.accounts.id.initialize({
      client_id:
        "1030502307448-nmhaj2n273ahcd1ededol73i83arfotc.apps.googleusercontent.com",
        auto_select: true,
        callback: handleCallbackResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("googleSignIn"),
      { theme: dark === 'dark' ? "filled_black" : "filled_blue" , size: "medium", type: isDesktop ? "" : "icon"}
    );
  },[isDesktop, dark]);

  return <div id="googleSignIn"></div>;
};
export default GoogleAuth;
