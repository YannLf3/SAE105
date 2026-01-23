const templateFile = await fetch("component/Monsite/About/template.html");
const template = await templateFile.text();

let About = {};

About.format = function(data, css=""){
    let html = template;
    // Remplace les placeholders avec les données du composant
    html = html.replace("{{cssClass}}", css);
    html = html.replace("{{subtitle}}", data.subtitle);
    html = html.replace("{{title}}", data.title);
    html = html.replace("{{description}}", data.description);

    // Construit la chaîne des statistiques
    let stats = "";
    // Parcourt chaque statistique
    for (let stat of data.stats){
        // Génère le HTML pour chaque statistique ==> ${} comme en cours
        stats += `<div class="about__stat"><span class="about__stat-value">${stat.value}</span><span class="about__stat-label">${stat.label}</span></div>`;
    }
    html = html.replace("{{statsItems}}", stats);

    return html;
}

About.render = function(where, data, css=""){
    let element = document.querySelector(where);
    element.innerHTML += About.format(data, css);
}

export {About};
