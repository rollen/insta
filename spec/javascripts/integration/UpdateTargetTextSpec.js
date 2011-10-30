describe('update target', function() {
  beforeEach(function () {
    $('#fixture').remove();
    $('body').append('<div id="fixture"></div>');
    $('#fixture').append('<h1 id="target">This is a title</h1>');

    text_box_css_selector = '#insta_target > .insta_description'
    submit_button_css_selector = '#insta_target > .insta_submit'
    cancel_button_css_selector = '#insta_target > .insta_cancel'
  });

  it('successfully changes target text on submit', function(){
    $('#target').insta();
    $('#target').click();
    expect($(text_box_css_selector)).toBeVisible();
    $(text_box_css_selector).val('New H1');

    expect($(submit_button_css_selector)).toBeVisible();
    $(submit_button_css_selector).click();

    expect($('#insta_target')).toBeHidden();
    expect($('#target')).toBeVisible();
    expect($('#target').text()).toBe('New H1');
  });

  it('does not update on cancel click', function(){
    $('#target').insta();
    $('#target').click();

    expect($(text_box_css_selector)).toBeVisible();
    $(text_box_css_selector).val('New H1');

    expect($(cancel_button_css_selector)).toBeVisible();
    $(cancel_button_css_selector).click();

    expect($('#insta_target')).toBeHidden();
    expect($('#target')).toBeVisible();
    expect($('#target').text()).not.toBe('New H1');

  });

  describe('sends a put request to the server', function(){
    describe('on success', function(){
      it('returns success if the params are all valid', function(){
        options = {
          path: '/resources',
          resource: 'resource',
          param: 'title',
        }
        $('#target').insta(options); 
      });
    });
  });
});
