import React from 'react';
import {NextPage} from "next";
import {ProfileInfo} from "@/components/ProfileInfo/ProfileInfo";
import {checkAuth} from "@/utils/checkAuth";



const ProfilePage: NextPage = async () => {
    const userData = await checkAuth()
    return (
        <main>
            <ProfileInfo userData={userData} />
        </main>
    );
};

export default ProfilePage
