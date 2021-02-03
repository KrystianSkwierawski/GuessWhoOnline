export interface MatchListItem {
    id: string,
    url: string
    name: string,
    password: string,
    numberOfConnections: number
}

export const getMatchFullUrl = function (matchId: string): string {
    const domain: string = window.location.host;
    const protocol: string = window.location.protocol;

    const o_fullUrl: string = `${protocol}//${domain}/game/${matchId}`;
    return o_fullUrl
};



