import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";

export const Logout: FunctionComponent = () => {
  
    const borrarCookie = () => {
        document.cookie = "auth=;"; // o poner path=/
        return
    }

  return (
    <>
       <a href="/login" class="logout-button" onClick={e => borrarCookie()}> Logout </a>
    </>
    
  );
};