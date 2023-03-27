let floats = Array.from(document.getElementsByClassName("floatText"))

let css = ".floatText span{\n\
    display: inline-block;\
    white-space: pre;\
    transition: 0.5s all;\
}"

var style = document.createElement('style');

if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

document.getElementsByTagName('head')[0].appendChild(style);

for(let k = 0; k < floats.length; k++){
    element = floats[k]

    let innerText = element.innerText.split("")
    
    element.innerHTML = ""
    let css = ""

    for(let i = 0; i < innerText.length; i++){
        let span = document.createElement("span")
        span.innerText = innerText[i]
        element.appendChild(span)
        css += getStyle(i, k, innerText.length)
        
    }

    var style = document.createElement('style');

    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);
}

function getStyle(i, k, length){
    let x = (i / length) - 0.5
    if(x >= 0){
        x += 0.5
    }else if(x < 0){
        x -= 0.5
    }

    let y = Math.random() - 0.5
    if(y >= 0){
        y += 0.5
    }else if(y < 0){
        y -= 0.5
    }

    x *= 0.5
    y *= 0.5

    let rotate = Math.random() * 0.5 - 0.25
    
    return ".floatText:nth-child("+ (1 * k + 1) +") span:nth-child(" + (1 * i + 1) +"){\n" +
    "transform: translateX(" + x + "em) translateY(" + y + "em) rotate(" + rotate + "turn);\n}\n\n\
    .floatText:nth-child("+ (1 * k + 1) +"):hover span:nth-child(" + (1 * i + 1) +"){\n" +
    "transform: translateX(" + x + "em)  translateY(" + y + "em)" +
    "translateX(" + (0-x) + "em) translateY(" + (0-y) + "em)" + "rotate(" + rotate + "turn)" + "rotate(" + (0 - rotate) + "turn);\n}\n\n"
}



const symbols = '#$%&/0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~'
let obfuscatedElements = Array.from(document.getElementsByClassName("obfuscatedText"))

css = ".obfuscatedText{\
    font-family: monospace;\
}"

var style = document.createElement('style');

if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

document.getElementsByTagName('head')[0].appendChild(style);

obfuscatedElements.forEach(element => {
    element.setAttribute("data-original", element.innerText)

    let innerText = element.innerText

    element.innerHTNL = "";

    for(let i = 0; i < innerText.length; i++){
        let span = document.createElement("span")
        span.innerText = innerText[i]
        element.appendChild(span)
    }

    obfsLetter(element, 0, 10)
    element.addEventListener("click", eventListenerFunction)
});

function eventListenerFunction(event){
    element = event.target
    unobfsLetter(element, 0, 50)
    element.removeEventListener("click", eventListenerFunction)
}

// function placeLetter(element, i, symbol){
//     let innerText = element.innerText
//     innerText = innerText.split("")
//     innerText[i] = symbol
//     let text = ''
//     innerText.forEach(element => {
//         text += element
//     })
//     element.innerText = text;
// }

function placeLetter(element, i, symbol){
    let span = element.childNodes[i];
    span.innerHTML = symbol;
}

function obfsLetter(element, i, timeout = 50){
    placeLetter(element, i, symbols[Math.ceil(Math.random() * (symbols.length-1))])
    setTimeout(()=>{
        if(i < element.dataset.original.length - 1){
            obfsLetter(element, i + 1, timeout)
        }
    }, timeout)
    
}

function unobfsLetter(element, i, timeout = 50){
    placeLetter(element, i, element.dataset.original[i])
    setTimeout(() => {
        if(i < element.dataset.original.length - 1){
            obfsLetter(element, i + 1, 0)
            unobfsLetter(element, i + 1, timeout)
        }
    }, timeout)
}

function unobfsLetterWithoutObfs(element, i, timeout = 50){
    placeLetter(element, i, element.dataset.original[i])
    setTimeout(() => {
        if(i < element.dataset.original.length - 1){
            unobfsLetterWithoutObfs(element, i + 1, timeout)
        }
    }, timeout)
}