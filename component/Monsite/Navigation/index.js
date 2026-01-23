const templateFile = await fetch("component/Monsite/Navigation/template.html");
const template = await templateFile.text();

const templateLiFile = await fetch("component/Monsite/Navigation/templateLi.html");
const templateLi = await templateLiFile.text();

let Navigation = {};

Navigation.formatOneMenu = function(name, link){
    let li = templateLi;
    li = li.replace("{{name}}", name);
    li = li.replace("{{link}}", link);
    return li;
}

Navigation.format = function(data, css=""){
    let html = template;
    html = html.replace("{{cssClass}}", css);
    html = html.replace("{{brand}}", data.brand);

    let liste = "";
    for (let m of data.menus){
        liste += Navigation.formatOneMenu(m.name, m.link);
    }
    html = html.replace("{{menuItems}}", liste);
    return html;
}

Navigation.render = function(where, what, css=""){
    let element = document.querySelector(where);
    element.innerHTML += Navigation.format(what, css);
}

export {Navigation};
