
const query = decodeURIComponent(location.search.slice(1))
let queryParams = new URLSearchParams(query)
let trees = document.querySelectorAll('[tree]')
let contentDiv = document.querySelector('div [content]')
let slogan = document.querySelector('#slogan')
let textGift = document.querySelector('#text-gift')
let formDest = document.querySelector('#form-dest')
let gifts1 = ['um Corola', 'uma viagem para o Hawaii', 'um terreno da lua', '1L de gasolina', 'um beijo', 'um ingresso pro Now United', 'uma Ferrari Monza', 'um outfit Gucci']
let gifts2 = ['um aperto de mão', 'um acarajé na tia do centro', 'um abraço', 'três tapinha nas costas', 'um rolê na praia', 'uma piscadela', 'um CD da Xuxa', 'um cafuné']
let shareList = document.querySelector('.share-list')
let santaClaus = document.querySelector('.santa-claus')
let corpo = document.querySelector('#corpo')
let btnShareWpp = document.querySelector('#share-wpp')
let btnCopy = document.querySelector('#btn-copiar-link')
let remetente = {
    name: queryParams.get('name') || 'Gabriel',
    gift1: gifts1[queryParams.get('gift1')] || 'um Bugatti La Voiture Noire', 
    gift2: gifts2[queryParams.get('gift2')] || 'um abraço'}
const verificaHifen = (e) => {
    return e != '-' ? e : " "
}
    remetente.name = remetente.name.split('').map(verificaHifen).join('').trim()
    remetente.gift1 = remetente.gift1.split('').map(verificaHifen).join('').trim()
    remetente.gift2 = remetente.gift2.split('').map(verificaHifen).join('').trim()


window.onload = () => {
    contentDiv.style.opacity = "1"
    trees[0].setAttribute('tree', 'left')
    trees[1].setAttribute('tree', 'right')
    setTimeout(() => {
        trees[0].remove()
        trees[1].remove()
    }, 3000);
    
    slogan.innerText = `${remetente.name} está te desejando um feliz natal!!!`
    textGift.innerHTML = `${remetente.name} queria te dar ${remetente.gift1}, mas, como é deveras humilde, vai te dar ${remetente.gift2} &#x1F601; `
    
    contentDiv.setAttribute('content', 'started')
    
    for (const key in gifts1) {
        let element1 = document.createElement('option')
        let element2 = document.createElement('option')
        
        element1.value = key
        element1.innerText = gifts1[key]
        formDest['gift1-dest'].appendChild(element1)
        element2.value = key
        element2.innerText = gifts2[key]
        formDest['gift2-dest'].appendChild(element2)
    }
    new ClipboardJS(btnCopy)
}

let screenWidth = window.innerWidth
let screenHeight = window.innerHeight - 10

const canvas = SVG().addTo("body").size(screenWidth, screenHeight)

window.onresize = () => {
    screenWidth = window.innerWidth
    screenHeight = window.innerHeight
    canvas.size(screenWidth, screenHeight)
}

    setInterval(() => {
if (Math.random() < 0.7) {
    setTimeout(() => {
    createStar();
    }, Math.random() * 1000)
}
}, 200)

const createStar = () => {
const x = Math.random() * screenWidth
const y = Math.random() * screenHeight

const size = Math.random() * 10
canvas
    .circle(size)
    .fill("yellow")
    .center(x, y)
    .opacity(0)
    .animate(2000)
    .opacity(1)
    .delay(500)
    .after(function () {
    twinkle(x, y, size)
    this.element().remove()
    })
};

const twinkle = (x, y, size) => {
canvas
    .polygon([0, 0, 10, 2, 12, 12, 14, 2, 24, 0, 14, -2, 12, -12, 10, -2])
    .fill("#f3eccf")
    .center(x, y)
    .scale(size / 10, x, y)
    .animate(1000)
    .scale(size / 3, x, y)
    .opacity(0)
    .after(function () {
    this.element().remove()
    })
}

function shareDrop(){
    shareList.toggleAttribute('drop-down')
}

formDest.onsubmit = (e) =>{
    e.preventDefault()
    const name = formDest.name.value.replace(/\s/g, "-")
    const gift1Dest = formDest['gift1-dest'].value
    const gift2Dest = formDest['gift2-dest'].value
    let link = document.createElement('a')
    let linkToShare = ""
    let textParams = `name=${name}&gift1=${gift1Dest}&gift2=${gift2Dest}`
    console.log(linkToShare)
    if(e.submitter.id == "share-wpp"){
        linkToShare = "whatsapp://send?text=https://feliznatal.github.io/natal2021/?" + encodeURIComponent(textParams)
        link.setAttribute("href", linkToShare)
        link.setAttribute("data-action", "share/whatsapp/share")
        someAsyncMethod('oi').then( () =>{
            window.open(link)
        })
    } else{
        linkToShare = "https://feliznatal.github.io/natal2021/?" + encodeURIComponent(textParams)
        //navigator.clipboard.writeText(linkToShare)
        
        btnCopy.setAttribute('data-clipboard-text', linkToShare)
        btnCopy.click()
        let textCopied = document.createElement('div')
        textCopied.innerText = "link copiado!"
        textCopied.style.display = "absolute"
        btnCopy.insertAdjacentElement("afterend",textCopied)
        setTimeout(() => {
            textCopied.remove()
        }, 1500);
    }
    
}

async function someAsyncMethod(p){
    return await p
}