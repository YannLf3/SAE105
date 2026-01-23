const templateFile = await fetch("component/Monsite/Services/template.html");
const template = await templateFile.text();

const templateItemFile = await fetch("component/Monsite/Services/templateItem.html");
const templateItem = await templateItemFile.text();

let Services = {};

Services.formatOneItem = function(icon, title, description){
    let item = templateItem;
    item = item.replace("{{icon}}", icon);
    item = item.replace("{{title}}", title);
    item = item.replace("{{description}}", description);
    return item;
}

Services.format = function(data, css=""){
    let html = template;
    html = html.replace("{{cssClass}}", css);
    html = html.replace("{{subtitle}}", data.subtitle);
    html = html.replace("{{title}}", data.title);

    let liste = "";
    for (let service of data.services){
        liste += Services.formatOneItem(service.icon, service.title, service.description);
    }
    html = html.replace("{{servicesItems}}", liste);
    return html;
}

Services.render = function(where, data, css=""){
    let element = document.querySelector(where);
    element.innerHTML += Services.format(data, css);
}

export {Services};
