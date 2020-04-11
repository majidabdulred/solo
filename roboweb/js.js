// Created by Ishwar Ramdasi

window.onload=function(){
 var tv=document.getElementById("tv")
 var s1="Hello! My Name is Ishwar. Nice to meet you!. Thanks to sololearn to give direction to my coding knowledge"
 var s2="I feel relaxed after coding. Now I made this. If you like the code then don't forget to upvote"

 var b=true

 function write(k){
  var l=k.length 
  var c=0
 function clear(){
  b=false
     tv.innerHTML=" "
     write(s2)
 }
    var i= setInterval(function(){ tv.innerHTML=k.substr(0,c)
     c++
     if(c>l){clearInterval(i) ;
    if(b){ clear()}
     }
      },100)}
write(s1)

 
 
}
