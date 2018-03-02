//import mqtt from 'mqtt'

class SmartDiot {
  constructor(url,options){
    this.mqtt = mqtt.connect(url,options)
    this.actuators = []
    this.sensors = []
    this.interfaces = []

    this.subsTopics = []
  }

  addActuator(topic,initialvalue,update){
    this.actuators.push({
      topic: topic,
      value: initialvalue,
      update: update,
    })
    this.subsTopics.push("set/"+topic)
  }

  addSensor(topic,initialvalue,update){
    this.sensors.push({
      topic: topic,
      value: initialvalue,
      update: update,
    })
    this.subsTopics.push("req/"+topic)
  }

  addInterface(topic,initialvalue,update){
    this.interfaces.push({
      topic: topic,
      value: initialvalue,
      update: update,
    })
    this.subsTopics.push("sta/"+topic)
  }

  start(){
    // subscribing
    this.mqtt.subscribe(this.subsTopics)

    this.mqtt.on("message",(topic,payload)=>{
      console.log("diot "+topic+": "+payload)
      let levels = topic.split("/")
      let cmd = levels[0]
      let devtopic = topic.substring(4)

      switch (cmd) {
        case "set": // for interfaces
          var i = 0
          var n = this.actuators.length
          for(var i = 0; i < n; i++){
            if(this.actuators[i].topic == devtopic){
              break
            }
          }

          let val = this.actuators[i].value
          val = this.actuators[i].update(payload,val)
          if(val != null){
            this.actuators[i].value = val
            let pub = "sta/"+this.actuators[i].topic
            this.mqtt.publish(pub,val)
          }
          break;
        case "req": // for interfaces
          for(var sen in this.sensors){
            if(sen.topic != devtopic){
              continue
            } else if(sen.update(payload)) {
              this.mqtt.publish("sta/"+sen.topic,sen.value)
              return
            }
          }
          break;
        case "sta": // for interfaces
          for(var hmi in this.interfaces){
            if(hmi.topic != devtopic){
              continue
            }
            hmi.update(payload)
          }
          break;
        default:
          console.log("Default?")
      }
    })
  }

  stop(){

  }
}
