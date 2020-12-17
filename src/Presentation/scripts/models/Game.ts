export interface Game {
    id: string,
    name: string,
    password: string,
    hostPlayerConnectionId: string,
    guestPlayerhostConnectionId: string
}

export const getGameUrl = function (gameId: string): string {
    const currentUrl = window.location.href;

    return `${currentUrl}game/${gameId}`;
};



