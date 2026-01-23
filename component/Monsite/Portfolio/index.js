const templateFile = await fetch("component/Monsite/Portfolio/template.html");
const template = await templateFile.text();

const templateProjectFile = await fetch("component/Monsite/Portfolio/templateProject.html");
const templateProject = await templateProjectFile.text();

let Portfolio = {};

Portfolio.formatOneProject = function(title, category, description){
    let card = templateProject;
    card = card.replace("{{title}}", title);
    card = card.replace("{{category}}", category);
    card = card.replace("{{description}}", description);
    return card;
}

Portfolio.format = function(data, css=""){
    let html = template;
    html = html.replace("{{cssClass}}", css);
    html = html.replace("{{subtitle}}", data.subtitle);
    html = html.replace("{{title}}", data.title);

    let liste = "";
    for (let project of data.projects){
        liste += Portfolio.formatOneProject(project.title, project.category, project.description);
    }
    html = html.replace("{{projectsItems}}", liste);
    return html;
}

Portfolio.render = function(where, data, css=""){
    let element = document.querySelector(where);
    element.innerHTML += Portfolio.format(data, css);
}

export {Portfolio};
