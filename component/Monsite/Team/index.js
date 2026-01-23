const templateFile = await fetch("component/Monsite/Team/template.html");
const template = await templateFile.text();

const templateMemberFile = await fetch("component/Monsite/Team/templateMember.html");
const templateMember = await templateMemberFile.text();

let Team = {};

Team.formatOneMember = function(name, role, avatar, bio){
    let card = templateMember;
    card = card.replace("{{name}}", name);
    card = card.replace("{{role}}", role);
    card = card.replace("{{avatar}}", avatar);
    card = card.replace("{{bio}}", bio);
    return card;
}

Team.format = function(data, css=""){
    let html = template;
    html = html.replace("{{cssClass}}", css);
    html = html.replace("{{subtitle}}", data.subtitle);
    html = html.replace("{{title}}", data.title);

    let liste = "";
    for (let member of data.members){
        liste += Team.formatOneMember(member.name, member.role, member.avatar, member.bio);
    }
    html = html.replace("{{membersItems}}", liste);
    return html;
}

Team.render = function(where, data, css=""){
    let element = document.querySelector(where);
    element.innerHTML += Team.format(data, css);
}

export {Team};