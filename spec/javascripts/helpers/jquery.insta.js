(function() {
  (function($) {
    var InstaFormMaker;
    InstaFormMaker = (function() {
      function InstaFormMaker(target_id) {
        this.target_id = target_id;
      }
      InstaFormMaker.prototype.create = function() {
        return "<div id='insta_" + this.target_id + "'></div>";
      };
      return InstaFormMaker;
    })();
    return $.fn.insta = function() {
      var form_maker, self, target_id;
      target_id = this.attr('id');
      form_maker = new InstaFormMaker(target_id);
      self = this;
      return $("#" + target_id).bind('click', function() {
        console.log('clicked');
        return $(self).append(form_maker.form());
      });
    };
  })(jQuery);
}).call(this);
