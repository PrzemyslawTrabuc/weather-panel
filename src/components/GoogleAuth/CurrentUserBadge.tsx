import React from "react";
import { Avatar, Tooltip } from "@mantine/core";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

const CurrentUserBadge = () => {
  const currentUser = useSelector(
    (state: RootState) => state.GoogleAuth.userName
  );
  const isDesktop = useSelector(
    (state: RootState) => state.MobileMenuSwitch.isDesktop
  );

  return (  
     <Tooltip
     label={`Zalogowano jako ${currentUser}`}
     color='blue'
     radius="md"
     >
      <Avatar 
      color="blue"
      size="md"
      >
        {currentUser ? currentUser.split(" ")[0].charAt(0) + currentUser.split(" ")[1].charAt(0) : ''}
        </Avatar>    
     </Tooltip> 
  );
};

export default CurrentUserBadge;
