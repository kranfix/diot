// mqtt config
let url = "wss://m12.cloudmqtt.com:32964"
let options = {
  username:"oiwdhvqd",
  password:"AIaxfxkIwaKZ",
}

// Device: Sala1
let sala1 = new SmartDiot(url,options)
sala1.addActuator("sala/luz","off",(input,val)=>{
  if(input == "tog" || input == "toggle"){
    return (val == "on")?"off":"on"
  } else if (input == "on" || input == "off"){
    return input
  }
  return null
})
sala1.start()

// Device: Sala2
let sala2 = new SmartDiot(url,options)
sala2.addActuator("sala/air","off",(input,val)=>{
  if(input < 0 || input > 3){
    return null
  }
  return input
})
sala2.addSensor("sala/pres",false,(val)=>{
  this.value = val
  return true
})
sala2.start()

// Device: Sala3
let sala3 = new SmartDiot(url,options)
sala2.addSensor("sala/temp",0,(val)=>{

})
sala2.addInterface("sala/luz",0,(val)=>{
  return true
})
sala3.start()
