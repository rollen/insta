(function() {
  var InstaEventController;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  InstaEventController = (function() {
    function InstaEventController(target_id, insta_div_id) {
      this.target_id = target_id;
      this.insta_div_id = insta_div_id;
    }
    InstaEventController.prototype.bind_events = function() {
      return $(this.target_id.css_id()).bind('click', __bind(function() {
        $(this.insta_div_id.css_id()).show();
        return $(this.target_id.css_id()).hide();
      }, this));
    };
    return InstaEventController;
  })();
}).call(this);
