var link = document.getElementById("input");
var button =  document.getElementById("submit");
var output = null;
var counter = 0;
var links = [];


const shownav = ()=>{
    document.getElementById("nav").classList.toggle("display-nav");
    document.getElementById("image").classList.toggle("image-view")
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

const copyTextToClipboard = (text) => {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
        console.error('Async: Could not copy text: ', err);
    });
};

const create_state = (link_a , btn_id)=>{
    var active_states = document.getElementById("active-states");
    let div = document.createElement("div");
    let sub_div = document.createElement("div");
    let button = document.createElement("button");
    let text1 = document.createTextNode(`${link_a}`)
    let text2 = document.createTextNode(`${link.value}`)
    let link1 = document.createElement("a");
    let link2 = document.createElement("a");


    

    link1.appendChild(text1);
    link1.href = `${link_a}`;
    link1.style.color = "hsl(0, 3%, 62%)";
    link2.appendChild(text2);
    link2.href = `${link.value}`;
    link2.style.color = "hsl(180, 66%, 49%)";


    button.id = toString(btn_id);
    button.innerHTML = "Copy";
    button.addEventListener("click" , ()=>{
        button.innerHTML = "Copied!!!";
        button.style.background = "hsl(257, 27%, 26%)";
        copyTextToClipboard(links[btn_id]);
        console.log(links[btn_id])
    })

    div.appendChild(link2);
    sub_div.appendChild(link1);
    sub_div.appendChild(button)
    div.appendChild(sub_div)
    active_states.style.display = "flex";
    active_states.appendChild(div)
}

const submit = ()=>{
    fetch("https://rel.ink/api/links/" , 
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "url" : `${link.value}`
            })
        }
    )
    .then( (response)=>{
        return response.json()
    }
    )
    .then( (data)=> {
        output = "https://rel.ink/" + `${data.hashid}`;
        links.push(output);
        create_state(output,counter);
        counter++;
    });
}



