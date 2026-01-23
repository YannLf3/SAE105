const templateFile = await fetch("component/Monsite/Clients/template.html");
const template = await templateFile.text();

const templateClientFile = await fetch("component/Monsite/Clients/templateClient.html");
const templateClient = await templateClientFile.text();

let Clients = {};

Clients.formatOneClient = function(name, logo){
    let card = templateClient;
    card = card.replace("{{name}}", name);
    card = card.replace("{{logo}}", logo);
    return card;
}

Clients.format = function(data, css=""){
    let html = template;
    html = html.replace("{{cssClass}}", css);
    html = html.replace("{{subtitle}}", data.subtitle);
    html = html.replace("{{title}}", data.title);

    let liste = "";
    for (let client of data.clients){
        liste += Clients.formatOneClient(client.name, client.logo);
    }
    html = html.replace("{{clientsItems}}", liste);
    return html;
}

Clients.render = function(where, data, css=""){
    let element = document.querySelector(where);
    element.innerHTML += Clients.format(data, css);
}

export {Clients};