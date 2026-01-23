const templateFile = await fetch("/component/Test/template.html");
const template = await templateFile.text();

let About = {};

About.format = function(data, css=""){
    let html = template;

    html = html.replace("{{cssClass}}", css);
    html = html.replace("{{title}}", data.title);
    html = html.replace("{{titleAccent}}", data.titleAccent);
    html = html.replace("{{titleEnd}}", data.titleEnd);
    html = html.replace("{{description}}", data.description);

    return html;
}

About.render = function(where, data, css=""){
    let element = document.querySelector(where);
    element.innerHTML += About.format(data, css);
}

export {About};