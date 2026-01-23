const templateFile = await fetch("component/Monsite/CTA/template.html");
const template = await templateFile.text();

let CTA = {};

CTA.format = function(data, css=""){
    let html = template;
    html = html.replace("{{cssClass}}", css);
    html = html.replace("{{title}}", data.title);
    html = html.replace("{{description}}", data.description);
    html = html.replace("{{button}}", data.button);
    return html;
}

CTA.render = function(where, data, css=""){
    let element = document.querySelector(where);
    element.innerHTML += CTA.format(data, css);
}

export {CTA};
