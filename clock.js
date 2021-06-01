 // CANVAS CLOCK
 let canvas = document.getElementById('canvas'),context;

 let ctx = canvas.getContext('2d');
 let radius = canvas.height /2;
 window.onload = (()=>{
    console.log(ctx);
    ctx.translate(radius,radius);
    radius = radius*0.90;
    console.log(radius);
    setInterval(drawclock,1000);
 });
 let drawFace = ((ctx,radius)=>{
    let grad;
    ctx.beginPath();
    ctx.arc(0,0,radius,0,2*Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    grad = 
    ctx.createRadialGradient(0,0,radius*0.95,0,0,radius*1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white'); 
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0,0, radius*0.1,0, 2*Math.PI)
    ctx.fillStyle = 'black';
    ctx.fill()
 })

 let drawNumbers = ((ctx,radius)=>{
     let ang,num;
     ctx.font = radius*0.15 + 'px arial';
     ctx.textBaseline = 'middle';
     ctx.textAlign = 'center';
     for (num=1;num<13;num++){
         ang = num *Math.PI/6;
         ctx.rotate(ang);
         ctx.translate(0,-radius*0.85);
         ctx.rotate(-ang)
         ctx.fillText(num.toString(),0,0);
         ctx.rotate(ang);
         ctx.translate(0,radius*0.85);
         ctx.rotate(-ang);
     };
 });

 let drawhand = ((ctx,pos,length,width)=>{
     ctx.beginPath();
     ctx.lineWidth= width;
     ctx.lineCap = 'round';
     ctx.moveTo(0,0);
     ctx.rotate(pos);
     ctx.lineTo(0,-length)
     ctx.stroke()
     ctx.rotate(-pos);
 })

 let drawTime = ((ctx,radius)=>{
     let now = new Date();
     let hour = now.getHours();
     let minutes = now.getMinutes();
     let seconds = now.getSeconds();
     //Hour
     hour = hour%12;
     hour = (hour*Math.PI/6)+(minutes*Math.PI/(6*60))+
     (seconds *Math.PI/(360*60));
     drawhand(ctx,hour,radius*0.5,radius*0.07);

     //Minutes
     minutes = (minutes*Math.PI/30)+
     (seconds *Math.PI/(30*60));
     drawhand(ctx,minutes,radius*0.8,radius*0.07);

     //second
     seconds = (seconds *Math.PI/30);
     drawhand(ctx,seconds,radius*0.9,radius*0.02);

 });

 let drawclock = (()=>{
     ctx.beginPath();
     ctx.arc(0,0,radius,0,2*Math.PI,true);
     ctx.fillStyle = 'white';
     ctx.fill();
     // ctx.strokeStyle = 'black';
     // ctx.stroke();
     drawFace(ctx,radius);
     drawNumbers(ctx,radius);
     drawTime(ctx,radius);
 })


