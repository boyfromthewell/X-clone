interface userId {
    id: string;
}

export interface User {
    id: string;
    nickname: string;
    image: string;
    Followers: userId[];
    _count : {
        Followers:number;
        Followings: number;
    }
}