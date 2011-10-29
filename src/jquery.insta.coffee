(($) ->
  class InstaFormMaker
    constructor:(@target_id) ->

    create: ->
      "<div id='insta_#{@target_id}'></div>"

  $.fn.insta = ->
    target_id = this.attr('id')
    form_maker = new InstaFormMaker(target_id)
    self = this
    $("##{target_id}").bind('click', ->
      console.log('clicked')
      $(self).append(form_maker.form())
    )
)(jQuery)
