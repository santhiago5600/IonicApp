import { IonContent, IonHeader,IonRouterOutlet, IonMenuButton, IonLabel, IonPage, IonTitle, IonToolbar, IonButtons ,IonTabs,IonTabBar, IonTabButton, IonIcon } from '@ionic/react';
import React from 'react';
import Toolbar from './components/ToolBar';
import { Redirect, Route } from 'react-router';
import tab1 from './tab1';
import tab2 from './tab2';
import { triangle } from 'ionicons/icons';

const Settings: React.FC = () => {

    return (
        <IonTabs>
            <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/menu/settings/tab1">
                    <IonIcon icon={triangle}/>
                    <IonLabel>Tab1</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/menu/settings/tab2">
                    <IonIcon icon={triangle}/>
                    <IonLabel>Tab2</IonLabel>
                </IonTabButton>
            </IonTabBar>
            <IonRouterOutlet>
                <Route path="/menu/settings/tab1" component={tab1}/>
                <Route path="/menu/settings/tab2" component={tab2}/>
                <Route exact path="/menu/settings">
                    <Redirect to="/menu/settings/tab1"/>
                </Route>
            </IonRouterOutlet>
        </IonTabs>
    );
};

export default Settings;