import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonButtons,IonMenuButton } from '@ionic/react';
import React from 'react';

interface ToolbarProps {
    name: string;
    color: string;
  }

const ToolBar: React.FC <ToolbarProps> = ({ name, color }) => {

    return (
        <IonToolbar color={color} className='ion-padding-top'>
                            <IonButtons slot='start'>
                                <IonMenuButton/>
                            </IonButtons>
                            <IonTitle>{name}</IonTitle>
                        </IonToolbar>
    );
};

export default ToolBar;