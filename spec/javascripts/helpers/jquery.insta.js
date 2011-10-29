(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  (function($) {
    var Id, InstaDivMaker, InstaEventController;
    Id = (function() {
      function Id(id) {
        this.id = id;
      }
      Id.prototype.to_string = function() {
        return this.id;
      };
      Id.prototype.css_id = function() {
        return "#" + this.id;
      };
      return Id;
    })();
    InstaDivMaker = (function() {
      function InstaDivMaker(target_id) {
        this.target_id = target_id;
      }
      InstaDivMaker.prototype.create_and_append_div_to_target = function() {
        $("" + (this.target_id.css_id())).after(this.scaffold());
        return $("" + (this.div_id().css_id())).hide();
      };
      InstaDivMaker.prototype.scaffold = function() {
        return "<div id='" + (this.div_id().to_string()) + "'>\n  <input type='text' />\n</div>";
      };
      InstaDivMaker.prototype.div_id = function() {
        return new Id("insta_" + (this.target_id.to_string()));
      };
      return InstaDivMaker;
    })();
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
    return $.fn.insta = function() {
      var insta_div_maker, insta_event_controller, target_id;
      target_id = new Id(this.attr('id'));
      insta_div_maker = new InstaDivMaker(target_id);
      insta_div_maker.create_and_append_div_to_target();
      insta_event_controller = new InstaEventController(target_id, insta_div_maker.div_id());
      return insta_event_controller.bind_events();
    };
  })(jQuery);
}).call(this);
