//import {connect} form 'mqtt'

class DiotClient{
  constructor(url,username,password){
    this.options = {
      username:"oiwdhvqd",
      password:"AIaxfxkIwaKZ"
    }

    this.data = {
      sala:{

      }
    }

    this.connect()
  }

  connect(){
    this.mqtt = mqtt.connect("wss://m12.cloudmqtt.com:32964",this.options)
    this.mqtt.subscribe("sta/#")
  }

  setSalaLuz(payload){
    if(payload == true){
      payload = "on"
    } else if (payload == false){
      payload = "off"
    }

    if(payload == "on" || payload == "off"){
      this.mqtt.publish("set/sala/luz",payload)
    } else {

    }
  }

  setSalaAir(payload){
    if(payload < 0 || payload > 3){
      return false
    } else if (payload == false){
      payload = "off"
    }

    if(payload == "on" || payload == "off"){
      this.mqtt.publish("set/sala/luz",payload)
    } else {
      return false
    }
  }

}
