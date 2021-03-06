var xForm = (function(window) {

  var members = {
    date:null,
    select:null,
    combo:null,
    autocomplete:null,
    checkbox:null,
    radio:null
    ,
    init:function(){
          this.initUI('date');
          this.initUI('select');
          this.initUI('combo');
          this.initUI('autocomplete');
          this.initUI('checkbox');
          this.initUI('radio');
          this.initUI('month');
          this.initUI('year');
    },
    initUI:function(type){
       this[type] = (typeof xUi !='undefined' &&  typeof xUi[type] != 'undefined')  ?  xUi[type] : {render:function(){}};

       if(this[type].render){
         this[type].render();
       }
    },
    initControl:function(){
        
    },
    render: function() {
      this.init();
      this.initControl();
    }
  }


  return members;

})(window)


jQuery(function() 
{
  xForm.render();
})