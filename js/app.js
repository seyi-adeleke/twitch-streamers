/**
 * Created by seyi adeleke on 6/12/2016.
 */
$(document).ready(function(){
    var streamers =
        ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    var twitchCallBack= function(){
        var url ="https://api.twitch.tv/kraken/streams/" + streamers[i] + "?callback=?"
        $.ajax({
            url:url,
            dataType:'jsonp',
            type:"GET",
            success:function(data){
                // check if user is online or offline
                if(data["stream"] === null){
                    updateOffline(data);
                }
                else
                {
                    updateOnline(data);
                }
            },
            error:function(){
                console.log("error");
            }
        });
        //update DOM
        var updateOnline = function(data){
            console.log(url + " " + "is online");
            $("#online").prepend('<img>',{id:"online-logo",src:data.logo});
            $("#online").append("<p>"+ data["stream"]._links["self"].substr(37) +"</p>");
        };

        var updateOffline = function(data) {
            console.log(url + " " + "is offline");

            $("#offline").append(" <p>"+ data["_links"].self.substr(37)+"</p>");

        };



    };
    for (var i = 0; i < streamers.length; i++){
         twitchCallBack()
        }
    });

