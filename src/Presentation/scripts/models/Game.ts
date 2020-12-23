export interface Game {
    id: string,
    url: string
    name: string,
    password: string,
}

export const getGameFullUrl = function (gameId: string): string {
    const currentUrl = window.location.href;

    return `${currentUrl}game/${gameId}`;
};



