const request=require('request');

const geocode=(address,callback)=>{
    const url='https://geocode.search.hereapi.com/v1/geocode?q=Invalidenstr+117+' + encodeURIComponent(address)+'&apiKey=O6llYuePZLTziR7HqFj3cvBGqbCHWdrXeBoXqLVign0'
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to Reach',undefined)
        }
        else if(body.items.length==0){
            callback('Unable to Find the Location',undefined)
        }
        else{
           callback(undefined,{
            latitude:body.items[0].position.lat,
            longitude:body.items[0].position.lng,
            location:body.items[0].title
           })
            
        }
    })
}


module.exports=geocode