const templateFile = await fetch("component/Monsite/Newsletter/template.html");
const template = await templateFile.text();

let Newsletter = {};

Newsletter.format = function(data, css="") {
    let html = template;
    html = html.replace("{{cssClass}}", css);
    html = html.replace("{{title}}", data.title);
    html = html.replace("{{description}}", data.description);
    html = html.replace("{{placeholder}}", data.placeholder);
    html = html.replace("{{buttonText}}", data.buttonText);
    return html;
}

Newsletter.render = function(where, data, css="") {
    let element = document.querySelector(where);
    element.innerHTML += Newsletter.format(data, css);
}



export {Newsletter};
