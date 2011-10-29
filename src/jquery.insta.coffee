(($) ->
  class Id
    constructor:(@id) ->

    to_string: ->
      @id
    css_id: ->
      "##{@id}"

  class InstaDivMaker
    constructor:(@target_id) ->

    create_and_append_div_to_target: ->
      $("#{@target_id.css_id()}").after(this.scaffold())
      $("#{this.div_id().css_id()}").hide()

    scaffold: ->
      """
      <div id='#{this.div_id().to_string()}'>
        <input type='text' />
      </div>
      """
    div_id: ->
      new Id("insta_#{@target_id.to_string()}")

  class InstaEventController
    constructor:(@target_id, @insta_div_id) ->

    bind_events: ->
      $(@target_id.css_id()).bind('click', =>
        $(@insta_div_id.css_id()).show()
        $(@target_id.css_id()).hide()
      )


  $.fn.insta = ->
    target_id = new Id(this.attr('id'))
    insta_div_maker = new InstaDivMaker(target_id)
    insta_div_maker.create_and_append_div_to_target()

    insta_event_controller = new InstaEventController(target_id, insta_div_maker.div_id())
    insta_event_controller.bind_events()

)(jQuery)
