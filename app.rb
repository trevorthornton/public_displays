# app.rb
require 'sinatra/base'

class DirectoryWatcher

  require 'json'

  attr_accessor :files, :directory_path

  def initialize

    # CONFIGUABLES
    @source_path = "/Users/trthorn2/Google\ Drive/public_displays/video"
    # @destination_path = "/Users/trthorn2/webapps/exp/pd/public_displays"
    # END CONFIGUABLES

    # @destination_path += "/public/assets/video/"
    @files = []
    @filenames = []
  end


  def copied_files
    files = []
    Dir.foreach(@destination_path) do |filename|
      files << filename
    end
    files
  end


  # def file_list
  #   match = Regexp.new("\.[mp4v]{3,4}$")
  #   Dir.foreach(@source_path) do |filename|
  #     if !@filenames.include?(filename) && filename.match(match)
  #       @filenames << filename
  #       filepath = "#{@source_path}/#{filename}"
  #       file = File.new(filepath, "r")
  #       destination_file = "#{@destination_path}#{filename}"
  #       if !File.exist?(destination_file)
  #         FileUtils.cp(filepath, "#{@destination_path}#{filename}")
  #       end
  #       @files << [file.birthtime, filename]
  #     end
  #   end
  #   @files.sort! { |a,b| a[0] <=> b[0] }
  #   @files.map { |x| x[1] }
  # end


  def file_list
    match = Regexp.new("\.[mp4v]{3,4}$")
    Dir.foreach(@source_path) do |filename|
      if filename.match(match)
        filepath = "#{@source_path}/#{filename}"
        file = File.new(filepath, "r")
        @files << [file.birthtime, filename]
      end
    end
    @files.sort! { |a,b| a[0] <=> b[0] }
    @files.map { |x| x[1] }
  end


  def file_list_full
    JSON.generate( { 'playlist': file_list } )
  end


  def file_list_even
    files = []
    all_files = file_list;
    all_files.each_index do |i|
      if (i % 2) == 0
        files << all_files[i]
      end
    end
    JSON.generate( { 'playlist': files } )
  end


  def file_list_odd
    files = []
    all_files = file_list;
    all_files.each_index do |i|
      if (i % 2) != 0
        files << all_files[i]
      end
    end
    JSON.generate( { 'playlist': files } )
  end

end



class HelloWorldApp < Sinatra::Base

  get '/' do
    content_type :json
    watcher = DirectoryWatcher.new
    watcher.file_list_full
  end

  get '/file_list_even' do
    content_type :json
    watcher = DirectoryWatcher.new
    watcher.file_list_even
  end

  get '/file_list_odd' do
    content_type :json
    watcher = DirectoryWatcher.new
    watcher.file_list_odd
  end

  # get '/diptych' do
  #   File.read(File.join('public', 'diptych.html'))
  # end

  # get '/bradybunch' do
  #   File.read(File.join('public', 'bradybunch.html'))
  # end

end
