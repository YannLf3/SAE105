const templateFile = await fetch("component/Monsite/PricingTable/template.html");
const template = await templateFile.text();

const templatePlanFile = await fetch("component/Monsite/PricingTable/templatePlan.html");
const templatePlan = await templatePlanFile.text();

let PricingTable = {};

PricingTable.formatOnePlan = function(name, price, period, description, features, button){
    let html = templatePlan;
    html = html.replace("{{name}}", name);
    html = html.replace("{{price}}", price);
    html = html.replace("{{period}}", period);
    html = html.replace("{{description}}", description);
    html = html.replace("{{button}}", button);
    
    let featuresList = "";
    for(let feature of features){
        featuresList += `<li class="pricing-table__plan-feature">${feature}</li>`;
    }
    html = html.replace("{{features}}", featuresList);
    
    return html;
}

PricingTable.format = function(data, css=""){
    let html = template;
    html = html.replace("{{cssClass}}", css);
    html = html.replace("{{subtitle}}", data.subtitle);
    html = html.replace("{{title}}", data.title);

    let liste = "";
    for (let plan of data.plans){
        liste += PricingTable.formatOnePlan(
            plan.name,
            plan.price,
            plan.period,
            plan.description,
            plan.features,
            plan.button
        );
    }
    html = html.replace("{{plansItems}}", liste);
    return html;
}

PricingTable.render = function(where, data, css=""){
    let element = document.querySelector(where);
    element.innerHTML += PricingTable.format(data, css);
}

export {PricingTable};