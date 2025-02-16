import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonMenu,
  IonRouterOutlet,
  IonItem,
  IonMenuToggle,
  IonIcon,
  IonSplitPane
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import Settings from "./Settings";
import List from "./List";
import { homeOutline, logOutOutline, settingsOutline } from "ionicons/icons";
import ToolBar from "./components/ToolBar";

/*** Menu component items***/
const Menu: React.FC = () => {
    const paths=[
        {name:'Home',url:'/menu/list/',icon:homeOutline},
        {name:'Settings',url:'/menu/settings/',icon:settingsOutline},
        {name:'Logout',url:'/',icon:logOutOutline}
    ]

  return (
    <IonPage>
      <IonSplitPane contentId="main" when={"md"}>
      <IonMenu contentId="main">
        <IonHeader>
          <ToolBar name="Menu Items" color="secondary" />
        </IonHeader>
        <IonContent>
            {paths.map((item,index)=>(
                <IonMenuToggle key={index} autoHide={false}>
                <IonItem routerLink={item.url} routerDirection="none">
                    <IonIcon className="ion-padding" icon={item.icon}/>
                    {item.name}
                </IonItem>
                </IonMenuToggle>
            ))}
        </IonContent>
      </IonMenu>
      <IonRouterOutlet id="main">
        <Route path='/menu/list/' component={List}/>
        <Route path='/menu/settings/' component={Settings}/>
        <Route exact path='/menu'>
            <Redirect to='/menu/list/'/>
        </Route>
      </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;
