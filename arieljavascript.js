<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Test APIs</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.min.css">
    <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
</head>

    <body>
        <section class="section">
            <div class="container is-fluid">
                <nav class="level">
                    <!-- Left side -->
                    <div class="level-left">
                        <div class="level-item">
                            <p class="subtitle is-5">
                                <strong>123</strong> posts
                            </p>
                        </div>
                        <div class="level-item">
                            <div class="field has-addons">
                                <p class="control">
                                    <input class="input" type="text" placeholder="Find a post">
                                </p>
                                <p class="control">
                                    <button class="button">
                                        Search
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Right side -->
                    <div class="level-right">
                        <p class="level-item"><strong>sample</strong></p>
                        <p class="level-item"><a>sample</a></p>
                        <p class="level-item"><a>sample</a></p>
                        <p class="level-item"><a>sample</a></p>
                        <p class="level-item"><a class="button is-success">New</a></p>
                    </div>
                </nav>
                <h1 class="title">
                    Hello World
                </h1>
                <p class="subtitle">
                    naving the nav with <strong>nav</strong>!
                </p>
            </div>
            <br> <br>
            <div class="columns is-mobile">
                <div class="column is-two-fifths">
                    <input class="input" id="input" type="text" placeholder=" Current Address">
                    <input class="input" id="output" type="text" placeholder="Destination Address">
                </div>
                <div class="column">
                    <div class="control is-exapanded">
                        <div class="time is-fullwidth">
                            <input class="input" id="time" type="text" placeholder="Destination Arrival Time">
                        </div>
                    </div>
                </div>
                <div class="column">
                    <input class="button" type="submit" value="Submit input">
                    <input class="button" type="reset" value="Reset input">
                </div>

            </div>
        </section>
        <section class="section">
            <div class="container is-fluid">
                <nav class="level">
                    <!-- Left side -->
                    <div class="level-left">
                        <div class="level-item">
                            <p class="subtitle is-5">
                                <strong>123</strong> posts
                            </p>
                        </div>
                        <div class="level-item">
                            <div class="field has-addons">
                                <p class="control">
                                    <input class="input" type="text" placeholder="Find a post">
                                </p>
                                <p class="control">
                                    <button class="button">
                                        Search
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Right side -->
                    <div class="level-right">
                        <p class="level-item"><strong>sample</strong></p>
                        <p class="level-item"><a>sample</a></p>
                        <p class="level-item"><a>sample</a></p>
                        <p class="level-item"><a>sample</a></p>
                        <p class="level-item"><a class="button is-success">New</a></p>
                    </div>
                </nav>


            </div>

        </section>


        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script type="text/javascript">

            var currLat;
            var currLng;
            var destLat;
            var destLng;
            var search;
            var arriveBy;



            // Prompt user for permissions to pull current location & pull user's current location
            

            // Click event to call tomtom for departure time
            $(".button").click(function () {
                var search = $("#input")[0].value;

                
                // Call location iq to geocode the location of user's destination
                // function geocode() {
                // var search = prompt("Input an address");
                var queryURL = "https://us1.locationiq.com/v1/search.php?key=60538281b5df4d&q=" + search + "&limit=1&format=json"
                // incorrect var queryURL = "https://us1.locationiq.com/v1/search.php?key=60538281b5df4d&q=1959 NE Pacific St, Seattle, WA 98195&format=json"

                // arrive at needs to be set to the moment.js converted time for specific format YYYY-MM-DD:hh:mm:ss-hh:mm
                var arriveBy = $("#time").value;
                // let arriveBy="2020-01-18T19:30:00-08:00";

                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response)

                    destLat = response[0].lat;
                    destLng = response[0].lon;

            
                    var destAdd = $("#output")[0].value;
                

                    var queryURL2 = "https://us1.locationiq.com/v1/search.php?key=60538281b5df4d&q=" + destAdd + "&limit=1&format=json";

                    $.ajax({
                        url: queryURL2,
                        method: "GET"
                    }).then(function (response) {
                        console.log(response)

                        currLat = response[0].lat;
                        currLng = response[0].lon;
                    

                    console.log("Destination latitude is: " + destLat + " Destination longitude is: " + destLng);
                    console.log(currLat + currLng)

                        var queryURL = "https://api.tomtom.com/routing/1/calculateRoute/" + currLat + "," + currLng + ":" + destLat + "," + destLng + "/json?instructionsType=text&computeTravelTimeFor=all&arriveAt=" + arriveBy + "&traffic=true&avoid=unpavedRoads&key=AM4KscCuGmaoCSFwdMq22yEw8A43NnN2"

                        $.ajax({
                            url: queryURL,
                            method: "GET"
                        }).then(function (response) {

                            let directions = response.routes[0].guidance.instructions;
                            console.log(response)
                            $("#departTime").text("To arrive by " + arriveBy + ", you should leave by " + response.routes[0].summary.departureTime)

                            for (let i = 0; i < directions.length; i++) {
                            //$("#directions").text(directions[i].message).appendTo($("#departTime"))
                                $("#directions").text("Open console log for directions!")
                                console.log(directions[i].message)
                        }   
                    })

                })

                // }
                // currLat=47.759038;
                // currLng=-122.20210709999999;
                // destLat=47.7569199899061;
                // destLng=-122.155356263346;

            })

        </script>

        
    </body>

</html>
