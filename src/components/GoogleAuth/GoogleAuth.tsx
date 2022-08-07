import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import db from "../../api/firebase";

import { signIn } from "./GoogleAuthSlice";
import getCookie from "../../tools/getCookie";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const isDarkModeOn = useSelector(
    (state: RootState) => state.DarkModeSwitch.isDarkModeOn
  );
  const isDesktop = useSelector(
    (state: RootState) => state.MobileMenuSwitch.isDesktop
  );
  const userId = useSelector((state: RootState) => state.GoogleAuth.userId);

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

  const createDocumentforGoogleUser = async(userId: string)=>{
    const document = await getDoc(doc(db, "UsersData", userId))
    if(!document.data())
    await setDoc(doc(db, "UsersData", userId), {
      favCities:[], 
  })
}

  const handleCallbackResponse = (response: any) => {
    let data = parseJwt(response.credential);
    document.cookie = `userName=${data.name}`;
    document.cookie = `userId=${data.sub}`;
    createDocumentforGoogleUser(data.sub);
    dispatch(signIn({ userName: data.name, userId: data.sub }));    
  };

  useEffect(() => {
    // console.log(getCookie("userName"));
    // console.log(getCookie("userId"));
    dispatch(
      signIn({ userName: getCookie("userName"), userId: getCookie("userId") })
    );

    if (!userId && !getCookie("userId")) {
      window.google.accounts.id.initialize({
        client_id:
          "489858025664-9h0i3hdddglji4kpf7cll2f88vsiumlu.apps.googleusercontent.com",
        auto_select: true,
        callback: handleCallbackResponse,
      });
      if (!getCookie("g_state")) google.accounts.id.prompt();
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignIn") as HTMLElement,
        {
          theme: isDarkModeOn === true ? "filled_black" : "filled_blue",
          size: "medium",
          type: isDesktop ? "standard" : "icon",
        }
      );
    }
  }, [isDesktop, isDarkModeOn]);

  return <div id="googleSignIn"></div>;
};
export default GoogleAuth;
