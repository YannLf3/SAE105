const templateFile = await fetch("/component/Product/template.html");
const template = await templateFile.text();

const templateLiFile = await fetch("/component/Product/templateLi.html");
const templateLi = await templateLiFile.text();

let Product = {};

Product.formatOneItem = function(image, title, button){
    let li = templateLi;
    li = li.replace("{{image}}", image);
    li = li.replace("{{title}}", title);
    li = li.replace("{{title}}", title);
    li = li.replace("{{button}}", button);
    return li;
}

Product.format = function(data, css=""){
    let html = template;

    html = html.replace("{{cssClass}}", css);

    let liste = "";
    for (let item of data.products){
        let tpl_formate = Product.formatOneItem(item.image, item.title, item.button);
        liste += tpl_formate;
    }
    html = html.replace("{{productItems}}", liste);
    return html;
}

Product.render = function(where, data, css=""){
    let element = document.querySelector(where);
    element.innerHTML += Product.format(data, css);
}

export {Product};