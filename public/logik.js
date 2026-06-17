/*
window.onload = setup;




let lateinvoc;
let lateinws;

async function loadVoc() {
    try {
        let res = await fetch("latein.json");
        lateinvoc = await res.json();
        
        lateinws = {
            1: lateinvoc.lateinws1,
            2: lateinvoc.lateinws2,
            3: lateinvoc.lateinws3,
            4: lateinvoc.lateinws4,
            5: lateinvoc.lateinws5,
            6: lateinvoc.lateinws6,
            7: lateinvoc.lateinws7,
            8: lateinvoc.lateinws8,
            9: lateinvoc.lateinws9,
            10: lateinvoc.lateinws10,
            11: lateinvoc.lateinws11,
            12: lateinvoc.lateinws12,
            13: lateinvoc.lateinws13,
            14: lateinvoc.lateinws14,
            15: lateinvoc.lateinws15,
            16: lateinvoc.lateinws16,
            17: lateinvoc.lateinws17,
            18: lateinvoc.lateinws18,
            19: lateinvoc.lateinws19,
            20: lateinvoc.lateinws20,
            21: lateinvoc.lateinws21,
            22: lateinvoc.lateinws22,
            23: lateinvoc.lateinws23,
            24: lateinvoc.lateinws24,
            25: lateinvoc.lateinws25,
            26: lateinvoc.lateinws26,
            27: lateinvoc.lateinws27,
            28: lateinvoc.lateinws28,
            29: lateinvoc.lateinws29,
            30: lateinvoc.lateinws30,
            31: lateinvoc.lateinws31,
            32: lateinvoc.lateinws32,
            33: lateinvoc.lateinws33,
            34: lateinvoc.lateinws34,
            35: lateinvoc.lateinws35,
            36: lateinvoc.lateinws36,
            37: lateinvoc.lateinws37,
            38: lateinvoc.lateinws38,
            39: lateinvoc.lateinws39,
            40: lateinvoc.lateinws40,
            41: lateinvoc.lateinws41,
            42: lateinvoc.lateinws42,
            43: lateinvoc.lateinws43,
            44: lateinvoc.lateinws44,
            45: lateinvoc.lateinws45,
            46: lateinvoc.lateinws46,
            47: lateinvoc.lateinws47,
            48: lateinvoc.lateinws48,
            49: lateinvoc.lateinws49,
            50: lateinvoc.lateinws50,
            51: lateinvoc.lateinws51,
            52: lateinvoc.lateinws52,
            53: lateinvoc.lateinws53,
            54: lateinvoc.lateinws54,
            55: lateinvoc.lateinws55,
            56: lateinvoc.lateinws56,
            57: lateinvoc.lateinws57,
            58: lateinvoc.lateinws58,
            59: lateinvoc.lateinws59,
            60: lateinvoc.lateinws60,
            61: lateinvoc.lateinws61,
            62: lateinvoc.lateinws62,
            63: lateinvoc.lateinws63,
            64: lateinvoc.lateinws64,
            65: lateinvoc.lateinws65,
            66: lateinvoc.lateinws66,
            67: lateinvoc.lateinws67,
            68: lateinvoc.lateinws68,
            69: lateinvoc.PhaedrusProlog,
            70: lateinvoc.PhaedrusDerWolfunddasLamm
        }
        
    } catch (err) {
        console.error("Error:", err);
    }
}

async function main() {
    await loadVoc();
    let PhaedrusProlog = lateinvoc.PhaedrusProlog;
    PhaedrusProlog.name = "PhaedrusProlog";
    let PhaedrusDerWolfunddasLamm = lateinvoc.PhaedrusDerWolfunddasLamm;
    PhaedrusDerWolfunddasLamm.name = "PhaedrusDerWolfunddasLamm";
}

//main();


let list = [];
let list2 = [];
let list3 = [];


let e = 0;
let anzahlderwoerter = 0;
let zufallszahl = 0;
let fach1 = 0;
let buch1 = 0;
let wortschatz1 = 0;
let wortschatz2 = 0;
let wortschatz3 = 0;
let wortschatz4 = 0;
let wortschatz5 = 0;
let zähler = 0;

let erstezahl
let zweitezahl

let darkmode = false;

function setup(){
    document.getElementById("falscheVokabelwiederholen").hidden = true;
    document.getElementById("buttzurück").hidden = true;

    document.getElementById("stammformo").hidden = true;
    document.getElementById("deutschlo").hidden = true;
    document.getElementById("buttooko").hidden = true;

    document.getElementById("stammform").hidden = true;
    document.getElementById("deutschl").hidden = true;
    document.getElementById("butook").hidden = true;
}

function toggleTheme(){
    darkmode = !darkmode;
    if (darkmode){
        document.getElementById("darkmode").innerHTML = "Darkmode";
        document.body.style.backgroundColor = "rgb(40,40,40)";
    } else {
        document.getElementById("darkmode").innerHTML = "Lightmode";
        document.body.style.backgroundColor = "white";
    }
    document.body.classList.toggle("darkmode");
    
}

function Vocabulary (){
    fach1 = fach.value;
    buch1 = buch.value;
    buch1 = buch1.replaceAll(" ", "");
    wortschatz1 = wortschatz.value;
    wortschatz1 = wortschatz1.replaceAll(" ", "");
    wortschatz2 = wortschatz1.slice();
    wortschatz3 = wortschatz1.slice();
    wortschatz2 = wortschatz2.replaceAll("WS", "");
    wortschatz2 = wortschatz2.replaceAll(":", "");
    wortschatz4 = wortschatz2.slice();
    wortschatz5 = wortschatz3.slice();
    wortschatz4 = wortschatz4.split(",");
    wortschatz2 = wortschatz2.split("-");
    wortschatz3 = wortschatz3.replaceAll(wortschatz2[0], "");
    wortschatz3 = wortschatz3.replaceAll(wortschatz2[1], "");
    wortschatz3 = wortschatz3.split("-");

    for (let i = 0; i <= wortschatz4.length; i++){
        wortschatz5 = wortschatz5.replace(wortschatz4[i], "");
    }
    wortschatz5 = wortschatz5.split(",");



    console.log(wortschatz4)
    console.log(wortschatz5)
    document.getElementById("fach").hidden = true;
    document.getElementById("buch").hidden = true;
    document.getElementById("wortschatz").hidden = true;
    document.getElementById("ok").hidden = true;
    console.log(buch1)
    if (fach1 == "Latein"){

        document.getElementById("vocabularyList").hidden = true;
        document.getElementById("richtigevocabularyList").hidden = true;
        document.getElementById("stammformo").hidden = false;
        document.getElementById("deutschlo").hidden = false;
        document.getElementById("buttooko").hidden = false;
        document.getElementById("buttzurück").hidden = false;

        if (buch1 == "Adeamus"){
            if(wortschatz2[0] < wortschatz2[1] && wortschatz3[0] == "WS" && wortschatz3[1] == "WS" && wortschatz2[0] >= 1 && wortschatz2[1] <= 68 && wortschatz2[0] <= 68 && wortschatz2[1] >= 1){
                for(let i = wortschatz2[0]; i <= wortschatz2[1]; i++){
                    list.push(...(lateinws[i].slice()));
                    console.log("Moin");
                };
                anzahlderwoerter = list.length;
                zähler = list.length;
                zufall();
            
            }else if(wortschatz5[0] == "WS" && wortschatz4[0] >= 1){
                let x = 0;
                for(let i = 0; i <=wortschatz4.length; i++){
                    if (wortschatz4[i] < 1 && wortschatz4[i] > 68){
                        x = 1;
                    };
                };
                console.log(x);
                if(x != 1){
                    for(let i = 0; i < wortschatz4.length; i++){
                        list.push(...(lateinws[wortschatz4[i]].slice()));
                        console.log(list);
                    };
                    anzahlderwoerter = list.length;
                    zähler = list.length;
                    zufall();
                }else {
                    fehlerbeimEingeben();
                };
            
            
            }else {
                fehlerbeimEingeben();
            };
        }else if(buch1 == "Legamus"){
            let y = 0
            if (wortschatz3.includes("WS")){
                y = 1
            };
            
            if (y != 1){
                if (wortschatz1.includes("-") == false){

                    for(let i = 0; i <= wortschatz4.length; i++){
                        for(let key of Object.keys(lateinws)){
                            if(lateinws[key].name === wortschatz4[i] && lateinws[key].name != undefined){
                                console.log(key)
                                list.push(...(lateinws[key].slice()));
                            };
                        };
                    };

                    if (list.length == 0){
                        fehlerbeimEingeben();
                    }else{
                        anzahlderwoerter = list.length;
                        zähler = list.length;
                        zufall();
                    };

                }else{
                    erstezahl = 0;
                    zweitezahl = 0;
                    for(let key of Object.keys(lateinws)){
                        if(lateinws[key].name === wortschatz2[0]){
                            erstezahl = key;
                        };
                        if (lateinws[key].name === wortschatz2[1]){
                            zweitezahl = key;
                        };
                    };
                    if (erstezahl != undefined && zweitezahl != undefined && erstezahl < zweitezahl &&  wortschatz2.length == 2){
                        for(let i = erstezahl; i <= zweitezahl; i++){
                            list.push(...(lateinws[i].slice()));
                            console.log(list);
                        };
                        anzahlderwoerter = list.length;
                        zähler = list.length;
                        zufall();
                    }else {
                        fehlerbeimEingeben();

                    };
                };
            }else {
                fehlerbeimEingeben();
            };
        }else if(buch1 == "Adeamus-Legamus"){
            for(let key of Object.keys(lateinws)){
                if (lateinws[key].name === wortschatz2[1]){
                    zweitezahl = key;
                };
            };
            if(wortschatz3[0] == "WS" && wortschatz3[1] != "WS" && wortschatz2[0] >= 1 && wortschatz2[0] <= 68 && zweitezahl != undefined && wortschatz2.length == 2){
                for(let i = wortschatz2[0]; i <= zweitezahl; i++){
                    list.push(...(lateinws[i].slice()));
                    console.log(list);
                };
                anzahlderwoerter = list.length;
                zähler = list.length;
                zufall();

            }else{
                fehlerbeimEingeben();
            };
            
        }else if(buch1 == "Adeamus,Legamus" || buch1 == "Adeamus, Legamus"){
            let zahlen = [];
            let string = [];

            for(let item of wortschatz4){
                if (!isNaN(item) && item.trim() != ""){
                    zahlen.push(item);
                    console.log(zahlen);
                }else{
                    string.push(item);
                    console.log(string);
                };
            };

            if (zahlen.length != 0 && string.length != 0){
                for(let i = 0; i < zahlen.length; i++){
                    if (zahlen[i] >= 1 && zahlen[i] <= 68){
                        console.log(lateinws[zahlen[i]]);
                        list.push(...(lateinws[zahlen[i]].slice()));
                    };
                };

                for(let i = 0; i < string.length; i++){
                    for(let key of Object.keys(lateinws)){
                        if(lateinws[key].name === string[i] && lateinws[key].name != undefined){
                            console.log(key)
                            list.push(...(lateinws[key].slice()));
                        };
                    };
                };
                
                console.log(list)
                anzahlderwoerter = list.length;
                zähler = list.length;
                zufall();

                
            }else {
                fehlerbeimEingeben()
            };
        
        }else {
            fehlerbeimEingeben();
        };
    }else {
        fehlerbeimEingeben();
    };


};

function limmer(){
    
    inpst = stammformo.value;
    inpdl = deutschlo.value;
    anzahlderwoerter -= 1;
    vocabularyListe = document.getElementById("vocabularyList");
    vocabularyListe.innerHTML += `<li style = " display: flex; height: 20px; margin-bottom: 6px;">${list[zufallszahl].latein} - ${inpst} - ${inpdl} </li>`;
    richtigevocabularyListe = document.getElementById("richtigevocabularyList");
    richtigevocabularyListe.innerHTML += `<li style = " display: flex; height: 20px; margin-bottom: 6px;">${list[zufallszahl].latein} - ${list[zufallszahl].stammformen} - ${list[zufallszahl].bedeutung} <button type = "button" data-index = "${e}" id = "buttoncounter" + index onclick="counter(this)">X</button> </li>`;
    e+=1;
    list2.push({latein: list[zufallszahl].latein, stammformen: list[zufallszahl].stammformen, bedeutung: list[zufallszahl].bedeutung},);
    list.splice(indz, 1);


    console.log(anzahlderwoerter);

    stammfor = document.getElementById("stammform");
    deutsch = document.getElementById("deutschl");
    stammforo = document.getElementById("stammformo");
    deutscho = document.getElementById("deutschlo");
    console.log(inpst);
    console.log(inpdl);
    console.log(wort);
    console.log(list);
    document.getElementById("stammformo").value = "";
    document.getElementById("deutschlo").value = "";
    zufall();

};


function zufall(){
    document.getElementById("lat").hidden = false;
    document.getElementById("wortanzahl").hidden = false;
    document.getElementById("wortanzahl").textContent = "Anzahl der Vokabeln: " + anzahlderwoerter;
    if (list.length == 0){
        document.getElementById("lat").textContent = "Verbessere nun die Vokabeln";
        document.getElementById("wortanzahl").textContent = "Richtige Vokabeln "+ zähler;
        document.getElementById("stammformo").hidden = true;
        document.getElementById("deutschlo").hidden = true;
        document.getElementById("buttooko").hidden = true;
        document.getElementById("vocabularyList").hidden = false;
        document.getElementById("richtigevocabularyList").hidden = false;


    }else{
        zufallszahl = Math.floor(Math.random() * list.length);
        indz = zufallszahl;
        console.log(zufallszahl);
        console.log(list);
        wort = list[zufallszahl].latein;
        console.log(wort)
        document.getElementById("lat").textContent = wort;
    }
};


function counter(btn){
    zähler -= 1;
    console.log(btn.dataset.index);
    let index = Number(btn.dataset.index);
    console.log(list2);
    list3.push(list2[index]);
    console.log(list3);
    console.log(zähler);
    console.log(btn);
    btn.hidden = true;
    document.getElementById("wortanzahl").textContent = "Richtige Vokabeln " + zähler;
    document.getElementById("falscheVokabelwiederholen").hidden = false;
};

function wiederholen(){
    list = list3.slice();
    list2 = [];
    list3 = [];
    e = 0;

    document.getElementById("vocabularyList").innerHTML = "";
    document.getElementById("richtigevocabularyList").innerHTML = "";

    document.getElementById("falscheVokabelwiederholen").hidden = true;
    document.getElementById("vocabularyList").hidden = true;
    document.getElementById("richtigevocabularyList").hidden = true;
    document.getElementById("stammformo").hidden = false;
    document.getElementById("deutschlo").hidden = false;
    document.getElementById("buttooko").hidden = false;
    document.getElementById("lat").hidden = false;
    document.getElementById("wortanzahl").hidden = false;

    anzahlderwoerter = list.length;
    zähler = list.length;
    zufall();

};


function zurück(){
    fach.value = "";
    buch.value = "";
    wortschatz.value = "";

    list = [];
    list2 = [];
    list3 = [];
    e = 0;

    document.getElementById("vocabularyList").innerHTML = "";
    document.getElementById("richtigevocabularyList").innerHTML = "";

    fehlerbeimEingeben();
    document.getElementById("falscheVokabelwiederholen").hidden = true;
    document.getElementById("vocabularyList").hidden = true;
    document.getElementById("richtigevocabularyList").hidden = true;

};


function fehlerbeimEingeben(){
    document.getElementById("fach").hidden = false;
    document.getElementById("buch").hidden = false;
    document.getElementById("wortschatz").hidden = false;
    document.getElementById("ok").hidden = false;
    document.getElementById("stammformo").hidden = true;
    document.getElementById("deutschlo").hidden = true;
    document.getElementById("buttooko").hidden = true;
    document.getElementById("buttzurück").hidden = true;
    document.getElementById("lat").hidden = true;
    document.getElementById("wortanzahl").hidden = true;
}
*/

let darkmode;
let books;
let selectedBook;
let chapters;
let selectedChapters;

window.onload = setup;

async function setup(){
    darkmode = false;
    
    books = await getBooks();
    let bookSelectCont = document.getElementById("bookselection-cont");
    for (let b of books){
        let button = document.createElement("button");
        button.id = `book:${b}`;
        button.onclick = () => getchapters(b);
        button.innerHTML = b;
        bookSelectCont.appendChild(button);
    }

}

async function getchapters(book){
    document.getElementById("bookselection-cont").style.display = "none";
    document.getElementById("chapterselection-cont").style.display = "flex";

    selectedBook = book;

    const fetchParams = new URLSearchParams({
        book
    });
    
    const response = await fetch(`/api/getchapters?${fetchParams.toString()}`,{
       method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    chapters = data.chapters;
    let chapterselection = document.getElementById("chapterselection");

    for (let c of chapters){
        let line = document.createElement("div");
        line.classList.add("chapterselectline");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `chapter:${c}`;

        let text = document.createElement("label");
        text.innerHTML = c;
        text.htmlFor = `chapter:${c}`;
        
        line.append(checkbox)
        line.appendChild(text);
        chapterselection.appendChild(line);
    }
}

async function getvoc() {
    document.getElementById("chapterselection-cont").style.display = "none";
    selectedChapters = [];
    for (let c of chapters){
        if (document.getElementById(`chapter:${c}`).checked){
            selectedChapters.push(c);
        }
    }
    
    const response = await fetch("/api/getvoc", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            book: selectedBook,
            chapters: selectedChapters
        })
    });

    const data = await response.json();
    console.log(data.voc); //TODO: ask vocab
}

function toggleTheme(){
    darkmode = !darkmode;
    if (darkmode){
        document.getElementById("darkmode").innerHTML = "Darkmode";
        document.body.style.backgroundColor = "rgb(40,40,40)";
    } else {
        document.getElementById("darkmode").innerHTML = "Lightmode";
        document.body.style.backgroundColor = "white";
    }
    document.body.classList.toggle("darkmode");
    
}

async function getBooks(){
    const response = await fetch("/api/getbooks",{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    return data.books;
}

async function testreg(username,password) {
    const response = await fetch("/api/register",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username:username,password:password})
    });

    const data = await response.json();
    console.log(data);
}

async function testlog(username,password) {
    const response = await fetch("/api/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username:username,password:password})
    });

    const data = await response.json();
    console.log(data);
}

/*
async function vocChosen(){
    let subject = document.getElementById("fach").value;
    let book = document.getElementById("buch").value;
    let chapters = document.getElementById("wortschatz").value;

    const fetchParams = new URLSearchParams({
        subject, book, chapters
    });
    const response = await fetch(`/api/getvoc?${fetchParams.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    console.log(data.voc);
}
*/