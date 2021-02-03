export const getMatchFullUrl = function (matchId) {
    const domain = window.location.host;
    const protocol = window.location.protocol;
    const o_fullUrl = `${protocol}//${domain}/game/${matchId}`;
    return o_fullUrl;
};
//# sourceMappingURL=MatchListItem.js.map