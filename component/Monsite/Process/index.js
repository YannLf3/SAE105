const templateFile = await fetch("component/Monsite/Process/template.html");
const template = await templateFile.text();

const templateStepFile = await fetch("component/Monsite/Process/templateStep.html");
const templateStep = await templateStepFile.text();

let Process = {};

Process.formatOneStep = function(number, title, description){
    let step = templateStep;
    step = step.replace("{{number}}", number);
    step = step.replace("{{title}}", title);
    step = step.replace("{{description}}", description);
    return step;
}

Process.format = function(data, css=""){
    let html = template;
    html = html.replace("{{cssClass}}", css);
    html = html.replace("{{subtitle}}", data.subtitle);
    html = html.replace("{{title}}", data.title);

    let liste = "";
    for (let step of data.steps){
        liste += Process.formatOneStep(step.number, step.title, step.description);
    }
    html = html.replace("{{stepsItems}}", liste);
    return html;
}

Process.render = function(where, data, css=""){
    let element = document.querySelector(where);
    element.innerHTML += Process.format(data, css);
}

export {Process};