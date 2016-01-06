# app.rb
require 'sinatra/base'

class DirectoryWatcher

  require 'json'

  attr_accessor :files, :directory_path

  def initialize
    @source_path = "/Users/trthorn2/Dropbox/private/pd_tmp"
    @destination_path = "/Users/trthorn2/webapps/exp/pd/public_displays/public/assets/video/"
    @files = []
    @filenames = []
  end

  def file_list
    match = Regexp.new("\.[mp4v]{3,4}$")
    Dir.foreach(@source_path) do |filename|
      if !@filenames.include?(filename) && filename.match(match)
        @filenames << filename
        filepath = "#{@source_path}/#{filename}"
        file = File.new(filepath, "r")
        destination_file = "#{@destination_path}#{filename}"
        if !File.exist?(destination_file)
          FileUtils.cp(filepath, "#{@destination_path}#{filename}")
        end
        @files << [file.birthtime, filename]
      end
    end
    @files.sort!{ |a,b| a[0] <=> b[0] }
    JSON.generate( { 'playlist': @files.map { |x| x[1] } } )
  end

end



class HelloWorldApp < Sinatra::Base

  get '/' do
    content_type :json
    watcher = DirectoryWatcher.new
    watcher.file_list
  end

  get '/diptych' do
    File.read(File.join('public', 'diptych.html'))
  end

  get '/bradybunch' do
    File.read(File.join('public', 'bradybunch.html'))
  end

end
