class DesktopsController < ApplicationController
  
  def index
    @desktop = Desktop.first
  end
  
end
