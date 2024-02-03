var playerDetailsDiv=document.getElementById('playerDetails');
var anonymousId;
function onsignup(){
    var name_=document.getElementById('id1').value;
    var dob_=document.getElementById('id2').value;
    var imgUrl_=document.getElementById('id3').value;
    var bp_=document.getElementById('id4').value;
    var career_=document.getElementById('id5').value;
    var matches_=document.getElementById('id6').value;
    var score_=document.getElementById('id7').value;
    var fifties_=document.getElementById('id8').value;
    var centuries_=document.getElementById('id9').value;
    var wickets_=document.getElementById('id10').value;
    var average_=document.getElementById('id11').value;

    let myObj={
        name: name_,
        dob: dob_,
        imgUrl: imgUrl_,
        birthPlace: bp_,
        career: career_,
        matches: matches_,
        score: score_,
        fifties: fifties_,
        centuries: centuries_,
        wickets: wickets_,
        average: average_
    };
    if(anonymousId == undefined){
        axios.post('http://localhost:5000/insert-cricket',myObj)
        .then((res)=> console.log(res))
        .catch((err)=> console.log(err)); 
    }
    else{
        axios.put(`http://localhost:5000/update-cricket/${anonymousId}`,myObj)
        .then((res)=> console.log(res))
        .catch((err)=> console.log(err));  
    }
}

function search(){
    var player_=document.getElementById('query').value;
    console.log("searching...");
    axios.get(`http://localhost:5000/get-cricket/${player_}`)
    .then((result)=> {
        console.log(result);
        playerDetailsDiv.innerHTML=''
        if(result.data!=""){
            displayPlayer(result.data)
        }
    })
    .catch((err)=> console.log(err));
}

function displayPlayer(myObj){
    playerDetailsDiv.innerHTML=`
    <div class="container ">
        <div class="row">
            <div class="col-md-5">
                <img src="${myObj.imgUrl}" alt="Responsive image" class="image-container img-fluid">
            </div>
            <div class="col-md-6">
                <h1 id="playerName">${myObj.name}</h1>
                <p class="text-muted mb-4">${myObj.career}</p>
            </div>
            <div class="col-md-1">
                <button class="btn btn-danger" onClick="editPlayer()" class="edit">Edit</button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-5">
                <h2 class="font-weight-bold">Personal Information</h2>
                <br>
                <div class="row">
                    <div class="col-md-4">
                        <p class="font-weight-bold">Born</p>
                    </div>
                    <div class="col-md-8">
                        <p>${myObj.dob}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <p class="font-weight-bold">BirthPlace</p>
                    </div>
                    <div class="col-md-8">
                        <p>${myObj.birthPlace}</p>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <br>
        <div class="row">
            <div class="col-md-5">
                <h2 class="font-weight-bold">Statistics</h2>
                <br>
                <div class="row">
                    <div class="col-md-4">
                        <p class="font-weight-bold">Matches</p>
                    </div>
                    <div class="col-md-8">
                        <p>${myObj.matches}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <p class="font-weight-bold">Runs</p>
                    </div>
                    <div class="col-md-8">
                        <p>${myObj.score}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <p class="font-weight-bold">Fifties</p>
                    </div>
                    <div class="col-md-8">
                        <p>${myObj.fifties}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <p class="font-weight-bold">Centuries</p>
                    </div>
                    <div class="col-md-8">
                        <p>${myObj.centuries}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <p class="font-weight-bold">Wickets</p>
                    </div>
                    <div class="col-md-8">
                        <p>${myObj.wickets}</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <p class="font-weight-bold">Average</p>
                    </div>
                    <div class="col-md-8">
                        <p>${myObj.average}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    `
    document.getElementById('id12').scrollIntoView();

}

function editPlayer(){
    var playerName=document.getElementById("playerName").textContent;

    axios.get(`http://localhost:5000/get-cricket/${playerName}`)
    .then((result)=> {
        var myObj=result.data;
        console.log(myObj);
        anonymousId=myObj.id;
        document.getElementById("id1").value=myObj.name;
        document.getElementById("id2").value=myObj.dob;
        document.getElementById("id3").value=myObj.imgUrl;
        document.getElementById("id4").value=myObj.birthPlace;
        document.getElementById("id5").value=myObj.career;
        document.getElementById("id6").value=myObj.matches;
        document.getElementById("id7").value=myObj.score;
        document.getElementById("id8").value=myObj.fifties;
        document.getElementById("id9").value=myObj.centuries;
        document.getElementById("id10").value=myObj.wickets;
        document.getElementById("id11").value=myObj.average;
        document.getElementById('form').scrollIntoView();


    })
    .catch((err)=> console.log(err));      
}
