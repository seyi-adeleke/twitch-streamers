/**
 * Created by seyi adeleke on 6/12/2016.
 */
$(document).ready(function(){
    var streamers =
        ["ESL_SC2","OgamingSC2","cretetion","freecodecamp","storbeck","habathcx","RobotCaleb","noobs2ninjas","brunofin","comster404"];

    var twitchCallBack= function(){
        var url ="https://api.twitch.tv/kraken/streams/" + streamers[i] + "?callback=?";
        $.ajax({
            url:url,
            dataType:'jsonp',
            type:"GET",
            success:function(data){
                // check if user is online or offline or has been deleted
                if(data.stream === null){
                    updateOffline(data);
                }
                else if(data.message){
                    updateDeleted(data);
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
            $("#online").append("<div class=\"online-well well container-fluid\">"+"<img  class=img-circle src="+ data.stream.channel.logo +">"+"<p>"+"<a target='_blank' href="+
                data.stream.channel.url + ">" + data["stream"]._links["self"].substr(37)+": "+
                data.stream.game +" "+"("+data.stream.viewers+"<i class='fa fa-eye'></i>"+")"+"</a>"+"</p>"+"</div>");

        };

        var updateOffline = function(data) {
            var offlineUrl = data._links.channel;
            $.ajax({
                url:offlineUrl,
                dataType:"jsonp",
                type:"GET",
                success:function(offlineData){
                    console.log(url + " " + "is offline")
                    $("#offline").append("<div class=\"offline-well well container-fluid\">"+"<img  class=img-circle src="+ offlineData.logo +">"+"<p>"+"<a target='_blank' href="
                        + offlineData.url+">"+
                        data["_links"].self.substr(37)+"</a>"+"</p>"+"</div>");

                },
                error:function(){
                    console.log("error");
                }

            });


        };
        var updateDeleted = function(data){
            console.log(url + " "+"does not exist");
            $("#deleted-user").append("<div  class=\"deleted-well well container-fluid\">"+"<img  class=img-circle src='http://66.media.tumblr.com/0a049264fba0072a818f733a6c533578/tumblr_mqvlz4t5FK1qcnibxo1_500.png'>"+"<p>" +
                data.message+"</p>"+"</div>");
        }
    };
    // loop through users
    for (var i = 0; i < streamers.length; i++){
         twitchCallBack()
        }

    $("#all-btn").click(function(){
            $("#online").show(1000);
            $("#offline").show(1000);
            $("#deleted-user").show(1000);
        });

    $("#offline-btn").click(function(){
            $("#online").hide(1000);
            $("#deleted-user").hide(1000);
            $("#offline").show(1000);
        });

    $("#online-btn").click(function(){
            $("#offline").hide(1000);
            $("#deleted-user").hide(1000);
            $("#online").show(1000);
         });
    });

