import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonTitle, IonToolbar, RefresherEventDetail, useIonLoading, useIonModal, useIonToast } from '@ionic/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useAddUsersMutation, useDeleteUserMutation, useGetUsersQuery, useLazyGetUsersQuery, useUpdateUserMutation } from '../../state/usersSlice/usersSlice';
import { UserType } from '../../state/usersSlice/type';
import dayjs from 'dayjs';
import UserModal from '../../components/UserModal';
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import { add, create, eye, trash } from 'ionicons/icons';

const UserList: React.FC = () => {

    const { data, isLoading } = useGetUsersQuery()
    const [addUser] = useAddUsersMutation()
    const [updateUser] = useUpdateUserMutation()
    const [deleteUser] = useDeleteUserMutation()
    const [fetch] = useLazyGetUsersQuery()

    const [users, setusers] = useState<UserType[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<UserType>();
    const [modalType, setModalType] = useState<"edit" | "create" | "view">("create")
    const [loading, dismissLoading] = useIonLoading();
    const presentLoading = (message: string) => {
        loading({
            message: message,
        });
    };

    useEffect(() => {
        if (data) {
            setusers(data)
        }
    }, [data])

    const [toast] = useIonToast();

    const presentToast = (message: string) => {
        toast({
            message: message,
            duration: 1500,
            position: "bottom",
        });
    };

    const handleInput = (ev: Event) => {
        let query = '';
        const target = ev.target as HTMLIonSearchbarElement;
        if (target) query = target.value!.toLowerCase();
        if (data)
            setusers(data.filter((d) => d.name.toLowerCase().indexOf(query) > -1));
    };

    const [present, dismiss] = useIonModal(UserModal, {
        dismiss: (data: string, role: string) => dismiss(data, role),
        userData: selectedUsers,
        type: modalType
    });


    const openModal = useCallback((modalType: string) => {
        present({
            onWillDismiss: async (ev: CustomEvent<OverlayEventDetail>) => {
                const data = ev.detail.data
                if (ev.detail.role === 'save') {
                    if (modalType === "create") {
                        presentLoading("Please wait....")
                        await addUser(data).unwrap()
                        await fetch()
                        dismissLoading()
                        presentToast(`${data.name} is created`)
                    }
                    else if (modalType === "edit") {
                        presentLoading("Please wait....")
                        await updateUser(data).unwrap()
                        await fetch()
                        dismissLoading()
                        presentToast(`${data.name} is updated`)
                    }
                }
            },
        });
    }, [modalType])

    function onUserButtonClick(user: UserType, type: "edit" | "view") {
        setModalType(type)
        setSelectedUsers(user)
        openModal(type)
    }

    function onCreateClick() {
        setModalType("create")
        openModal("create")
    }

    async function onDeleteClick(data: UserType) {
        presentLoading("Please wait....")
        await deleteUser(data.id).unwrap()
        await fetch()
        presentToast(`${data.name} is deleted`)
        dismissLoading()
    }

    function convertTimestampToDate(timestamp: string | number): string {
        const date = dayjs(timestamp);
        return date.format('HH:mm');
    }

    async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        await fetch()
        event.detail.complete();
    }

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>User List</IonTitle>
                        <IonButtons color='primary' slot='end' className='ion-margin-end'>
                            <IonButton color={"primary"} onClick={onCreateClick}>
                                Create
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                    <IonToolbar className='ion-margin-bottom'>
                        <IonSearchbar onIonInput={(ev) => handleInput(ev)} />
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                        <IonRefresherContent></IonRefresherContent>
                    </IonRefresher>
                    {
                        users.map((user) => {
                            return <IonCard key={user.id}>
                                <IonCardHeader>
                                    <IonGrid className='ion-no-padding ion-no-margin md'>
                                        <IonRow className='ion-justify-content-between ion-align-items-center'>
                                            <IonCol>
                                                <IonCardTitle>{user.name}</IonCardTitle>
                                                <IonCardSubtitle style={{ paddingTop: "5px" }}>
                                                    {user.phone}
                                                </IonCardSubtitle>
                                            </IonCol>
                                            <IonCol>
                                                <IonButtons className='ion-justify-content-end'>
                                                    <IonButton onClick={() => { onUserButtonClick(user, "edit") }} size='small'>
                                                        <IonIcon slot="icon-only" icon={create}></IonIcon>
                                                    </IonButton>
                                                    <IonButton onClick={() => { onUserButtonClick(user, "view") }} size='small'>
                                                        <IonIcon slot="icon-only" icon={eye}></IonIcon>
                                                    </IonButton>
                                                    <IonButton onClick={() => { onDeleteClick(user) }} size='small'>
                                                        <IonIcon slot="icon-only" icon={trash}></IonIcon>
                                                    </IonButton>
                                                </IonButtons>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonGrid className='ion-no-padding'>
                                        <IonRow>
                                            <IonCol>
                                                <div style={{ display: "flex", gap: "5px" }}>
                                                    <IonLabel>Entry time :</IonLabel>
                                                    {convertTimestampToDate(user.entryTime)}
                                                </div>
                                            </IonCol>
                                            <IonCol>
                                                <div style={{ display: "flex", gap: "5px" }} className='ion-justify-content-end ion-padding-end'>
                                                    <IonLabel>Exit time :</IonLabel>
                                                    {convertTimestampToDate(user.exitTime)}
                                                </div>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonCardContent>
                            </IonCard>
                        })
                    }
                </IonContent>
                {/* <IonFab className='ion-margin' horizontal="end" vertical="bottom">
                    <IonFabButton onClick={onCreateClick}>
                        <IonIcon icon={add}></IonIcon>
                    </IonFabButton>
                </IonFab> */}
            </IonPage>
        </>
    );
};

export default UserList;