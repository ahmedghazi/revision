
export default function Tick(fuc,name){
  var Renderer = {animate:true,name:''}

  var els = [
    Object.assign(Object.create(Renderer),{fuc,name})
  ]

  var fps = 30;
  var now;
  var then = Date.now();
  var interval = 1000/fps;
  var delta;

  var animate = ()=>{
    requestAnimationFrame(animate)
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
      els.forEach(o=>{
        var {fuc,animate} = o
        if(animate){
          fuc.call(o,Date.now())
        }
      })

      then = now - (delta % interval);
    }
    
  }
  animate()
  //debugger
  Tick = (fuc,name) =>{
    //debugger
    var o = Object.assign(Object.create(Renderer),{fuc,name})
    els.push(o)
    return o
  }

  return els[0]
}