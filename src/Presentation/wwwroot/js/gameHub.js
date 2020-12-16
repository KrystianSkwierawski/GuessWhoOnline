var hub = new signalR.HubConnectionBuilder()
    .withUrl('/gameHub')
    .build();

hub.start().then(function () {
}).catch(function (err) {
    return console.error(err.toString());
});

