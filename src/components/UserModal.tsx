import { IonButton, IonButtons, IonCard, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { UserType } from "../state/usersSlice/type";
import dayjs from "dayjs";

type Props = {
    dismiss: (data?: UserType | null, role?: string) => void
    userData: UserType,
    type: "edit" | "create" | "view"
}

type UserFormData = {
    id: number;
    date: string;
    entryTime: string;
    exitTime: string;
    name: string;
    phone: string;
}
const formatTimeFromTimestamp = (timestamp: string | number | undefined) => {
    if (!timestamp) return
    return dayjs(timestamp).format('HH:mm');
};

const formatDateFromTimestamp = (timestamp: string | number | undefined) => {
    if (!timestamp) return
    return dayjs(timestamp).format('YYYY-MM-DD');
};

function toTitleCase(str: string) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
function UserModal({ dismiss, userData, type }: Props) {
    const [formData, setFormData] = useState<Partial<UserFormData>>();

    useEffect(() => {
        if (type === "create") {
            setFormData(undefined)
        } else {
            setFormData({
                id: userData.id,
                name: userData.name,
                date: formatDateFromTimestamp(userData.entryTime),
                entryTime: formatTimeFromTimestamp(userData.entryTime),
                exitTime: formatTimeFromTimestamp(userData.exitTime),
                phone: userData.phone,
            })
        }
    }, [type, userData])

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const changeFormDataToUserData = (formData: Partial<UserFormData> | undefined) => {
        if (!formData) return null

        function changeTime(date: string, time: string) {
            const dayjsObject = dayjs(`${date} ${time}`);
            const timeNumber = dayjsObject.valueOf();
            return timeNumber
        }

        const userData: UserType = {
            id: formData.id!,
            entryTime: changeTime(formData.date!, formData.entryTime!),
            exitTime: changeTime(formData.date!, formData.exitTime!),
            name: formData.name!,
            phone: formData.phone!,
        }
        return userData
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        let data = changeFormDataToUserData(formData)
        dismiss(data, 'save');
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="medium" onClick={() => dismiss(null, 'cancel')}>
                            Cancel
                        </IonButton>
                    </IonButtons>
                    <IonTitle>{toTitleCase(type)} User</IonTitle>
                    {
                        type !== "view" && <IonButtons slot="end">
                            <IonButton type="submit" form={"user-form"} strong={true}>
                                {type === "create" ? <>Create</> : <>Update</>}
                            </IonButton>
                        </IonButtons>
                    }
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonCard className="ion-padding">
                    <form id="user-form" onSubmit={handleSubmit}>
                        <IonInput required readonly={type === "view"} value={formData?.name} onInput={handleInputChange} name="name" mode="md" fill="outline" labelPlacement="floating" label="Name" type="text" placeholder="simon@ionicacademy.com"></IonInput>
                        <IonInput required readonly={type === "view"} value={formData?.phone} onInput={handleInputChange} name="phone" mode="md" className="ion-margin-top" fill="outline" labelPlacement="floating" label="Phone Number" type="tel" placeholder="simon@ionicacademy.com"></IonInput>
                        <IonInput required readonly={type === "view"} value={formData?.date} onInput={handleInputChange} name="date" mode="md" className="ion-margin-top" fill="outline" labelPlacement="floating" label="Date" type="date" ></IonInput>
                        <IonInput required readonly={type === "view"} value={formData?.entryTime} onInput={handleInputChange} name="entryTime" mode="md" className="ion-margin-top" fill="outline" labelPlacement="floating" label="Entry Time" type="time" ></IonInput>
                        <IonInput required readonly={type === "view"} value={formData?.exitTime} onInput={handleInputChange} name="exitTime" mode="md" className="ion-margin-top" fill="outline" labelPlacement="floating" label="Exit Time" type="time" ></IonInput>
                    </form>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}

export default UserModal