describe('update target text', function() {
  beforeEach(function () {
    $('#fixture').remove();
    $('body').append('<div id="fixture"></div>');
    $('#fixture').append('<h1 id="target">This is a title</h1>');
  });

  it('user updates target text', function(){
    text_box_css_selector = '#insta_target > .insta_description'
    submit_button_css_selector = '#insta_target > .insta_submit'
    cancel_button_css_selector = '#insta_target > .insta_cancel'

    $('#target').insta();

    $('#target').click();

    expect($(text_box_css_selector)).toBeVisible();
    $(text_box_css_selector).text('New H1');

    expect($(submit_button_css_selector)).toBeVisible();
    $(submit_button_css_selector).click();

    expect($('#insta_target')).toBeHidden();

    expect($('#target')).toBeVisible();
    expect($('#target').text()).toBe('New H1');
  });
});
