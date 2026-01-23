const templateFile = await fetch("component/Monsite/Achievements/template.html");
const template = await templateFile.text();

const templateItemFile = await fetch("component/Monsite/Achievements/templateItem.html");
const templateItem = await templateItemFile.text();

let Achievements = {};

Achievements.formatOneAchievement = function(icon, year, title, organization){
    let card = templateItem;
    card = card.replace("{{icon}}", icon);
    card = card.replace("{{year}}", year);
    card = card.replace("{{title}}", title);
    card = card.replace("{{organization}}", organization);
    return card;
}

Achievements.format = function(data, css=""){
    let html = template;
    html = html.replace("{{cssClass}}", css);
    html = html.replace("{{subtitle}}", data.subtitle);
    html = html.replace("{{title}}", data.title);

    let liste = "";
    for (let achievement of data.achievements){
        liste += Achievements.formatOneAchievement(
            achievement.icon,
            achievement.year,
            achievement.title,
            achievement.organization
        );
    }
    html = html.replace("{{achievementsItems}}", liste);
    return html;
}

Achievements.render = function(where, data, css=""){
    let element = document.querySelector(where);
    element.innerHTML += Achievements.format(data, css);
}

export {Achievements};