export declare const userSelect: {
    readonly id: true;
    readonly username: true;
    readonly email: true;
    readonly name: true;
    readonly surname: true;
    readonly bio: true;
    readonly userAvatar: true;
    readonly userCover: true;
    readonly created_at: true;
    readonly updated_at: true;
    readonly role: true;
    readonly password: false;
};
export type UserSelect = typeof userSelect;
