const templateFile = await fetch("component/Monsite/Footer/template.html");
const template = await templateFile.text();

let Footer = {};

Footer.formatLink = function(name, link) {
    return `<li><a href="${link}">${name}</a></li>`;
}

Footer.formatSocial = function(name, link) {
    return `<li><a href="${link}">${name}</a></li>`;
}

Footer.format = function(data, css="") {
    let html = template;
    html = html.replace("{{cssClass}}", css);
    html = html.replace("{{brand}}", data.brand);
    html = html.replace("{{description}}", data.description);

    // Construction des liens de navigation
    let navLinks = "";
    for (let link of data.navLinks) {
        navLinks += Footer.formatLink(link.name, link.link);
    }
    html = html.replace("{{navLinks}}", navLinks);

    // Construction des liens sociaux
    let socialLinks = "";
    for (let social of data.socialLinks) {
        socialLinks += Footer.formatSocial(social.name, social.link);
    }
    html = html.replace("{{socialLinks}}", socialLinks);

    // Remplacement des informations de contact
    html = html.replace("{{contactEmail}}", data.contactEmail);
    html = html.replace("{{contactPhone}}", data.contactPhone);
    html = html.replace("{{copyright}}", data.copyright);

    return html;
}

Footer.render = function(where, data, css="") {
    let element = document.querySelector(where);
    element.innerHTML += Footer.format(data, css);
}

export {Footer};
