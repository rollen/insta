begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

desc 'Compile CoffeeScript to JavaScript'
task :coffee do
  sh 'coffee -o spec/javascripts/helpers/ -c src/'
end

desc 'CI coffeescript build'
task :ci do
  loop do
    begin
      sh 'coffee -o spec/javascripts/helpers/ -c src/'
    rescue Exception

    end
  end
end
