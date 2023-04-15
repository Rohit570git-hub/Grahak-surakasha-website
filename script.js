const baseUrl = "https://grahaksuraksha-api.onrender.com"



var responsiveSlider = function() {

    var slider = document.getElementById("slider");
    var sliderWidth = slider.offsetWidth;
    var slideList = document.getElementById("slideWrap");
    var count = 1;
    var items = slideList.querySelectorAll("li").length;
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    
    window.addEventListener('resize', function() {
      sliderWidth = slider.offsetWidth;
    });
    
    var prevSlide = function() {
      if(count > 1) {
        count = count - 2;
        slideList.style.left = "-" + count * sliderWidth + "px";
        count++;
      }
      else if(count = 1) {
        count = items - 1;
        slideList.style.left = "-" + count * sliderWidth + "px";
        count++;
      }
    };
    
    var nextSlide = function() {
      if(count < items) {
        slideList.style.left = "-" + count * sliderWidth + "px";
        count++;
      }
      else if(count = items) {
        slideList.style.left = "0px";
        count = 1;
      }
    };
    
    next.addEventListener("click", function() {
      nextSlide();
    });
    
    prev.addEventListener("click", function() {
      prevSlide();
    });
    
    setInterval(function() {
      nextSlide()
    }, 5000);
    
    };
    
    window.onload = function() {
    responsiveSlider();  
    }

    let reportlist = document.getElementById('reportlist')
    getAllReports()
 //Get api call for all reports 
function getAllReports() {
  fetch(`${baseUrl}/report`, {
    method: 'get',
    headers: new Headers({'Content-Type': 'application/json'}),
  })
  .then(res => res.json())
  .then(data=>{
    console.log(data.reports)

    //For Populating report list
    let tableData = ""; 
    data.reports.forEach(data => {
      console.log("data elemet",data)
      let fraudType = "";
      if(data.fraud_type === 1){
        fraudType = "Through Call"
      }else if(data.fraud_type===2){
        fraudType = "Messages"
      }else if(data.fraud_type === 3){
        fraudType ="UPI ID"
      }
          tableData +=`<tr>
          <td>${fraudType}</td>
          <td>${data.reported_entity}</td>
          <td>${data.description}</td>
          <td><img src ="placeholder.jpg" width="160" height="120"/></td>
        </tr>`;
       
          // let report = document.createElement("div");
          //   let rbutton=document.createElement("button");
          //   let rpara = document.createElement("p");
          
          //   report.setAttribute("class", "report");
          //   rbutton.setAttribute("class", "rbutton");
          //   rpara.setAttribute("class", "rpara");

             
          //   bloodbank.appendChild(rpara)
          //   bloodbank.appendChild(rbutton)
          //   bloodbanklist.appendChild(report);

          //   rpara.innerHTML=data;
          //   rbutton.innerHTML="Click";
      
    });
    document.getElementById("table_body").innerHTML = tableData;
  })
  .catch((err)=>{
    console.log(err);
  })

}      
    