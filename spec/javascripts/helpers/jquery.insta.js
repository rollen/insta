(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  (function($) {
    var Id, InstaDivMaker, InstaView, InstaViewController, RemoteResource;
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
        $(this.target_id.css_id()).after(this.scaffold());
        return $(this.div_id().css_id()).hide();
      };
      InstaDivMaker.prototype.scaffold = function() {
        var div_id;
        div_id = this.div_id().to_string();
        return "<div id='" + div_id + "'>\n  <textarea type='text' class='insta_description' />\n  <input type='button' class='insta_submit' value='Submit'/>\n  <input type='button' class='insta_cancel' value='Cancel'/>\n</div>";
      };
      InstaDivMaker.prototype.div_id = function() {
        return new Id("insta_" + (this.target_id.to_string()));
      };
      InstaDivMaker.prototype.description_id = function() {
        return this.make_id('description');
      };
      InstaDivMaker.prototype.submit_id = function() {
        return this.make_id('submit');
      };
      InstaDivMaker.prototype.cancel_id = function() {
        return this.make_id('cancel');
      };
      InstaDivMaker.prototype.make_id = function(string) {
        return new Id("" + (this.div_id().to_string()) + " > .insta_" + string);
      };
      return InstaDivMaker;
    })();
    InstaView = (function() {
      function InstaView(target_id, insta_root_div_id, description_id, submit_id, cancel_id) {
        this.target_id = target_id;
        this.insta_root_div_id = insta_root_div_id;
        this.description_id = description_id;
        this.submit_id = submit_id;
        this.cancel_id = cancel_id;
      }
      InstaView.prototype.target_id_selector = function() {
        return this.target_id.css_id();
      };
      InstaView.prototype.submit_id_selector = function() {
        return this.submit_id.css_id();
      };
      InstaView.prototype.cancel_id_selector = function() {
        return this.cancel_id.css_id();
      };
      InstaView.prototype.toggle = function() {
        $(this.target_id.css_id()).toggle();
        return $(this.insta_root_div_id.css_id()).toggle();
      };
      InstaView.prototype.description_box_text = function() {
        return $(this.description_id.css_id()).val();
      };
      InstaView.prototype.target_text = function(string) {
        return $(this.target_id.css_id()).text(string);
      };
      return InstaView;
    })();
    InstaViewController = (function() {
      function InstaViewController(view, request) {
        this.view = view;
        this.request = request;
      }
      InstaViewController.prototype.bind_events = function() {
        $(this.view.target_id_selector()).bind('click', __bind(function() {
          return this.on_target_clicked();
        }, this));
        $(this.view.submit_id_selector()).bind('click', __bind(function() {
          return this.on_submit_button_clicked();
        }, this));
        return $(this.view.cancel_id_selector()).bind('click', __bind(function() {
          return this.on_cancel_button_clicked();
        }, this));
      };
      InstaViewController.prototype.on_target_clicked = function() {
        return this.view.toggle();
      };
      InstaViewController.prototype.on_submit_button_clicked = function() {
        var description;
        this.view.toggle();
        description = this.view.description_box_text();
        this.view.target_text(description);
        return this.request.send(description);
      };
      InstaViewController.prototype.on_cancel_button_clicked = function() {
        return this.on_target_clicked();
      };
      return InstaViewController;
    })();
    RemoteResource = (function() {
      function RemoteResource(path, resource_name, param_name) {
        this.path = path;
        this.resource_name = resource_name;
        this.param_name = param_name;
      }
      RemoteResource.prototype.send = function(payload) {
        var data, options;
        data = "" + this.resource_name + "[" + this.param_name + "]=" + payload;
        options = {
          url: this.path,
          type: 'PUT',
          data: data
        };
        return $.ajax(options);
      };
      return RemoteResource;
    })();
    return $.fn.insta = function(options) {
      var insta_event_controller, maker, request, target_id, view;
      if (options == null) {
        options = {};
      }
      target_id = new Id(this.attr('id'));
      maker = new InstaDivMaker(target_id);
      maker.create_and_append_div_to_target();
      view = new InstaView(target_id, maker.div_id(), maker.description_id(), maker.submit_id(), maker.cancel_id());
      request = new RemoteResource(options['path'], options['resource'], options['param']);
      insta_event_controller = new InstaViewController(view, request);
      return insta_event_controller.bind_events();
    };
  })(jQuery);
}).call(this);
