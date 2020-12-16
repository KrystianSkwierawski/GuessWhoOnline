export const getGameUrl = function (gameId: string): string {
    const currentUrl = window.location.href;

    return `${currentUrl}game/${gameId}`;
};