const templateFile = await fetch("component/Monsite/Testimonials/template.html");
const template = await templateFile.text();

const templateItemFile = await fetch("component/Monsite/Testimonials/templateItem.html");
const templateItem = await templateItemFile.text();

let Testimonials = {};

Testimonials.formatOneTestimonial = function(name, company, avatar, rating, text){
    let card = templateItem;
    card = card.replace("{{name}}", name);
    card = card.replace("{{company}}", company);
    card = card.replace("{{avatar}}", avatar);
    card = card.replace("{{text}}", text);
    
    // étoiles d'avis
    let stars = "";
    for(let i = 0; i < rating; i++){
        stars += "⭐";
    }
    card = card.replace("{{stars}}", stars);
    
    return card;
}

Testimonials.format = function(data, css=""){
    let html = template;
    html = html.replace("{{cssClass}}", css);
    html = html.replace("{{subtitle}}", data.subtitle);
    html = html.replace("{{title}}", data.title);

    let liste = "";
    for (let testimonial of data.testimonials){
        liste += Testimonials.formatOneTestimonial(
            testimonial.name,
            testimonial.company,
            testimonial.avatar,
            testimonial.rating,
            testimonial.text
        );
    }
    html = html.replace("{{testimonialsItems}}", liste);
    return html;
}

Testimonials.render = function(where, data, css=""){
    let element = document.querySelector(where);
    element.innerHTML += Testimonials.format(data, css);
}

export {Testimonials};