import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import ToolBar from './components/ToolBar';
import { Camera, CameraResultType } from '@capacitor/camera';

const tab1: React.FC = () => {
    const [image,setImage]= useState<any>(null)
    
    const takePhoto=async()=>{
        const image= await Camera.getPhoto({
            quality:90,
            allowEditing:false,
            resultType:CameraResultType.Base64
        })
        const img =`data:image/jepg;base64,${image.base64String}`
        setImage(img);
    }

    return (
        <IonPage>
            <IonHeader>
                <ToolBar name="tab1" color="tertiary"/>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonButton expand='block' onClick={takePhoto}>Take Photo</IonButton>
                <img src={image} alt=''/>
            </IonContent>
        </IonPage>
    );
};

export default tab1;