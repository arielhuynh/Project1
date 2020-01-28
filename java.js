$(document).ready(function() {

    var startLat;
    var startLng;
    var destLat;
    var destLng;
    var destination;
    var startposition;
    var arriveBy;
    var now = moment().format('YYYY-MM-DD');
    console.log(now)
    
    console.log($("#arrivaltime"));
    
    
    $("#submitbtn").click(function() {
        startposition = $("#startposition")[0].value;
        destination = $("#destination")[0].value;
        // arriveBy = Moment($("#arrivaltime", 'YYYY-MM-DDTHH:mm')[0].value)
        arriveBy = now + "T" + $("#arrivaltime")[0].value + ":00";
        console.log(arriveBy)
    
    // Retrieve lat and lon for start position
    var queryURL = "https://us1.locationiq.com/v1/search.php?key=60538281b5df4d&q="+ startposition +"&limit=1&format=json"
    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(start){
        startLat = start[0].lat;
        startLng = start[0].lon;
    
    // Retrieve lat and lon for destination
    var queryURL = "https://us1.locationiq.com/v1/search.php?key=60538281b5df4d&q="+ destination +"&limit=1&format=json"
    
    // arrive at needs to be set to the moment.js converted time for specific format YYYY-MM-DD:hh:mm:ss-hh:mm
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(dest){
        console.log(dest)
    
        destLat = dest[0].lat;
        destLng = dest[0].lon;
    
    var queryURL = "https://api.tomtom.com/routing/1/calculateRoute/"+ startLat +","+ startLng +":"+ destLat +","+ destLng +"/json?instructionsType=text&computeTravelTimeFor=all&arriveAt=" + arriveBy +"&traffic=true&avoid=unpavedRoads&key=AM4KscCuGmaoCSFwdMq22yEw8A43NnN2"
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
    
            let directions = response.routes[0].guidance.instructions;
            let leaveBy = response.routes[0].summary.departureTime;
            console.log(response)
            // $("#lookhere").text("To arrive by " + arriveBy + ", you should leave by " + leaveby)
    
            $("#lookhere").text("To arrive by " + (moment(arriveBy).format('h:mm')) + ", you should leave by " + (moment(leaveBy).format('h:mm')))
            console.log(moment(arriveBy).format('hh:mm'))
    
            

            for (let i = 0; i < directions.length; i++) {
                // $("<p>").attr("index", i).text(directions)
                let pdirections = $("<p>").text(directions[i].message)
                $("#directions").append(pdirections)
                // $("#directions").text(directions[i])
                console.log(directions[i].message)
                
            }
    })
    
    })
    })
    })
    })