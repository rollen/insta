(function() {
  var InstaDivMaker;
  InstaDivMaker = (function() {
    function InstaDivMaker(target_id) {
      this.target_id = target_id;
    }
    InstaDivMaker.prototype.create_and_append_div_to_target = function() {
      $("" + (this.target_id.css_id())).after(this.scaffold());
      return $("" + (this.div_id().css_id())).hide();
    };
    InstaDivMaker.prototype.scaffold = function() {
      return "<div id='" + (this.div_id().to_string()) + "'>\n</div>";
    };
    InstaDivMaker.prototype.div_id = function() {
      return new Id("insta_" + (this.target_id.to_string()));
    };
    return InstaDivMaker;
  })();
}).call(this);
