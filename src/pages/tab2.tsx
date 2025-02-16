import { CreateAnimation, IonButton, IonContent, IonHeader, IonPage, IonRouterOutlet, IonTitle, IonToolbar, useIonViewDidEnter, onClick, Gesture, createGesture, GestureDetail } from '@ionic/react';
import React, { useRef } from 'react';
import ToolBar from './components/ToolBar';
import { Route } from 'react-router';
import { infinite } from 'ionicons/icons';

const tab2: React.FC = () => {

    const animationRef= useRef<CreateAnimation | null>(null);

    const elementRef = useRef<HTMLDivElement | null> (null)
    useIonViewDidEnter(()=>{
        
    //animationRef.current?.animation.stop()

    const gesture : Gesture = createGesture({
        el:elementRef.current!,
        threshold:0,
        gestureName: 'my-gesture',
        onStart:onMoveStart,
        onMove:(ev)=>onMoveHandler(ev),
        onEnd:(ev)=>onMoveEnd(ev)
    });
    gesture.enable();
    });

    const onMoveStart=(detail: GestureDetail)=>{
        elementRef.current!.style.transition='none';
    }


    const onMoveHandler =(detail: GestureDetail)=>{
        console.log(detail)
        const x =detail.currentX-detail.startX;
        const y =detail.currentY-detail.startY;

        elementRef.current!.style.transform=`translate(${x}px,${y}px)`
    }
    const onMoveEnd= ((detail: GestureDetail)=>{
        elementRef.current!.style.transition= '500ms ease-out';
        elementRef.current!.style.transform=`translate(0px,0px)`
    })
    
    return (
        <IonPage>
            <IonHeader>
            <ToolBar name="tab2" color="tertiary"/>
            </IonHeader>
            <IonContent className="ion-padding">
                <CreateAnimation 
                    ref={animationRef}
                    duration={2000} iterations={Infinity} delay={1000} keyframes={[
                    {offset:0,transform:'scale(1)',opacity:'1'},
                    {offset:0.5,transform:'scale(1.5)',opacity:'0.5'},
                    {offset:1,transform:'scale(1)',opacity:'1'},
                ]}>
                    <IonButton onClick={()=>animationRef.current?.animation.play()} expand='block' color={'success'} className='ion-margin' >
                        click
                    </IonButton>
                </CreateAnimation>
                <div ref={elementRef} style={{width:50,height:50,backgroundColor:'red'}}> </div>
            </IonContent>
        </IonPage>
    );
};

export default tab2;