(($) ->
  class Id
    constructor:(@id) ->

    to_string: ->
      @id

    css_id: ->
      "##{@id}"

  class InstaDivMaker
    constructor:(@target_id, @button_value = 'Submit') ->

    create_and_append_div_to_target: ->
      $(@target_id.css_id()).after(this.scaffold())
      $(this.div_id().css_id()).hide()

    scaffold: ->
      div_id = this.div_id().to_string()
      """
      <div id='#{div_id}' class='insta'>
        <textarea type='text' class='insta_description' />
        <input type='button' class='insta_submit' value='#{@button_value}'/>
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

    cancel_id_selector: ->
      @cancel_id.css_id()

    toggle: ->
      $(@target_id.css_id()).toggle()
      $(@insta_root_div_id.css_id()).toggle()

    description_box_text: ->
      $(@description_id.css_id()).val()

    target_text: (string) ->
      $(@target_id.css_id()).text(string)

    copy_target_text_into_description_text: ->
      $(@description_id.css_id()).text(this.description_text())

    description_text: ->
      $(@target_id.css_id()).text()



  class InstaViewController
    constructor:(@view, @request) ->

    bind_events: ->
      $(@view.target_id_selector()).bind('click', =>
        this.on_target_clicked()
      )

      $(@view.submit_id_selector()).bind('click', =>
        this.on_submit_button_clicked()
      )

      $(@view.cancel_id_selector()).bind('click', =>
        this.on_cancel_button_clicked()
      )

    bind_view: ->
      @view.copy_target_text_into_description_text()

    on_target_clicked: ->
      @view.toggle()

    on_submit_button_clicked: ->
      @view.toggle()
      description = @view.description_box_text()
      @view.target_text(description)
      @request.send(description)

    on_cancel_button_clicked: ->
      this.on_target_clicked()

  class RemoteResource
    constructor:(@path, @resource_name, @param_name, @csrf) ->

    send: (payload) ->
      data = "#{@resource_name}[#{@param_name}]=#{payload}&csrf-token=#{@csrf}"
      options = {
        url: @path,
        type: 'PUT',
        data: data
      }
      $.ajax(options)
  
  $.fn.insta = (options={}) ->
    csrf = $('meta[name=csrf-token]').attr('content')
    target_id = new Id(this.attr('id'))
    maker = new InstaDivMaker(target_id, options['ok_button'])
    view = new InstaView( target_id, maker.div_id(), maker.description_id(), maker.submit_id(), maker.cancel_id())
    request = new RemoteResource(options['path'], options['resource'], options['param'], csrf)
    insta_event_controller = new InstaViewController(view, request)

    maker.create_and_append_div_to_target()
    insta_event_controller.bind_events()
    insta_event_controller.bind_view()
)(jQuery)
