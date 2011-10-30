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
      $(@target_id.css_id()).after(this.scaffold())
      $(this.div_id().css_id()).hide()

    scaffold: ->
      div_id = this.div_id().to_string()
      """
      <div id='#{div_id}'>
        <textarea type='text' class='insta_description' />
        <input type='button' class='insta_submit' value='Submit'/>
        <input type='button' class='insta_cancel' value='Cancel'/>
      </div>
      """

    div_id: ->
      new Id("insta_#{@target_id.to_string()}")

    description_id: ->
      this.make_id('description')

    submit_id: ->
      this.make_id('submit')

    cancel_id: ->
      this.make_id('cancel')

    make_id: (string) ->
      new Id("#{this.div_id().to_string()} > .insta_#{string}")


  class InstaView
    constructor:(@target_id, @insta_root_div_id, @description_id, @submit_id, @cancel_id) ->

    target_id_selector: ->
      @target_id.css_id()

    submit_id_selector: ->
      @submit_id.css_id()

    toggle: ->
      $(@target_id.css_id()).toggle()
      $(@insta_root_div_id.css_id()).toggle()

    description_box_text: ->
      console.log($(@description_id.css_id()))
      $(@description_id.css_id()).text()

    target_text: (string) ->
      $(@target_id.css_id()).text(string)


  class InstaViewController
    constructor:(@view) ->

    bind_events: ->
      $(@view.target_id_selector()).bind('click', =>
        this.on_target_clicked()
      )

      $(@view.submit_id_selector()).bind('click', =>
        this.on_submit_button_clicked()
      )

    on_target_clicked: ->
      @view.toggle()

    on_submit_button_clicked: ->
      @view.toggle()
      description = @view.description_box_text()
      console.log(description)
      @view.target_text(description)

  $.fn.insta = ->
    target_id = new Id(this.attr('id'))
    maker = new InstaDivMaker(target_id)
    maker.create_and_append_div_to_target()

    view = new InstaView( target_id, maker.div_id(), maker.description_id(), maker.submit_id(), maker.cancel_id())
    insta_event_controller = new InstaViewController(view)
    insta_event_controller.bind_events()

)(jQuery)
