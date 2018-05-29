var b=0;
function  average(arr){
    for(var i=0;i<arr.length;i++){
     b+=arr[i];
    }
    var result=Math.round(b/arr.length-1);
    console.log (result);
}
var scores =[90,98,89,100,100,86,94];
average(scores);