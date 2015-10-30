# Parabola

抛物线运动

调用方法

   var bool = new Parabola({
   
        el: "#boll",  // 运动物体
        
        offset: [500, 100], // 运动偏移量
        
        curvature: 0.0001, //  抛物线曲率
        
        duration: 3000,  // 运动时长
        
        autostart : true, // 自动启动
        
        targetEl : $("#target"), // 运动到目标元素
        
        callback:function(){
        
            alert("完成后回调")
            
        }
        
    });
