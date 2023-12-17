const path=require('path')
const express=require('express')
const hbs= require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app=express()
const request=require('request')
const publicDirectoryPath=path.join(__dirname,'../public')// this is just apply the current directory name and add extra directory of your choice
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//To set the hbs
app.set('view engine', 'hbs')
//To set the views path On view direction
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath)) //Express search for the things in public directory 

hbs.registerPartials(partialsPath)
app.get('',(req,res)=>{// this is also another search by expresss all must be in order
    res.render('index',{
        'title':'Whether APP',
        'name': 'Yuvraj'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        'title':'About Me',
        'name': 'Yuvraj Singh Kanoujia'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        'title':'Help',
        'textHelp':'This is The Help you Want',
        'name':'Yuvraj Singh'
    })
})
app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error:'Please Provide an Address'
        })
    }                                 //response.body.latitude/ response.body.longitude are same withe destructure 
    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
            return  res.send({
                error:error});
        }                                    
        forecast(latitude,longitude, (error, forecastdata) => {
            
            if(error){
                return res.send({
                    error:error});
            }
            res.send({ 
                forecast:forecastdata,
                place:location,
                address:req.query.address

            })
          })
    
    })
        
        
})

app.get('/help/*',(req,res)=>{
    res.render('error',{   //res.render(filename,inf)
        'title':'404',
        'name':'Yuvraj',
        'errorMessage':'Page Not Found'

    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        'title':'404',
        'name':'Yuvraj',
        'errorMessage':'Page Not Found'

    })
})


app.listen(3000,()=>{
    console.log('Server Is Up Now')
})