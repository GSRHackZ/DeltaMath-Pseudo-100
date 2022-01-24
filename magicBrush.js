// ==UserScript==
// @name         DeltaMath Pseudo 100%
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Tricks your teacher into thinking you got a 100% on assignments. Send teacher a screenshot or video of the results. >_<
// @author       GSRHackZ
// @match        https://www.deltamath.com/*
// @icon         https://www.deltamath.com/images/flav3.png
// @grant        none
// ==/UserScript==

function magicBrush(){
    setInterval(()=>{
        if(document.getElementsByClassName("fa fa-times")[0]!==undefined){
            let all = document.getElementsByClassName("fa");
            for(let i=0;i<all.length;i++){
                if(all[i].classList.contains("fa-times")){
                    all[i].classList.remove("fa-times");
                    all[i].classList.add("fa-check");
                }
            }
        }
        if(document.getElementsByClassName("yoursolution-math")[0]!==undefined){
            if(document.getElementsByClassName("jax col-sm-9 col-xs-12")[1]!==undefined){
                document.getElementsByClassName("yoursolution-math")[0].innerHTML=document.getElementsByClassName("jax col-sm-9 col-xs-12")[1].innerHTML;
            }
        }
        if(document.getElementsByClassName("col-md-10 col-lg-9 student-progress paper-shadow")[0]!==undefined){
            let score = document.getElementsByClassName("col-md-10 col-lg-9 student-progress paper-shadow")[0].children[0].children[0].children[0];
            let max = score.innerText.split("/")[1]
            score.innerText = `${max}/${max}`;
            document.getElementsByClassName("col-md-10 col-lg-9 student-progress paper-shadow")[0].children[0].children[1].innerText=`Score: ${max}`;
        }
        if(document.getElementsByClassName("complete-area")[0]!==undefined){
            document.getElementsByClassName("complete-area")[0].children[0].innerText="Complete: 100%";
        }
    },1)
    if(document.getElementsByClassName("student-page-div")[2]!==undefined){
        document.getElementsByClassName("nolate")[0].remove();
        let panel = document.getElementsByClassName("student-page-div")[2];
        let rows = document.getElementsByClassName("panel");
        let bad_ones = constantClean(rows);
        let done=false;
        setInterval(()=>{
            if(bad_ones.length>0&&!done){
                done=true;
                for(let i=0;i<bad_ones.length;i++){
                    // Deals with outerpart
                    let txt = rows[bad_ones[i]].children[0].children[1].children[0].innerText;
                    if(!txt.includes("/")){
                        rows[bad_ones[i]].children[0].children[1].children[0].innerText="100%";
                    }
                    else{
                        let temp="";
                        let all = rows[bad_ones[i]].children[0].children[1].children[0].innerText.split(" ");
                        let max = rows[bad_ones[i]].children[0].children[1].children[0].innerText.split(" ")[0].split("/")[1];
                        temp+=`(${max}/${max}) ${all[1]} `;
                        rows[bad_ones[i]].children[0].children[1].children[0].innerText=temp;
                        rows[bad_ones[i]].children[0].children[1].children[1].innerText="100%";
                    }
                    // changes  outer_innerPart (list of questions not seperate) so all questions seem answered...
                    let quests = rows[bad_ones[i]].children[1].children[0].children;
                    for(let j=0;j<quests.length;j++){
                        let name = quests[j].children[0];
                        let score = quests[j].children[1];
                        setInterval(()=>{
                            name.children[0].className="fa completed fa-check gray-out-max-probs";
                            name.children[0].style="color:#080";
                        },1)
                        if(!name.children[1].innerText.includes(" (done)")){
                            name.children[1].innerText+=" (done)";
                        }
                        if(score.innerText.includes("%")){
                            score.innerText="100%";
                        }
                        else{
                            let points = score.innerText.split(" ")[0].split("/");
                            let temp = "";
                            temp+=`${points[1]}/${points[1]} points`;
                            score.innerText=temp;
                            score.innerText=score.innerText.replace("\t","")
                        }
                    }
                }
            }
        },100)
        return true;
    }
}
smartExec(magicBrush,100)
function constantClean(rows){
    let bad = []
    setInterval(()=>{
        for(let i=0;i<rows.length;i++){
            if(rows[i].classList.contains("panel-danger")){
                bad.push(i-1);
                rows[i].classList.remove("panel-danger");
                rows[i].classList.add("panel-success");
            }
        }
    },1)
    return bad;
}
function smartExec(func,wait){
    let exec = setInterval(()=>{
        if(func()){
            clearInterval(exec)
        }
    },wait)}
