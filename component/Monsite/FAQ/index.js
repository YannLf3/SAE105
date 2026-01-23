const templateFile = await fetch("component/Monsite/FAQ/template.html");
const template = await templateFile.text();

const templateQuestionFile = await fetch("component/Monsite/FAQ/templateQuestion.html");
const templateQuestion = await templateQuestionFile.text();

let FAQ = {};

FAQ.formatOneQuestion = function(question, answer){
    let item = templateQuestion;
    item = item.replace("{{question}}", question);
    item = item.replace("{{answer}}", answer);
    return item;
}

FAQ.format = function(data, css=""){
    let html = template;
    html = html.replace("{{cssClass}}", css);
    html = html.replace("{{subtitle}}", data.subtitle);
    html = html.replace("{{title}}", data.title);

    let liste = "";
    for (let q of data.questions){
        liste += FAQ.formatOneQuestion(q.question, q.answer);
    }
    html = html.replace("{{questionsItems}}", liste);
    return html;
}

FAQ.render = function(where, data, css=""){
    let element = document.querySelector(where);
    element.innerHTML += FAQ.format(data, css);
}

export {FAQ};