import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar ,IonFooter, IonCard, IonCardContent, IonInput, IonButton ,IonIcon, useIonRouter, useIonLoading,IonGrid, IonCol ,IonRow } from '@ionic/react';
import { logIn,alertCircleSharp} from 'ionicons/icons';
import React, { useEffect } from 'react';
import logo from '../theme/Assets/Cabana.svg';
import Intro from './components/Intro';
import {Preferences} from '@capacitor/preferences'
import Toolbar from './components/ToolBar';

const INTRO_KEY='intro-seen'

const Login: React.FC = () => {
    const router=useIonRouter();
    const [introSeen, setIntroSeen] = React.useState(true);
    const [present,dismiss]= useIonLoading();

    useEffect(()=>{
        const checkStorage= async()=> {
            const seen = await Preferences.get({key:INTRO_KEY});
            setIntroSeen(seen.value==='true')
        }
        checkStorage()
    },[])
    /*** Function to finish the intro and set preferences with Capacitor***/
    const finishIntro = () => {
        setIntroSeen(true);
        console.log("finished")
        Preferences.set({key:INTRO_KEY, value:'true'})
    }

    const doLogin= async(event : any)=>{
        event.preventDefault();
        console.log('doLogin');
        /*** Add log in verification proces ***/
        await present('loggin in...');
        setTimeout(()=>{
            dismiss();
            router.push('/menu');
        },1000);
    }
    return (
        <>
        {!introSeen ? (<Intro onFinish={finishIntro}/>):(
        <IonPage>
            <IonHeader>
            <Toolbar name="LogIn" color="primary" />
            </IonHeader>
            <IonContent className="ion-padding">
            <IonGrid fixed={true} /* fixed is used to center the content */>
                <IonRow className='ion-justify-content-center'>
                    <IonCol size='12' size-md='6' sizeLg='4'>
                    <div className='ion-text-center'>
                        <img width={'50%'} src={logo} alt="" />
                    </div>
                <IonCard>
                    <IonCardContent>
                        <form onSubmit={doLogin}>
                            <IonInput label="Email" labelPlacement="stacked" type="text" placeholder="example@google.com" />
                            <IonInput label="Password" labelPlacement="stacked" type="password" placeholder="ADhb13//" />
                            <IonButton type="submit" expand='block'>Login <IonIcon icon={logIn}></IonIcon></IonButton>
                            <IonButton color={'secondary'} routerLink='/register' type="button" expand='block'>Forgot Password<IonIcon icon={alertCircleSharp}></IonIcon></IonButton>
                        </form>
                    </IonCardContent>
                </IonCard>
                    </IonCol>
                </IonRow>
            </IonGrid>
            </IonContent>
            <IonFooter>
            <IonToolbar>
                tool
            </IonToolbar>
            </IonFooter>
        </IonPage>)}
        </>
    );
};

export default Login;