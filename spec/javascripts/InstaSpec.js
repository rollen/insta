describe('insta', function() {
  beforeEach(function () {
    $('#fixture').remove();
    $('#jasmine_content').append('<div id="fixture"></div>');
    $('#fixture').append('<h1 id="target">This is a title</h1>');
  });

  it('shoud have a target to act on', function() {
    expect($('#target')).toExist();
  });

  it('should not have the insta div shown', function(){
    $('#target').insta();
    expect($('#insta_target')).toBeHidden();
  });

  it('should have the insta div shown on clicking the target', function(){
    $('#target').insta();
    $('#target').click();
    expect($('#insta_target')).toBeVisible();
  });

  it('should hide the target on clicking the target', function(){
    $('#target').insta();
    $('#target').click();
    expect($('#target')).toBeHidden();
  });

  it('should allow the text of the target to be shown in the textarea on click', function(){
    $('#target').insta();
    $('#target').click();
  
  });
});
