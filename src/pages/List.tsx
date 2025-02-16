import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, useIonViewWillEnter, IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonAvatar, IonItem, IonLabel, IonChip, IonIcon, useIonAlert, useIonToast, IonRefresher, IonRefresherContent, IonSkeletonText, IonModal, IonFab,IonFabButton, IonSegment, IonSegmentButton, IonDatetime, IonInput, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import Toolbar from './components/ToolBar';
import { trashBinOutline, addOutline, calendar, save } from 'ionicons/icons';

const List: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [showAlert]= useIonAlert();
    const [showToast]= useIonToast();

    /* Modal 1 */
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const modal = useRef<HTMLIonModalElement>(null);

    /* Modal 2 */
    const cardModal = useRef<HTMLIonModalElement>(null);
    const [presentigElement, setPresentingElement] = useState<HTMLElement | null>(null);
    const page= useRef(null);

    useEffect(()=>{setPresentingElement(page.current)},[]);

    const [activeSegment,setActiveSegment] =useState<any>('details')

/* Calls the information from the Api*/
    const [users, setUsers] = useState<any[]>([]);
    useIonViewWillEnter(async () => {
        const users = await getUsers();
        setUsers(users);
        setLoading(false);
        console.log(users);
    });
    const getUsers = async () => {
        // const data= await fetch('http://localhost:5001/Administracion/GetDataUsers?9905');
        const data = await fetch('https://randomuser.me/api/?results=11');
        const users = await data.json();
        return users.results;
    }
    


    const clearList=()=>{
        showAlert({
            header: 'Confirm!',
            message: 'Are you sure you want to delete all the users?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                },{
                    text: 'Delete',
                    handler: () => {
                        setUsers([]);
                        showToast({
                            message: 'All users were deleted',
                            duration: 2000,
                            color: 'danger',
                        })
                    }
                }
            ]
        })
    }
    const refreshList= async(event:any)=>{
        const newUsers= await getUsers();
        setUsers(newUsers);
        event.detail.complete();
    }


    const handleSaveUser=()=>{
        console.log('clicked')
    } 

    return (
        <IonPage ref={page}>
            <IonHeader>
                
            <Toolbar name="List" color="primary" />


            <IonToolbar color={'primary'}>
                <IonSearchbar color={'tertiary'} ></IonSearchbar>
                <IonButtons slot='end'>
                    <IonButton onClick={clearList}>
                        <IonIcon slot='icon-only' icon={trashBinOutline}/>
                    </IonButton>
                </IonButtons>
            </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonRefresher slot='fixed' onIonRefresh={ (event) => refreshList(event)}>
                    <IonRefresherContent/>
                </IonRefresher> 
                {/* make a component for the card */}
                {loading && (
                        [...Array(10)].map((e, i) => (
                            <IonCard key={i}>
                                 <IonCardContent className='ion-no-padding'>
                    <IonItem lines='none'>
                        <IonAvatar slot="start">
                            <IonSkeletonText/>
                        </IonAvatar>
                        <IonLabel>
                        <IonCardTitle><IonSkeletonText animated style={{width:'150px'}} /></IonCardTitle>
                        <IonSkeletonText animated style={{width:'150px'}} />
                        </IonLabel>
                        <IonChip slot='end'>
                        </IonChip>
                        </IonItem>
                    </IonCardContent>
                            </IonCard>
                        )
                        )
                    )
                }

                {users.map((user, index) => (<IonCard key={index} onClick={() => setSelectedUser(user)} >
                    <IonCardContent className='ion-no-padding'>
                    <IonItem lines='none'>
                        <IonAvatar slot="start">
                            <img src={user.picture.thumbnail} />
                        </IonAvatar>
                        <IonLabel>
                        <IonCardTitle>{user.name.first +' '+ user.name.last}</IonCardTitle>
                        <p>{user.cell}</p>
                        <p>{user.email}</p>
                        </IonLabel>
                        <IonChip slot='end'>
                            {user.nat}
                        </IonChip>
                        </IonItem>
                    </IonCardContent>
                </IonCard>))}

                {/* Modal */}
                <IonModal breakpoints={[0,0.5,0.8]} initialBreakpoint={0.6} ref={modal} isOpen={selectedUser !== null} onIonModalDidDismiss={() => setSelectedUser(null)}>
                    <IonHeader>
                        <IonToolbar >
                            <IonButtons slot='start'>
                                <IonButton onClick={() => modal.current?.dismiss()}>Close</IonButton>
                            </IonButtons>
                            <IonTitle>{selectedUser?.name.first}</IonTitle>
                        </IonToolbar>
                        <IonToolbar >
                            <IonSegment value={activeSegment} onIonChange={(e)=>setActiveSegment(e.detail.value!)}>
                                <IonSegmentButton value='details'>Details</IonSegmentButton>
                                <IonSegmentButton value='calendar'>Calendar</IonSegmentButton>
                            </IonSegment>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonCard>
                            <IonCardContent className='ion-ppading'>
                                  {activeSegment === 'details' && (
                                     <IonLabel>
                                     <IonCardTitle>{selectedUser?.name.first +' '+ selectedUser?.name.last}</IonCardTitle>
                                     <p>{selectedUser?.cell}</p>
                                     <p>{selectedUser?.email}</p>
                                     </IonLabel>
                                  )}
                            </IonCardContent>
                            <IonCardContent className='ion-ppading'>
                                  {activeSegment === 'calendar' && <IonDatetime/>}
                                     
                            </IonCardContent>
                        </IonCard>

                    </IonContent>
                </IonModal>


                {/* Second Modal for ios add this presentingElement={presentigElement!} */}
                <IonModal ref={cardModal} trigger='card-modal' presentingElement={presentigElement!}>
                <IonHeader>
                        <IonToolbar color={'success'}>
                            <IonButtons slot='start'>
                                <IonButton onClick={() => cardModal.current?.dismiss()}>Close</IonButton>
                            </IonButtons>
                            <IonTitle>Card Modal</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent>
                        <IonCard>
                            <IonCardContent>
                            <form onSubmit={handleSaveUser}>
                                    <IonInput label='name' labelPlacement='stacked' type='text' placeholder='Jhon Doe'/>
                                    <IonInput label="email" labelPlacement="stacked" type="text" placeholder="example@google.com"/>
                                    <IonInput label='phone' labelPlacement='stacked' type='number' placeholder='300123456'/>
                                    <IonSelect label="gender" labelPlacement="stacked"  placeholder=''>
                                        <IonSelectOption value="Male">Male</IonSelectOption>
                                        <IonSelectOption value="Female">Female</IonSelectOption>
                                        <IonSelectOption value="Other">Other</IonSelectOption>
                                    </IonSelect>
                                    <IonButton type="submit" expand='block'>Save <IonIcon name={save}></IonIcon></IonButton>
                                </form>         
                            </IonCardContent>
                        </IonCard>
                    </IonContent>
                </IonModal>

                <IonFab vertical='bottom' horizontal='end' slot='fixed'>
                    <IonFabButton id='card-modal'>
                        <IonIcon icon={addOutline}/>
                    </IonFabButton>
                </IonFab>

            </IonContent>
        </IonPage>
    );
};

export default List;