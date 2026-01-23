const templateFile = await fetch("/component/Showcase3/template.html");
const template = await templateFile.text();

const templateFeaturedFile = await fetch("/component/Showcase3/templateFeatured.html");
const templateFeatured = await templateFeaturedFile.text();

const templateMediumFile = await fetch("/component/Showcase3/templateMedium.html");
const templateMedium = await templateMediumFile.text();

const templateSmallFile = await fetch("/component/Showcase3/templateSmall.html");
const templateSmall = await templateSmallFile.text();

let Showcase = {};

Showcase.formatOneItem = function(item){
    if (item.layout === "featured") {
        let html = templateFeatured;
        html = html.replace("{{image}}", item.image);
        html = html.replace("{{title}}", item.title);
        html = html.replace("{{title}}", item.title);
        html = html.replace("{{description}}", item.description);
        html = html.replace("{{button}}", item.button);
        return html;
    } 
    else if (item.layout === "medium") {
        let html = templateMedium;
        html = html.replace("{{image}}", item.image);
        html = html.replace("{{title}}", item.title);
        html = html.replace("{{button}}", item.button);
        return html;
    } 
    else if (item.layout === "small") {
        let html = templateSmall;
        html = html.replace("{{image}}", item.image);
        html = html.replace("{{title}}", item.title);
        html = html.replace("{{title}}", item.title);
        html = html.replace("{{button}}", item.button);
        return html;
    }
    return "";
}

Showcase.format = function(data, css=""){
    let html = template;

    html = html.replace("{{cssClass}}", css);

    let liste = "";
    // data est directement un array d'items ==>> évite l'erreur d'avant data.items dans la console qui empêchait l'affichage de la page
    for (let item of data){
        let tpl_formate = Showcase.formatOneItem(item);
        liste += tpl_formate;
    }
    html = html.replace("{{showcaseItems}}", liste);
    return html;
}

Showcase.render = function(where, data, css=""){
    let element = document.querySelector(where);
    element.innerHTML += Showcase.format(data, css);
}

export {Showcase};