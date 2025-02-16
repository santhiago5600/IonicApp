import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar ,IonFooter, IonCard, IonCardContent, IonInput, IonButton ,IonIcon, IonButtons, IonBackButton, useIonRouter, IonGrid, IonCol ,IonRow  } from '@ionic/react';
import { logIn, checkmarkCircle, arrowBack} from 'ionicons/icons';
import React from 'react';

const Register: React.FC = () => {
    const router=useIonRouter();
    const doRegister=(event : any)=>{
        event.preventDefault();
        console.log('doRegister');
        alert('An email has been sent to your email address');
        router.goBack()
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color={"primary"}>
                    <IonButtons slot='start' className='ion-margin-top'>
                        <IonBackButton defaultHref='/' />
                    </IonButtons>
                    <IonTitle  className='ion-margin-top'>Recover Acount</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                            <IonGrid fixed={true} /* fixed is used to center the content */>
                                <IonRow className='ion-justify-content-center'>
                                    <IonCol size='12' size-md='8 ' sizeLg='6'>
                <IonCard>
                                    <IonCardContent>
                                        <form onSubmit={doRegister}>
                                            <IonInput label="Email" labelPlacement="stacked" type="text" placeholder="example@google.com" />
                                            <IonButton color={'secondary'}  type="submit" expand='block'>Confirm Email<IonIcon icon={checkmarkCircle}></IonIcon></IonButton>
                                        </form>
                                    </IonCardContent>
                                </IonCard>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Register;