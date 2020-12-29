﻿export interface MatchListItem {
    id: string,
    url: string
    name: string,
    password: string,
}

export const getMatchFullUrl = function (matchId: string): string {
    const currentUrl = window.location.href;

    return `${currentUrl}game/${matchId}`;
};



