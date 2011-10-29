describe('Insta', function() {
  beforeEach(function () {
    $('#jasmine_content').append('<div id="fixture"></div>');
    $('#fixture').append('<h1 id="target">This is a title</h1>');
  });

  it('shoud have a target to act on', function() {
    expect($('#target')).toExist();
  });

  it('should show a textarea when clicked', function() {
    $('#target').insta();
    $('#target').click();

    expect($('div #insta_target')).toExist();
  });
});
