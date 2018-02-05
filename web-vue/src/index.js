/* MQTT Connection */
var client = mqtt.connect("wss://m12.cloudmqtt.com:32964",{username:"oiwdhvqd",password:"AIaxfxkIwaKZ"})
client.subscribe("sta/#")

// Vue App
var app = new Vue({
  el: '#app',
  data: {
    sala:{
      luz:false,
      air: 0,
      temp: 0.0,
      pres: false,
    },
    dormi:{
      luz:false,
      air: 0,
      temp: 0.0,
      pres: false,
    }
  },
  methods:{
    updateSalaLuz(){
      //console.log("Ultimo valor: "+this.sala.luz)
      var val = (this.sala.luz == "on")? "off":"on"
      this.sala.luz = val
      console.log("Publicando: "+val)
      client.publish("set/sala/luz",val)
    },
    updateSalaAir(){
      var val = ""+this.sala.air
      console.log("Nuevo valor: "+val)
      client.publish("set/sala/air",val)
    },
    updateDormiLuz(){
      var val = ""+this.dormi.luz
      console.log("Nuevo valor: "+val)
      client.publish("set/dormi/luz",val)
    },
    updateDormiAir(){
      var val = ""+this.dormi.air
      console.log("Nuevo valor: "+val)
      client.publish("set/dormi/air",val)
    },
    fechas(){
      var inicio = 2018
      var actual = new Date().getFullYear()
      if(inicio == actual){
        return actual
      } else {
        return ""+inicio +" - "+actual
      }
    }
  }
})

/* Suscripciones */
client.on("message", function (topic, payload) {
  console.log(topic+": "+payload)

  var levels = topic.split("/")
  var zone = levels[1]
  var dev = levels[2]
  switch(zone){
    case "sala":
      Vue.set(app.sala,dev,""+payload)
      break;
    case "dormi":
      Vue.set(app.dormi,dev,""+payload)
      break;
  }
})
