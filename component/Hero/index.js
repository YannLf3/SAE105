const templateFile = await fetch("component/Hero/template.html");
const template = await templateFile.text();

let Hero = {}; 

Hero.format = function(data, css=""){
    let html = template;

    html = html.replace("{{cssClass}}", css);
    html = html.replace("{{Title}}", data.Title);
    html = html.replace("{{TopSubtitle}}", data.TopSubtitle);
    html = html.replace("{{Description}}", data.Description);
    html = html.replace("{{Button}}", data.Button);
    
    return html;
}

Hero.render = function(where, data, css=""){
    let element = document.querySelector(where);
    element.innerHTML += Hero.format(data, css);
}

export {Hero};