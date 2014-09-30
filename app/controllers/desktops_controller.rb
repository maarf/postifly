class DesktopsController < ApplicationController
  
  def index
    @desktops = Desktop.all
    @current_desktop = Desktop.first
    
    @notes = @current_desktop.notes
  end
  
end
