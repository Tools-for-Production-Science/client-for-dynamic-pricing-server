export function com(xhttp, store, route, msg)
{

    xhttp.open("POST", store.selectedAdress + route, true);
    xhttp.setRequestHeader("secret", store.secret)
    if (msg)
        xhttp.send(msg);
    else
        xhttp.send();
}