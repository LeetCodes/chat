const login = require("facebook-chat-api");
var UserID="";
var temp = 0;
var request = require("request");
var Ten ="";
var beauty ="";
var Nguoiquen = true;
var first = "";
var today = new Date();
var h = today.getHours();
var IDbot = "986172468121343";
var botweather = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D1252431%20and%20u%20%3D%22c%22%20&format=json&diagnostics=true&callback=";
const readline = require("readline");
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



login({email: "minhnghia.nguyencong", password: "TeaPeps!"}, (err, api) => 
{
    if(err) 
    {
        switch (err.error) 
        {
            case 'login-approval':
                console.log('Enter code > ');
                rl.on('line', (line) => 
                {
                    err.continue(line);
                    rl.close();
                });
                break;
            default:
                console.error(err);
        }
        return;
    }
    
    var d = new Date();
    var h =  d.getHours();
    
    api.listen((err, message) => {
                if (message.senderID != IDbot)
                    api.getUserInfo(message.senderID, function(err, ret) 
                    {
                        if (err) return console.error(err);
                  	    for (var prop in ret) 
                  		if (ret.hasOwnProperty(prop) && ret[prop].name) 
                  	        console.log(ret[prop].name + ": "+message.body);
                    });
                    // console log
                
                if (typeof message.body == "string"&&(message.body.indexOf("Thời tiết") != -1||message.body.indexOf("thời tiết") != -1)&&(message.body.indexOf("hôm nay") != -1||message.body.indexOf( "Hôm nay")!= -1||message.body.indexOf("thế nào") != -1))
                {
                    request(botweather,  
                    function(error,query, body)
                    {  
                    	if (error) api.sendMessage("Tao đang đơ, không trả lời được :)", message.threadID);
                    	var ans = JSON.parse(body);
                    	var temp = ans.query.results.channel.item.condition.temp;
                    	var weather = ans.query.results.channel.item.condition.text;
                    	var date = ans.query.results.channel.item.condition.date;
                    	api.sendMessage("Date: " + date + "\nWeather: "+weather+"\nTemperature: "+temp+"°C",message.senderID);
                    	
                    	if (weather === "Rain" || weather === "Showers"||weather === "Rainy") 
                    	    api.sendMessage("Bé điệu: Ra đường nhớ mang thêm áo mưa nhỏ nhé :) :)",message.senderID);
                    	else if (weather === "Sun" || weather === "Sunny"|| weather === "Hot") 
                    	    api.sendMessage("Bé điệu: Ra đường nhớ mang mũ nhé nắng lắm đấy coi chừng đen da hí hí!",message.senderID);
                    	else if (weather === "Cool" || weather === "Freezing" || temp < 22) 
                    	    api.sendMessage("Bé điệu: Trời dạo này lạnh rồi ra đường nhớ mang áo ấm đấy nhé <3<3<3",message.senderID);
                    });
                }
                
                //API thời tiết
                
                else if (first != message.senderID && message.senderID != IDbot)
                {	
                	//api.sendMessage("Bé điệu: Tin nhắn được trả lời bởi bot "\bé điệu"\ dễ thương cute hột me!", message.senderID);
                    switch (message.senderID)
                	{
                		case "100013425663113" : 
                	    	  Ten = "É"; break;
                		case "100008782805886" : 
                		    Ten = "Phát Rẫy"; break;
                		case "100005125536544" : 
                  		    Ten = "chị Mai"; break;
                  		case "100003197155600" : 
                  		    Ten = "9 Tô"; break;
                  		case "100007862672818" : 
                  		    Ten = "Hằng lùn"; break;
                  		case "100004645635674" : 
                  		    Ten = "vi";	break;
                  		case "100013696271630" : 
                  		    Ten = "Beck đen"; break;
                  		case "100005305591730" : 
                  		    Ten = "Kiệt lu"; break;
                  		case "100005937787223" : 
                  		    Ten = "Nguyên đại ca"; break;
                  		case "100004514681387" : 
                  		    Ten = "Đinh ba phân"; break;
                  		case "100004988885304" : 
                  		    Ten = "Duy lai chinh"; break;
                  		case "100005541483137" : 
                  		    Ten = "Hải"; break;
                  		case "100014580245024" : 
                  		    Ten = "8 cá"; break;
                  		case "100021404624867" : 
                  		    Ten = "Dương cuteo"; break;
                  		case "100004368812438" : 
                  		    Ten = "chú Lí";	break;
                  		case "100004894204003" : 
                  		    Ten = "cu Bo"; break;
                  		case "100004155730334" : 
                  		    Ten = "cu Ti"; break;
                  		case "100005157213354" : 
                  		    Ten = "Diễm Trinh";	break;
                  		case "100007549170993" : 
                  		    Ten = "cu Duy";	break;
                  		case "100014047218732" : 
                  		    Ten = "Thơ thum thủm"; break;
                  		case "100006258226840" : 
                  		    Ten = "Nghĩa địa"; break;
                  		
                  		default: 
                  		    Nguoiquen = false;
                  	}
                  	//User ID người quen
                  	
                    api.getUserInfo(message.senderID, function(err, ret) 
                  	{
                    	if (err) return console.error(err);
                  		for (var prop in ret) 
                  		{
                  	   		if (ret.hasOwnProperty(prop) && ret[prop].name) 
                  			{
                  				first = message.senderID;
                  				if (Nguoiquen === false) 
                  				    Ten = ret[prop].firstName;
                  				if (ret[prop].gender === 2) 
                  				    beauty="đẹp trai"; 
                  				else 
                  				    beauty="xinh đẹp";
                  				
                  				api.sendMessage("Bé điệu: Chào " + Ten +" " + beauty+"!", prop, message.senderID);
                  				
                  			}
                  		}
                  	});
                  	
                  	UserID = message.senderID;
                    api.sendMessage(message.body,IDbot);
                    temp = 0;
                }
                else if (message.senderID != IDbot)
                {

                    UserID = message.senderID;
                    api.sendMessage(message.body,IDbot);
                    first = message.senderID;
                }
                else
                { 
                    if (temp === 0 )
                    	{
                    			if (h >= 8 && h <= 19) 
                    			    api.sendMessage("Bé điệu: Nghĩa hiện giờ không on facebook!", UserID);
                      			else 
                      			    api.sendMessage("Bé điệu: Bạn ơi khuya lắm rồi đấy sao còn chưa ngủ?", UserID);
                                temp = 1;
                      	}
                    api.sendMessage("Bé điệu: " + message.body,UserID)
                }
    });
});

