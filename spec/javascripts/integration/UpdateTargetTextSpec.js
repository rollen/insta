describe('update target text', function() {
  beforeEach(function () {
    $('#fixture').remove();
    $('#jasmine_content').append('<div id="fixture"></div>');
    $('#fixture').append('<h1 id="target">This is a title</h1>');
  });

  it('user updates target text', function(){
    $('#target').insta();

    $('#target').click();

    expect($("#insta_target > input[type='text']")).toBeVisible();
    $("#insta_target > input[type='text']").text('New H1');

    $("#insta_target > input[type='button']").click();

    expect($('#target')).toBeVisible();
    expect($('#target').text()).toHaveText('New H1');
    expect($('#insta_target')).toBeHidden();
  });
});
