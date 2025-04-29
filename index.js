const fs=require("fs")
const http=require("http")
const { json } = require("stream/consumers")

let server=http.createServer((req,res)=>{
    if(req.url=="/home.css"){
        const data=fs.readFileSync("home.css")
        res.end(data)
    }
    else if(req.url=="/adddata"){
        let details=JSON.parse(fs.readFileSync("details.json","utf-8"))
        req.on("data",(data)=>{
            let results=JSON.parse(data.toString())
            let filterdata=details.find(ele=>ele.email==results.email&& ele.mobile==results.mobile)
            if(filterdata){
                res.end(JSON.stringify({message:"Data alredy exists"}))
            }
            else{
            details.push(results)
            fs.writeFileSync("details.json",JSON.stringify(details))
            res.end(JSON.stringify({message:"Registered successfully"}))
            }
        })
    } else if(req.url=="/logindetails"){
        let details=JSON.parse(fs.readFileSync("details.json","utf-8"))
        req.on("data",(data)=>{
           let results=JSON.parse(data.toString()) 
           let findindex=details.find(ele=>ele.email==results.email&&ele.password==results.password)
           if(findindex){
            res.end(JSON.stringify({message:`${findindex.name} Login successfully`}))
           }
           else{
            res.end(JSON.stringify({message:"Enter valied details"}))
           }
        })
    }
    else if(req.url=="/changepassword"){
        let details=JSON.parse(fs.readFileSync("details.json","utf-8"))
        req.on("data",(data)=>{
           let results=JSON.parse(data.toString()) 
           let isindex=details.findIndex(ele=>ele.name==results.name&&ele.email==results.email)
           let isadded=details.find(ele=>ele.name==results.name&&ele.email==results.email)
          if(isadded){
            details[isindex]={...details[isindex],password:results.password}
            res.end(JSON.stringify({message:`${details[isindex].name} password changed successfully`}))
            fs.writeFileSync("details.json",JSON.stringify(details))
          }
          else{
            res.end(JSON.stringify({message:"Provide valid details"}))
          }
        })
    }
    else if(req.url=="/login.html"){
        let data=fs.readFileSync("login.html")
        res.end(data)
    }
    else if(req.url=="/password.html"){
        let data=fs.readFileSync("password.html")
        res.end(data)
    }
    else{
        let data=fs.readFileSync("Registartionpage.html")
        res.end(data)
    }

})
server.listen(2000,()=>{
    console.log("server started at http://localhost:2000")
})