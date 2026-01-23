const templateFile = await fetch("/component/Navigation3/template.html");
const template = await templateFile.text();

const templateFile2 = await fetch("/component/Navigation3/templateLi.html");
const templateLi = await templateFile2.text();

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
    html = html.replace("{{title}}", data.title);

    let liste = "";
    for (let m of data.menus){
        let tpl_formate = Navigation.formatOneMenu(m.name, m.link);
        liste += tpl_formate;
    }
    html = html.replace("{{menuItems}}", liste);
    return html;
}

Navigation.render = function(where, what, css=""){
    let element = document.querySelector(where);
    element.innerHTML += Navigation.format(what, css);
}

export {Navigation};